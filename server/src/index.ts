import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import type { Request, Response, NextFunction } from 'express';
import membersRouter from './routes/members.js';

dotenv.config();

const app = express();
const PORT = parsePositiveInt(process.env.PORT, 3001);
const NODE_ENV = process.env.NODE_ENV || 'development';

function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeOrigin(origin: string): string {
  return origin.trim().replace(/\/+$/, '');
}

function parseOrigins(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map(normalizeOrigin)
    .filter(Boolean);
}

const configuredOrigins = [
  ...parseOrigins(process.env.CORS_ORIGINS),
  ...parseOrigins(process.env.FRONTEND_ORIGIN),
];

const allowedOrigins = new Set(
  configuredOrigins.length > 0
    ? configuredOrigins
    : NODE_ENV === 'production'
      ? []
      : ['http://localhost:5173', 'http://localhost:3000']
);

if (NODE_ENV === 'production' && allowedOrigins.size === 0) {
  console.warn('No CORS origins configured. Set CORS_ORIGINS or FRONTEND_ORIGIN for browser access.');
}

const RATE_LIMIT_WINDOW_MS = parsePositiveInt(
  process.env.RATE_LIMIT_WINDOW_MS,
  15 * 60 * 1000
);
const RATE_LIMIT_MAX_REQUESTS = parsePositiveInt(
  process.env.RATE_LIMIT_MAX_REQUESTS,
  300
);

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

if (process.env.TRUST_PROXY) {
  const trustProxyValue = process.env.TRUST_PROXY;
  const trustProxyHops = Number.parseInt(trustProxyValue, 10);
  app.set('trust proxy', Number.isNaN(trustProxyHops) ? trustProxyValue : trustProxyHops);
} else if (NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.disable('x-powered-by');

function getClientKey(req: Request): string {
  return req.ip || req.socket.remoteAddress || 'unknown';
}

function securityHeaders(_req: Request, res: Response, next: NextFunction) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'accelerometer=(), camera=(), geolocation=(), microphone=()');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'"
  );
  if (NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains');
  }
  next();
}

function rateLimit(req: Request, res: Response, next: NextFunction) {
  const key = getClientKey(req);
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  let entry: RateLimitEntry;
  if (!existing || existing.resetAt <= now) {
    entry = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitStore.set(key, entry);
  } else {
    existing.count += 1;
    entry = existing;
  }

  const remaining = Math.max(0, RATE_LIMIT_MAX_REQUESTS - entry.count);
  res.setHeader('RateLimit-Limit', String(RATE_LIMIT_MAX_REQUESTS));
  res.setHeader('RateLimit-Remaining', String(remaining));
  res.setHeader('RateLimit-Reset', String(Math.ceil((entry.resetAt - now) / 1000)));

  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  next();
}

const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW_MS);
cleanupInterval.unref();

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, true);
      return;
    }
    callback(null, allowedOrigins.has(normalizeOrigin(origin)));
  },
  credentials: true,
}));
app.use(securityHeaders);
app.use(express.json({ limit: '100kb' }));
app.use('/api', rateLimit);

// Routes
app.use('/api/members', membersRouter);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  const origins = allowedOrigins.size > 0 ? [...allowedOrigins].join(', ') : '(none configured)';
  console.log(`Server running on port ${PORT} (${NODE_ENV})`);
  console.log(`Allowed CORS origins: ${origins}`);
  console.log(`API available at /api`);
});
