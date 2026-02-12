import { useState, useEffect, useCallback } from 'react';
import type { FamilyMember } from '../types';
import * as api from '../api/client';

interface UseMembersResult {
  members: FamilyMember[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useMembers(): UseMembersResult {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllMembers();
      setMembers(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch members'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  return { members, loading, error, refetch: fetchMembers };
}

interface UseMemberResult {
  member: FamilyMember | null;
  loading: boolean;
  error: Error | null;
}

export function useMember(id: string | null): UseMemberResult {
  const [member, setMember] = useState<FamilyMember | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setMember(null);
      return;
    }

    let cancelled = false;
    const memberId = id; // Capture non-null id for closure

    async function fetchMember(memberId: string) {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getMemberById(memberId);
        if (!cancelled) {
          setMember(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to fetch member'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMember(id);

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { member, loading, error };
}

interface UseSearchResult {
  results: FamilyMember[];
  loading: boolean;
  search: (query: string) => void;
}

export function useSearch(): UseSearchResult {
  const [results, setResults] = useState<FamilyMember[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const data = await api.searchMembers(query);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, search };
}
