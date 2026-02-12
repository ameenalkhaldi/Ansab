# Ansab Server

Express.js backend API for the Ansab Hashemite Lineage Encyclopedia.

## Tech Stack

- **Node.js 20+** - Runtime
- **Express 4** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL 16** - Database
- **pg** - PostgreSQL client
- **tsx** - TypeScript execution

## Quick Start

```bash
# From project root
npm run dev:server

# Or from this directory
npm run dev
```

Runs at http://localhost:3001

## Project Structure

```
src/
├── controllers/
│   └── members.ts      # Request handlers
├── db/
│   ├── index.ts        # Database connection
│   └── schema.sql      # Database schema
├── routes/
│   └── members.ts      # Route definitions
├── types/
│   └── index.ts        # TypeScript interfaces
└── index.ts            # Express app entry
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env`, then edit values:

```env
# Database
DB_HOST=localhost
DB_PORT=5433
DB_NAME=ansab
DB_USER=postgres
DB_PASSWORD=postgres

# Server
PORT=3001
NODE_ENV=development

# API security
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=300
```

### Database Connection

```typescript
// src/db/index.ts
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433'),
  database: process.env.DB_NAME || 'ansab',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
});
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/members` | List all members |
| GET | `/api/members/search?q=` | Search members |
| GET | `/api/members/:id` | Get single member |
| GET | `/api/members/:id/children` | Get children |
| GET | `/api/members/:id/ancestors` | Get ancestors |

See [API Documentation](../docs/API.md) for full details.

## Database Schema

### Tables

**family_members**
```sql
CREATE TABLE family_members (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    father_id VARCHAR(100) REFERENCES family_members(id),
    birth_year INTEGER,
    death_year INTEGER,
    biography TEXT,
    tagline VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);
```

**member_sources**
```sql
CREATE TABLE member_sources (
    id SERIAL PRIMARY KEY,
    member_id VARCHAR(100) REFERENCES family_members(id),
    label VARCHAR(255) NOT NULL,
    url VARCHAR(500)
);
```

### Indexes

```sql
CREATE INDEX idx_father_id ON family_members(father_id);
CREATE INDEX idx_member_sources_member_id ON member_sources(member_id);
```

## Controllers

### members.ts

```typescript
// Get all members
export async function getAllMembers(req, res)

// Get single member with sources
export async function getMemberById(req, res)

// Get member's children
export async function getMemberChildren(req, res)

// Get member's ancestors (recursive CTE)
export async function getMemberAncestors(req, res)

// Search by name
export async function searchMembers(req, res)
```

## Database Utilities

```typescript
import { query, queryOne, pool } from './db';

// Execute query, return rows
const rows = await query<RowType>('SELECT * FROM table');

// Execute query, return first row or null
const row = await queryOne<RowType>('SELECT * FROM table WHERE id = $1', [id]);

// Direct pool access
const client = await pool.connect();
```

## TypeScript Types

```typescript
// API response types
interface FamilyMember {
  id: string;
  name: string;
  fatherId?: string | null;
  birthYear?: number | null;
  deathYear?: number | null;
  biography?: string | null;
  tagline?: string | null;
  sources?: MemberSource[];
}

// Database row types
interface FamilyMemberRow {
  id: string;
  name: string;
  father_id: string | null;
  birth_year: number | null;
  death_year: number | null;
  biography: string | null;
  tagline: string | null;
  created_at: Date;
}
```

## Error Handling

Controllers follow this pattern:

```typescript
export async function handler(req: Request, res: Response) {
  try {
    // Business logic
    const data = await query(...);
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error message' });
  }
}
```

## CORS Configuration

```typescript
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    callback(null, allowedOrigins.has(origin));
  },
  credentials: true,
}));
```

Set `CORS_ORIGINS` (comma-separated) for production frontend domains.

## Rate Limiting

The API includes an in-memory IP-based rate limiter with defaults:

- `RATE_LIMIT_WINDOW_MS=900000` (15 minutes)
- `RATE_LIMIT_MAX_REQUESTS=300`

Adjust via environment variables based on expected traffic.

## Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `tsx watch src/index.ts` | Development with hot reload |
| `build` | `tsc` | Compile TypeScript |
| `start` | `node dist/index.js` | Run production build |
| `seed` | `tsx ../scripts/seed-database.ts` | Seed database |

## Building

```bash
npm run build
```

Output: `dist/` directory with compiled JavaScript.

## Seeding

From project root:

```bash
npm run seed
```

This runs `scripts/seed-database.ts` which:
1. Reads `client/src/data/familyTreeData.ts`
2. Parses the TypeScript array
3. Inserts members in topological order (parents before children)
4. Handles sources if present

## Adding Endpoints

1. **Controller** - Add handler function:
```typescript
// src/controllers/members.ts
export async function newHandler(req: Request, res: Response) {
  const data = await query('...');
  res.json(data);
}
```

2. **Route** - Register endpoint:
```typescript
// src/routes/members.ts
import { newHandler } from '../controllers/members.js';
router.get('/new-endpoint', newHandler);
```

## Production Notes

- Set `NODE_ENV=production`
- Use connection pooling (default: 10 connections)
- Enable HTTPS
- Restrict CORS origins
- Tune rate limiting thresholds
- Use environment secrets management
