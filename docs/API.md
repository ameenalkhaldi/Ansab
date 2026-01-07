# Ansab API Documentation

Complete reference for the Ansab REST API.

## Base URL

| Environment | URL |
|-------------|-----|
| Development | `http://localhost:3001/api` |
| Production | `https://your-domain.com/api` |

## Authentication

Currently, the API is **public** with no authentication required. All endpoints are read-only.

## Response Format

All responses are JSON. Successful responses return data directly. Errors return:

```json
{
  "error": "Error message description"
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request - Invalid parameters |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Something went wrong |

---

## Endpoints

### Health Check

Check if the API is running.

```http
GET /api/health
```

#### Response

```json
{
  "status": "ok",
  "timestamp": "2026-01-07T12:00:00.000Z"
}
```

---

### List All Members

Get all family members in the database.

```http
GET /api/members
```

#### Response

```json
[
  {
    "id": "adnan",
    "name": "Adnan",
    "fatherId": null,
    "birthYear": null,
    "deathYear": null,
    "biography": null,
    "tagline": "Forefather of the Adnanite Arabs"
  },
  {
    "id": "prophet",
    "name": "Muhammad ﷺ",
    "fatherId": "abdullah",
    "birthYear": 570,
    "deathYear": 632,
    "biography": null,
    "tagline": "Master of the two universes."
  }
  // ... more members
]
```

#### Notes

- Results are sorted alphabetically by name
- Does not include `sources` array (use single member endpoint for sources)

---

### Get Single Member

Get detailed information about a specific member.

```http
GET /api/members/:id
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Member's unique identifier |

#### Response

```json
{
  "id": "prophet",
  "name": "Muhammad ﷺ",
  "fatherId": "abdullah",
  "birthYear": 570,
  "deathYear": 632,
  "biography": "The final Prophet and Messenger of Allah...",
  "tagline": "Master of the two universes.",
  "sources": [
    {
      "id": 1,
      "memberId": "prophet",
      "label": "Seerah Ibn Hisham",
      "url": "https://example.com/source"
    }
  ]
}
```

#### Errors

| Status | Error | Cause |
|--------|-------|-------|
| 404 | Member not found | Invalid or non-existent ID |

#### Example

```bash
curl http://localhost:3001/api/members/prophet
```

---

### Get Member's Children

Get direct children of a member.

```http
GET /api/members/:id/children
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Parent member's ID |

#### Response

```json
[
  {
    "id": "hasan",
    "name": "al-Hasan bin Ali",
    "fatherId": "ali",
    "birthYear": 625,
    "deathYear": 670,
    "biography": null,
    "tagline": "5th Caliph, Grandson of the Prophet ﷺ"
  },
  {
    "id": "husayn",
    "name": "al-Husayn bin Ali",
    "fatherId": "ali",
    "birthYear": 626,
    "deathYear": 680,
    "biography": null,
    "tagline": "Grandson of the Prophet ﷺ. Martyred at Karbala"
  }
  // ... more children
]
```

#### Notes

- Returns empty array `[]` if member has no children
- Only returns direct children (not grandchildren)

#### Example

```bash
curl http://localhost:3001/api/members/ali/children
```

---

### Get Member's Ancestors

Get the ancestor chain (father, grandfather, etc.) of a member.

```http
GET /api/members/:id/ancestors
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Member's ID |

#### Response

```json
[
  {
    "id": "abdullah",
    "name": "Abdullah bin Abdul-Muttalib",
    "fatherId": "abdul-muttalib",
    "birthYear": 546,
    "deathYear": 570,
    "tagline": "Father of Prophet Muhammad ﷺ"
  },
  {
    "id": "abdul-muttalib",
    "name": "Abdul-Muttalib bin Hashim",
    "fatherId": "hashim",
    "birthYear": 497,
    "deathYear": 578,
    "tagline": "Grandfather of Prophet Muhammad ﷺ"
  }
  // ... continues to root ancestor
]
```

#### Notes

- Uses recursive SQL query (CTE)
- Does not include the member themselves
- Returns ancestors in no guaranteed order

#### Example

```bash
curl http://localhost:3001/api/members/prophet/ancestors
```

---

### Search Members

Search for members by name.

```http
GET /api/members/search?q=:query
```

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `q` | string | Yes | Search term |

#### Response

```json
[
  {
    "id": "ali",
    "name": "Ali bin Abi Talib",
    "fatherId": "abu-talib",
    "birthYear": 601,
    "deathYear": 661,
    "tagline": "4th Caliph, cousin of the Prophet ﷺ"
  },
  {
    "id": "007037",
    "name": "Ali al-Ridha",
    "fatherId": "007024",
    "birthYear": 766,
    "deathYear": 818,
    "tagline": "Was made the Heir to the Caliphate by al-Ma'mun."
  }
  // ... more matches
]
```

#### Notes

- Case-insensitive search
- Matches partial names (contains)
- Also searches by ID
- Maximum 20 results returned
- Returns empty array for no matches

#### Examples

```bash
# Search by name
curl "http://localhost:3001/api/members/search?q=ali"

# Search by ID
curl "http://localhost:3001/api/members/search?q=prophet"

# Multi-word search
curl "http://localhost:3001/api/members/search?q=bin%20ali"
```

---

## Data Types

### FamilyMember

```typescript
interface FamilyMember {
  id: string;              // Unique identifier (slug format)
  name: string;            // Full display name
  fatherId: string | null; // Parent's ID (null for root)
  birthYear: number | null; // Birth year in CE
  deathYear: number | null; // Death year in CE
  biography: string | null; // Extended description
  tagline: string | null;   // Short one-line description
  sources?: MemberSource[]; // Only in single member endpoint
}
```

### MemberSource

```typescript
interface MemberSource {
  id: number;           // Database ID
  memberId: string;     // Reference to member
  label: string;        // Source title/name
  url: string | null;   // Link to source
}
```

---

## Usage Examples

### JavaScript/TypeScript

```typescript
// Fetch all members
const response = await fetch('http://localhost:3001/api/members');
const members = await response.json();

// Get single member
const member = await fetch('http://localhost:3001/api/members/prophet')
  .then(res => res.json());

// Search
const results = await fetch('http://localhost:3001/api/members/search?q=ali')
  .then(res => res.json());
```

### Python

```python
import requests

# Fetch all members
members = requests.get('http://localhost:3001/api/members').json()

# Get single member
member = requests.get('http://localhost:3001/api/members/prophet').json()

# Search
results = requests.get('http://localhost:3001/api/members/search', 
                       params={'q': 'ali'}).json()
```

### cURL

```bash
# List all members
curl http://localhost:3001/api/members

# Get specific member
curl http://localhost:3001/api/members/prophet

# Get children
curl http://localhost:3001/api/members/ali/children

# Search
curl "http://localhost:3001/api/members/search?q=hasan"
```

---

## Rate Limiting

Currently no rate limiting is implemented. For production, consider adding:

- Request rate limits per IP
- API key authentication for heavy usage

---

## Changelog

### v1.0.0

- Initial API release
- Basic CRUD operations for family members
- Search functionality
- Ancestor chain queries
