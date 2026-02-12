# Ansab - Hashemite Lineage Encyclopedia

An interactive encyclopedia and explorer for Hashemite lineages, featuring a zoomable, pannable family tree visualization with search capabilities.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
┌─────────────────┐     HTTP/JSON      ┌─────────────────┐     SQL      ┌─────────────────┐
│                 │ ◄────────────────► │                 │ ◄──────────► │                 │
│  React Client   │    /api/*          │  Express API    │              │   PostgreSQL    │
│  (Vite + TS)    │                    │  (TypeScript)   │              │                 │
│  Port 5173      │                    │  Port 3001      │              │   Port 5433     │
└─────────────────┘                    └─────────────────┘              └─────────────────┘
```

The application follows a standard three-tier architecture:

1. **Client**: React SPA with interactive family tree visualization
2. **Server**: RESTful Express API handling data requests
3. **Database**: PostgreSQL storing family member data with hierarchical relationships

---

## Tech Stack

### Frontend (`/client`)
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI framework |
| TypeScript | 5.8.x | Type safety |
| Vite | 7.x | Build tool & dev server |

### Backend (`/server`)
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 20.x+ | Runtime |
| Express | 4.x | Web framework |
| TypeScript | 5.8.x | Type safety |
| pg | 8.x | PostgreSQL client |
| tsx | 4.x | TypeScript execution |

### Database
| Technology | Version | Purpose |
|------------|---------|---------|
| PostgreSQL | 16.x | Primary database |
| Docker | 28.x | Container runtime (optional) |

---

## Prerequisites

- **Node.js** 20.19+ or 22.12+
- **npm** 8+
- **PostgreSQL** 14+ (or Docker)
- **Git**

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Ansab
```

### 2. Install Dependencies

```bash
npm install
```

This installs dependencies for the root workspace, client, and server.

### 3. Set Up Database

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL container (auto-runs schema)
docker compose up -d

# Verify it's running
docker ps
```

The Docker setup:
- Creates a PostgreSQL 16 instance
- Exposes on port **5433** (to avoid conflicts with local PostgreSQL)
- Automatically runs the schema from `server/src/db/schema.sql`
- Persists data in a Docker volume

#### Option B: Using Local PostgreSQL

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ansab;

# Connect to the new database
\c ansab

# Run schema (from project root)
\i server/src/db/schema.sql
```

### 4. Configure Environment

Copy `server/.env.example` to `server/.env`, then edit values:

```env
# Database
DB_HOST=localhost
DB_PORT=5433          # Use 5432 if using local PostgreSQL
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

### 5. Seed the Database

```bash
npm run seed
```

This imports all family members from `client/src/data/familyTreeData.ts` into PostgreSQL.

### 6. Start Development Servers

```bash
npm run dev
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

---

## Project Structure

```
Ansab/
├── client/                      # React frontend
│   ├── src/
│   │   ├── api/
│   │   │   └── client.ts        # API client functions
│   │   ├── components/
│   │   │   ├── BioModal.tsx     # Member detail sidebar
│   │   │   ├── ConnectorLines.tsx # SVG lines between nodes
│   │   │   ├── FamilyNode.tsx   # Individual tree node
│   │   │   ├── FamilyTree.tsx   # Tree layout & rendering
│   │   │   └── SearchBox.tsx    # Search autocomplete
│   │   ├── data/
│   │   │   └── familyTreeData.ts # Legacy static data (reference)
│   │   ├── hooks/
│   │   │   └── useMembers.ts    # Data fetching hooks
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript interfaces
│   │   ├── utils/
│   │   │   └── buildTree.ts     # Tree layout algorithm
│   │   ├── App.tsx              # Main application component
│   │   ├── App.css              # Global styles
│   │   ├── main.tsx             # Entry point
│   │   └── index.css            # Base styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── server/                      # Express backend
│   ├── src/
│   │   ├── controllers/
│   │   │   └── members.ts       # Request handlers
│   │   ├── db/
│   │   │   ├── index.ts         # Database connection pool
│   │   │   └── schema.sql       # Database schema
│   │   ├── routes/
│   │   │   └── members.ts       # Route definitions
│   │   ├── types/
│   │   │   └── index.ts         # TypeScript interfaces
│   │   └── index.ts             # Express app entry
│   ├── package.json
│   └── tsconfig.json
│
├── scripts/
│   └── seed-database.ts         # Database seeding script
│
├── docker-compose.yml           # PostgreSQL container config
├── package.json                 # Root workspace config
└── README.md
```

---

## Development

### Available Scripts

From the project root:

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend in dev mode |
| `npm run dev:client` | Start only the frontend (port 5173) |
| `npm run dev:server` | Start only the backend (port 3001) |
| `npm run build` | Build both client and server for production |
| `npm run seed` | Seed/reseed the database |

### Development Workflow

1. **Start the database**: `docker compose up -d`
2. **Start dev servers**: `npm run dev`
3. **Make changes**: Hot reload is enabled for both frontend and backend
4. **Test API**: Use the health endpoint `GET /api/health`

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React hooks and TypeScript
- **Imports**: Use `.js` extensions in server imports (ESM requirement)

### Adding New API Endpoints

1. Add handler in `server/src/controllers/members.ts`
2. Add route in `server/src/routes/members.ts`
3. Add client function in `client/src/api/client.ts`
4. (Optional) Add hook in `client/src/hooks/useMembers.ts`

---

## API Reference

### Base URL

```
http://localhost:3001/api
```

### Endpoints

#### Health Check

```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-07T12:00:00.000Z"
}
```

#### Get All Members

```http
GET /api/members
```

Returns all family members sorted by name.

Response:
```json
[
  {
    "id": "prophet",
    "name": "Muhammad ﷺ",
    "fatherId": "abdullah",
    "birthYear": 570,
    "deathYear": 632,
    "tagline": "Master of the two universes."
  },
  ...
]
```

#### Get Single Member

```http
GET /api/members/:id
```

Returns a single member with their sources.

Response:
```json
{
  "id": "prophet",
  "name": "Muhammad ﷺ",
  "fatherId": "abdullah",
  "birthYear": 570,
  "deathYear": 632,
  "biography": "...",
  "tagline": "Master of the two universes.",
  "sources": [
    { "id": 1, "memberId": "prophet", "label": "Source Name", "url": "https://..." }
  ]
}
```

#### Get Member's Children

```http
GET /api/members/:id/children
```

Returns direct children of a member.

#### Get Member's Ancestors

```http
GET /api/members/:id/ancestors
```

Returns all ancestors (father, grandfather, etc.) using recursive CTE.

#### Search Members

```http
GET /api/members/search?q=:query
```

Search members by name (case-insensitive, partial match).

Query Parameters:
- `q` (required): Search term

Response: Array of matching members (max 20 results)

---

## Database Schema

### Tables

#### `family_members`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | VARCHAR(100) | PRIMARY KEY | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL | Display name |
| `father_id` | VARCHAR(100) | FK → family_members | Parent reference |
| `birth_year` | INTEGER | NULL | Birth year (CE) |
| `death_year` | INTEGER | NULL | Death year (CE) |
| `biography` | TEXT | NULL | Extended biography |
| `tagline` | VARCHAR(500) | NULL | Short description |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Record creation time |

#### `member_sources`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | SERIAL | PRIMARY KEY | Auto-increment ID |
| `member_id` | VARCHAR(100) | FK → family_members | Member reference |
| `label` | VARCHAR(255) | NOT NULL | Source title |
| `url` | VARCHAR(500) | NULL | Link to source |

### Indexes

- `idx_father_id` on `family_members(father_id)` - Speeds up child lookups
- `idx_member_sources_member_id` on `member_sources(member_id)` - Speeds up source lookups
- Full-text search index on `family_members(name)`

### Entity Relationship

```
┌──────────────────┐       ┌──────────────────┐
│  family_members  │       │  member_sources  │
├──────────────────┤       ├──────────────────┤
│ id (PK)          │◄──┬───│ member_id (FK)   │
│ name             │   │   │ id (PK)          │
│ father_id (FK)───┼───┘   │ label            │
│ birth_year       │       │ url              │
│ death_year       │       └──────────────────┘
│ biography        │
│ tagline          │
│ created_at       │
└──────────────────┘
        │
        └──► Self-referencing (father_id → id)
```

---

## Configuration

### Environment Variables

#### Server (`server/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | localhost | PostgreSQL host |
| `DB_PORT` | 5433 | PostgreSQL port |
| `DB_NAME` | ansab | Database name |
| `DB_USER` | postgres | Database user |
| `DB_PASSWORD` | postgres | Database password |
| `PORT` | 3001 | Express server port |
| `NODE_ENV` | development | Runtime mode (`development` or `production`) |
| `CORS_ORIGINS` | localhost frontend URLs | Comma-separated list of allowed frontend origins |
| `FRONTEND_ORIGIN` | (empty) | Optional single-origin alias |
| `RATE_LIMIT_WINDOW_MS` | 900000 | Rate limit window in milliseconds |
| `RATE_LIMIT_MAX_REQUESTS` | 300 | Max requests per client IP per window |
| `TRUST_PROXY` | (auto in prod) | Proxy hop count/string when behind reverse proxy |

#### Client

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | /api | API base URL (for production) |

### Vite Proxy Configuration

The frontend proxies `/api/*` requests to the backend in development:

```typescript
// client/vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3001',
      changeOrigin: true,
    },
  },
}
```

---

## Deployment

### Building for Production

```bash
# Build both client and server
npm run build

# Output:
# - client/dist/     (static files)
# - server/dist/     (compiled JS)
```

### Production Environment

1. **Database**: Use a managed PostgreSQL service (AWS RDS, Supabase, etc.)
2. **Backend**: Deploy to Node.js host (Railway, Render, AWS, etc.)
3. **Frontend**: Deploy static files to CDN (Vercel, Netlify, CloudFront)

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Use environment variables for database credentials
- [ ] Enable CORS only for your frontend domain
- [ ] Set up database connection pooling
- [ ] Tune API rate limiting thresholds for expected traffic
- [ ] Enable HTTPS

---

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
netstat -ano | findstr ":3001"

# Kill by PID (Windows)
taskkill /PID <pid> /F

# Or kill all Node processes
Get-Process node | Stop-Process -Force
```

### Database Connection Failed

1. Check PostgreSQL is running:
   ```bash
   docker ps  # Should show ansab-db
   ```

2. Verify port (5433 for Docker, 5432 for local):
   ```bash
   netstat -ano | findstr ":5433"
   ```

3. Check `.env` file exists and has correct values

### Seed Script Fails

**"password authentication failed"**
- Another PostgreSQL instance may be intercepting. Check ports.
- Recreate Docker volume: `docker compose down -v && docker compose up -d`

**"Circular dependency detected"**
- A member's `fatherId` references a non-existent ID
- Check the error message for the problematic member ID
- Fix in `client/src/data/familyTreeData.ts` and re-run seed

### Frontend Can't Reach API

1. Ensure backend is running on port 3001
2. Check browser console for CORS errors
3. Verify Vite proxy config in `client/vite.config.ts`

---

## Data Model

### FamilyMember Interface

```typescript
interface FamilyMember {
  id: string;           // Unique slug identifier
  name: string;         // Display name (Arabic/English)
  fatherId?: string;    // Reference to father's ID
  birthYear?: number;   // Birth year (CE)
  deathYear?: number;   // Death year (CE)
  biography?: string;   // Extended description
  tagline?: string;     // Short one-line description
  sources?: MemberSource[];
}

interface MemberSource {
  id?: number;
  memberId: string;
  label: string;        // Source title
  url?: string;         // Link to source
}
```

---

## License

Private project - All rights reserved.
