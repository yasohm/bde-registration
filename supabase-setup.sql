-- BDE Registration System Database Setup
-- Run this SQL in your Supabase SQL Editor

-- Create members table
CREATE TABLE IF NOT EXISTS members (
    id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    whatsapp TEXT NOT NULL,
    filiere TEXT NOT NULL,
    niveau TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_created_at ON members(created_at);
CREATE INDEX IF NOT EXISTS idx_members_filiere ON members(filiere);
CREATE INDEX IF NOT EXISTS idx_members_role ON members(role);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access" ON members FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete access" ON members FOR DELETE USING (true);

-- Optional: Insert some sample data for testing (remove in production)
-- INSERT INTO members (full_name, email, whatsapp, filiere, niveau, role) VALUES
-- ('Test User', 'test@example.com', '+212612345678', 'DAI', '1st Year', 'Member');
