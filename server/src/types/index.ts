export interface FamilyMember {
  id: string;
  name: string;
  fatherId?: string | null;
  birthYear?: number | null;
  deathYear?: number | null;
  biography?: string | null;
  tagline?: string | null;
  sources?: MemberSource[];
}

export interface MemberSource {
  id?: number;
  memberId: string;
  label: string;
  url?: string | null;
}

export interface FamilyMemberRow {
  id: string;
  name: string;
  father_id: string | null;
  birth_year: number | null;
  death_year: number | null;
  biography: string | null;
  tagline: string | null;
  created_at: Date;
}

export interface MemberSourceRow {
  id: number;
  member_id: string;
  label: string;
  url: string | null;
}
