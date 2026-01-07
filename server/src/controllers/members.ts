import { Request, Response } from 'express';
import { query, queryOne } from '../db/index.js';
import type { FamilyMember, FamilyMemberRow, MemberSourceRow } from '../types/index.js';

function rowToMember(row: FamilyMemberRow): FamilyMember {
  return {
    id: row.id,
    name: row.name,
    fatherId: row.father_id,
    birthYear: row.birth_year,
    deathYear: row.death_year,
    biography: row.biography,
    tagline: row.tagline,
  };
}

export async function getAllMembers(req: Request, res: Response) {
  try {
    const rows = await query<FamilyMemberRow>(
      'SELECT * FROM family_members ORDER BY name'
    );
    const members = rows.map(rowToMember);
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Failed to fetch members' });
  }
}

export async function getMemberById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const row = await queryOne<FamilyMemberRow>(
      'SELECT * FROM family_members WHERE id = $1',
      [id]
    );
    
    if (!row) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    const sources = await query<MemberSourceRow>(
      'SELECT * FROM member_sources WHERE member_id = $1',
      [id]
    );
    
    const member: FamilyMember = {
      ...rowToMember(row),
      sources: sources.map(s => ({
        id: s.id,
        memberId: s.member_id,
        label: s.label,
        url: s.url,
      })),
    };
    
    res.json(member);
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({ error: 'Failed to fetch member' });
  }
}

export async function getMemberChildren(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    const rows = await query<FamilyMemberRow>(
      'SELECT * FROM family_members WHERE father_id = $1 ORDER BY name',
      [id]
    );
    
    const children = rows.map(rowToMember);
    res.json(children);
  } catch (error) {
    console.error('Error fetching children:', error);
    res.status(500).json({ error: 'Failed to fetch children' });
  }
}

export async function getMemberAncestors(req: Request, res: Response) {
  try {
    const { id } = req.params;
    
    // Recursive CTE to get all ancestors
    const rows = await query<FamilyMemberRow>(
      `WITH RECURSIVE ancestors AS (
        SELECT * FROM family_members WHERE id = $1
        UNION ALL
        SELECT fm.* FROM family_members fm
        INNER JOIN ancestors a ON fm.id = a.father_id
      )
      SELECT * FROM ancestors WHERE id != $1`,
      [id]
    );
    
    const ancestors = rows.map(rowToMember);
    res.json(ancestors);
  } catch (error) {
    console.error('Error fetching ancestors:', error);
    res.status(500).json({ error: 'Failed to fetch ancestors' });
  }
}

export async function searchMembers(req: Request, res: Response) {
  try {
    const searchQuery = req.query.q as string;
    
    if (!searchQuery || searchQuery.trim().length === 0) {
      return res.json([]);
    }
    
    const rows = await query<FamilyMemberRow>(
      `SELECT * FROM family_members 
       WHERE name ILIKE $1 OR id ILIKE $1
       ORDER BY name
       LIMIT 20`,
      [`%${searchQuery}%`]
    );
    
    const members = rows.map(rowToMember);
    res.json(members);
  } catch (error) {
    console.error('Error searching members:', error);
    res.status(500).json({ error: 'Failed to search members' });
  }
}
