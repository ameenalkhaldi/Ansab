import type { FamilyMember } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function fetchApi<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function getAllMembers(): Promise<FamilyMember[]> {
  return fetchApi<FamilyMember[]>('/members');
}

export async function getMemberById(id: string): Promise<FamilyMember> {
  return fetchApi<FamilyMember>(`/members/${encodeURIComponent(id)}`);
}

export async function getMemberChildren(id: string): Promise<FamilyMember[]> {
  return fetchApi<FamilyMember[]>(`/members/${encodeURIComponent(id)}/children`);
}

export async function getMemberAncestors(id: string): Promise<FamilyMember[]> {
  return fetchApi<FamilyMember[]>(`/members/${encodeURIComponent(id)}/ancestors`);
}

export async function searchMembers(query: string): Promise<FamilyMember[]> {
  if (!query.trim()) return [];
  return fetchApi<FamilyMember[]>(`/members/search?q=${encodeURIComponent(query)}`);
}
