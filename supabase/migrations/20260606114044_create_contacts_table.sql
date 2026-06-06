-- Create contacts table for storing form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users (admin access)
-- For public form submissions, we'll use a service role approach
-- These policies allow authenticated users to view and manage contacts
CREATE POLICY "select_contacts_authenticated" ON contacts FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_contacts_public" ON contacts FOR INSERT
  TO anon WITH CHECK (true);

CREATE POLICY "update_contacts_authenticated" ON contacts FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_contacts_authenticated" ON contacts FOR DELETE
  TO authenticated USING (true);

-- Create index for faster queries on email
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);

-- Create index for sorting by created_at
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);