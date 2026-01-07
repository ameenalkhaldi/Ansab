# Contributing to Ansab

Thank you for your interest in contributing to Ansab! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Adding Family Members](#adding-family-members)
- [Creating New Features](#creating-new-features)
- [Pull Request Process](#pull-request-process)

---

## Development Setup

### Prerequisites

1. Node.js 20.19+ or 22.12+
2. Docker Desktop (for PostgreSQL)
3. Git

### First-Time Setup

```bash
# Clone repository
git clone <repository-url>
cd Ansab

# Install dependencies
npm install

# Start database
docker compose up -d

# Create environment file
# Copy the example below to server/.env

# Seed database
npm run seed

# Start development
npm run dev
```

### Environment File

Create `server/.env`:

```env
DB_HOST=localhost
DB_PORT=5433
DB_NAME=ansab
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3001
```

---

## Code Style

### TypeScript

- Use strict TypeScript (no `any` types)
- Define interfaces for all data structures
- Use meaningful variable names

```typescript
// Good
interface FamilyMember {
  id: string;
  name: string;
  fatherId?: string;
}

// Bad
interface Member {
  i: string;
  n: string;
  f?: any;
}
```

### React Components

- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks

```typescript
// Good - Focused component
const FamilyNode: React.FC<Props> = ({ member, onClick }) => {
  return (
    <div onClick={onClick}>
      <h3>{member.name}</h3>
    </div>
  );
};

// Bad - Too much logic in component
const FamilyNode: React.FC<Props> = ({ memberId }) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  // ... lots of fetch logic
};
```

### File Organization

- One component per file
- Group related files in folders
- Use index.ts for exports

```
components/
├── FamilyTree/
│   ├── index.ts          # Export
│   ├── FamilyTree.tsx    # Main component
│   ├── FamilyNode.tsx    # Sub-component
│   └── types.ts          # Local types
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `FamilyTree.tsx` |
| Hooks | camelCase with `use` prefix | `useMembers.ts` |
| Utilities | camelCase | `buildTree.ts` |
| Types/Interfaces | PascalCase | `FamilyMember` |
| Constants | UPPER_SNAKE_CASE | `NODE_WIDTH` |
| Database columns | snake_case | `father_id` |

---

## Adding Family Members

### Data Format

Family members are stored in `client/src/data/familyTreeData.ts` (for reference) and in the PostgreSQL database.

```typescript
{
  id: "unique-slug",           // URL-safe identifier
  name: "Full Name",           // Display name
  fatherId: "father-id",       // Reference to parent (optional for root)
  birthYear: 570,              // CE year (optional)
  deathYear: 632,              // CE year (optional)
  tagline: "Short description", // One line (optional)
  biography: "Longer text...",  // Extended info (optional)
  sources: [                    // References (optional)
    { label: "Book Name", url: "https://..." }
  ]
}
```

### ID Guidelines

- Use lowercase with hyphens: `abdul-muttalib`, `ali-bin-abi-talib`
- Be consistent with naming patterns
- Ensure IDs are unique across the entire dataset

### Adding via Database

```sql
INSERT INTO family_members (id, name, father_id, birth_year, death_year, tagline)
VALUES ('new-member', 'New Member Name', 'father-id', 700, 750, 'Description');
```

### Adding via Seed File

1. Edit `client/src/data/familyTreeData.ts`
2. Add the new member object
3. Run `npm run seed` to update database

---

## Creating New Features

### Adding an API Endpoint

1. **Controller** (`server/src/controllers/members.ts`):

```typescript
export async function getNewEndpoint(req: Request, res: Response) {
  try {
    const result = await query<SomeType>('SELECT ...');
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed' });
  }
}
```

2. **Route** (`server/src/routes/members.ts`):

```typescript
router.get('/new-endpoint', getNewEndpoint);
```

3. **Client** (`client/src/api/client.ts`):

```typescript
export async function getNewEndpoint(): Promise<SomeType[]> {
  return fetchApi<SomeType[]>('/members/new-endpoint');
}
```

4. **Hook** (`client/src/hooks/useMembers.ts`):

```typescript
export function useNewEndpoint() {
  const [data, setData] = useState<SomeType[]>([]);
  // ... fetch logic
  return { data, loading, error };
}
```

### Adding a React Component

1. Create component file in `client/src/components/`
2. Define props interface
3. Export from component file
4. Import and use in parent component

```typescript
// client/src/components/NewComponent.tsx
import React from 'react';

interface Props {
  title: string;
  onAction: () => void;
}

const NewComponent: React.FC<Props> = ({ title, onAction }) => {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
};

export default NewComponent;
```

### Adding a Database Migration

For schema changes:

1. Create SQL file: `server/src/db/migrations/001_add_column.sql`
2. Document the change
3. Run manually or add to schema.sql

```sql
-- 001_add_column.sql
-- Adds mother_id column to family_members

ALTER TABLE family_members
ADD COLUMN mother_id VARCHAR(100) REFERENCES family_members(id);
```

---

## Pull Request Process

### Before Submitting

1. **Test locally**: Ensure `npm run dev` works
2. **Check types**: Run `npm run build` to catch TypeScript errors
3. **Test the feature**: Manually verify your changes work
4. **Update documentation**: If adding new features

### PR Guidelines

1. **Title**: Clear, descriptive title
   - Good: "Add search by birth year range"
   - Bad: "Fixed stuff"

2. **Description**: Include:
   - What the change does
   - Why it's needed
   - How to test it

3. **Size**: Keep PRs focused
   - One feature or fix per PR
   - Split large changes into smaller PRs

### Review Process

1. Submit PR against `main` branch
2. Address review comments
3. Ensure CI passes (when configured)
4. Squash and merge when approved

---

## Questions?

If you have questions about contributing, please open an issue for discussion.
