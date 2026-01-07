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
