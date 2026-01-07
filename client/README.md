# Ansab Client

React frontend for the Ansab Hashemite Lineage Encyclopedia.

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool and dev server

## Quick Start

```bash
# From project root
npm run dev:client

# Or from this directory
npm run dev
```

Opens at http://localhost:5173

## Project Structure

```
src/
├── api/
│   └── client.ts         # API client functions
├── components/
│   ├── BioModal.tsx      # Member detail sidebar
│   ├── ConnectorLines.tsx # SVG connector lines
│   ├── FamilyNode.tsx    # Individual tree node
│   ├── FamilyTree.tsx    # Tree layout component
│   └── SearchBox.tsx     # Search autocomplete
├── hooks/
│   └── useMembers.ts     # Data fetching hooks
├── types/
│   └── index.ts          # TypeScript interfaces
├── utils/
│   └── buildTree.ts      # Tree layout algorithm
├── App.tsx               # Main application
├── App.css               # Component styles
├── index.css             # Global styles
└── main.tsx              # Entry point
```

## Components

### App.tsx

Main application container handling:
- Canvas pan/zoom state
- Dark mode toggle
- Member selection
- Tree expansion state

### FamilyTree.tsx

Renders the family tree using a computed layout:
- Computes node positions based on hierarchy
- Manages expand/collapse state
- Renders nodes and connector lines

**Props:**
```typescript
interface Props {
  members: FamilyMember[];     // All family members
  rootId: string;              // Root node ID
  scale: number;               // Current zoom level
  darkMode: boolean;           // Theme
  onSelectMember: (m) => void; // Selection handler
  showChildren: Set<string>;   // Expanded nodes
  setShowChildren: (s) => void;
}
```

### FamilyNode.tsx

Individual node in the tree:
- Displays member name, dates, tagline
- Expand/collapse button for children

### BioModal.tsx

Sidebar showing member details:
- Life dates
- Father link
- Children links
- Biography
- Sources

### SearchBox.tsx

Search autocomplete:
- Filters members by name/ID
- Keyboard navigation
- Click to select

### ConnectorLines.tsx

SVG overlay for tree connections:
- Calculates line positions from DOM
- Draws orthogonal connectors

## Hooks

### useMembers()

Fetch all family members:

```typescript
const { members, loading, error, refetch } = useMembers();
```

### useMember(id)

Fetch single member with sources:

```typescript
const { member, loading, error } = useMember('prophet');
```

### useSearch()

Search functionality:

```typescript
const { results, loading, search } = useSearch();
search('ali'); // Triggers search
```

## API Client

Functions in `src/api/client.ts`:

```typescript
// Get all members
const members = await getAllMembers();

// Get single member
const member = await getMemberById('prophet');

// Get children
const children = await getMemberChildren('ali');

// Get ancestors
const ancestors = await getMemberAncestors('prophet');

// Search
const results = await searchMembers('hasan');
```

## Types

```typescript
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

interface MemberSource {
  id?: number;
  memberId: string;
  label: string;
  url?: string | null;
}
```

## Configuration

### Vite Config

```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
```

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `/api` | API base URL |

## Controls

| Action | Mouse | Keyboard |
|--------|-------|----------|
| Pan | Click + Drag | - |
| Zoom | Ctrl + Scroll | - |
| Scroll | Scroll | - |
| Search | - | Type in search box |
| Select | Click node | Enter (in search) |

## Styling

- **App.css**: Component-specific styles
- **index.css**: Global resets and base styles
- Dark mode: Toggle via button, applies `.dark-mode` class

## Building

```bash
npm run build
```

Output: `dist/` directory with static files.

## Linting

```bash
npm run lint
```

Uses ESLint with React and TypeScript plugins.
