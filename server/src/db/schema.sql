-- Ansab Database Schema
-- Run this to initialize the database

-- Drop tables if they exist (for clean reset)
DROP TABLE IF EXISTS member_sources CASCADE;
DROP TABLE IF EXISTS family_members CASCADE;

-- Main family members table
CREATE TABLE family_members (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    father_id VARCHAR(100) REFERENCES family_members(id) ON DELETE SET NULL,
    birth_year INTEGER,
    death_year INTEGER,
    biography TEXT,
    tagline VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Sources for each member (books, links, etc.)
CREATE TABLE member_sources (
    id SERIAL PRIMARY KEY,
    member_id VARCHAR(100) NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    url VARCHAR(500)
);

-- Index for faster lookups of children
CREATE INDEX idx_father_id ON family_members(father_id);

-- Index for faster source lookups
CREATE INDEX idx_member_sources_member_id ON member_sources(member_id);

-- Full-text search index on name
CREATE INDEX idx_family_members_name ON family_members USING gin(to_tsvector('simple', name));
