import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../server/.env') });

interface FamilyMember {
    id: string;
    name: string;
    fatherId?: string;
    birthYear?: number;
    deathYear?: number;
    biography?: string;
    tagline?: string;
    sources?: { label: string; url: string }[];
}

// Parse the TypeScript data file
function loadFamilyData(): FamilyMember[] {
    const filePath = path.join(__dirname, '../client/src/data/familyTreeData.ts');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract just the array content between the opening [ and closing ];
    const startMarker = 'const familyTreeData: FamilyMember[] = [';
    const startIdx = content.indexOf(startMarker);
    if (startIdx === -1) {
        throw new Error('Could not find start of familyTreeData array');
    }

    const arrayStart = startIdx + startMarker.length - 1; // Include the [

    // Find the matching closing bracket
    let depth = 0;
    let arrayEnd = -1;
    for (let i = arrayStart; i < content.length; i++) {
        if (content[i] === '[') depth++;
        if (content[i] === ']') {
            depth--;
            if (depth === 0) {
                arrayEnd = i + 1;
                break;
            }
        }
    }

    if (arrayEnd === -1) {
        throw new Error('Could not find end of familyTreeData array');
    }

    let arrayStr = content.substring(arrayStart, arrayEnd);

    // Remove single-line comments
    arrayStr = arrayStr.replace(/\/\/.*$/gm, '');

    // Remove multi-line comments
    arrayStr = arrayStr.replace(/\/\*[\s\S]*?\*\//g, '');

    // Use Function constructor to evaluate the array (safer than eval)
    // This allows us to parse JavaScript object literal syntax
    const fn = new Function(`return ${arrayStr}`);
    return fn() as FamilyMember[];
}

const { Pool } = pg;

async function seed() {
    // Read database config from environment or use defaults
    const pool = new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'ansab',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
    });

    const client = await pool.connect();

    try {
        console.log('Loading family data from TypeScript file...');
        const familyTreeData = loadFamilyData();
        console.log(`Found ${familyTreeData.length} family members`);

        console.log('Starting database seed...');
        await client.query('BEGIN');

        // Clear existing data
        console.log('Clearing existing data...');
        await client.query('DELETE FROM member_sources');
        await client.query('DELETE FROM family_members');

        // Build a map for topological sort (insert parents before children)
        const memberMap = new Map<string, FamilyMember>();
        familyTreeData.forEach(m => memberMap.set(m.id, m));

        // Topological sort: insert members with no father first, then their children
        const inserted = new Set<string>();
        const toInsert = [...familyTreeData];

        console.log('Inserting family members...');
        let iterations = 0;
        const maxIterations = familyTreeData.length * 2;

        while (toInsert.length > 0 && iterations < maxIterations) {
            iterations++;
            const member = toInsert.shift()!;

            // If member has a father and father not yet inserted, push to end
            if (member.fatherId && !inserted.has(member.fatherId)) {
                toInsert.push(member);
                continue;
            }

            // Insert the member
            await client.query(
                `INSERT INTO family_members (id, name, father_id, birth_year, death_year, biography, tagline)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO UPDATE SET
           name = EXCLUDED.name,
           father_id = EXCLUDED.father_id,
           birth_year = EXCLUDED.birth_year,
           death_year = EXCLUDED.death_year,
           biography = EXCLUDED.biography,
           tagline = EXCLUDED.tagline`,
                [
                    member.id,
                    member.name,
                    member.fatherId || null,
                    member.birthYear || null,
                    member.deathYear || null,
                    member.biography || null,
                    member.tagline || null,
                ]
            );

            // Insert sources if any
            if (member.sources && member.sources.length > 0) {
                for (const source of member.sources) {
                    await client.query(
                        `INSERT INTO member_sources (member_id, label, url) VALUES ($1, $2, $3)`,
                        [member.id, source.label, source.url || null]
                    );
                }
            }

            inserted.add(member.id);

            if (inserted.size % 100 === 0) {
                console.log(`Inserted ${inserted.size} members...`);
            }
        }

        if (toInsert.length > 0) {
            console.error('Could not insert all members. Remaining:', toInsert.map(m => `${m.id} (father: ${m.fatherId})`));
            throw new Error('Circular dependency or missing father reference detected');
        }

        await client.query('COMMIT');
        console.log(`Successfully seeded ${inserted.size} family members`);

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Seed failed:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

seed()
    .then(() => {
        console.log('Seed completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('Seed failed:', error);
        process.exit(1);
    });
