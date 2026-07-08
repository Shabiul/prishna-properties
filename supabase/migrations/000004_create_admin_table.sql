-- Create admin credentials table
CREATE TABLE IF NOT EXISTS admin_credentials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on admin_credentials
ALTER TABLE admin_credentials ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (we'll restrict this in the app)
CREATE POLICY "Allow public read access to admin credentials"
  ON admin_credentials
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow public insert/update for initial setup
CREATE POLICY "Allow public insert/update to admin credentials"
  ON admin_credentials
  USING (true)
  WITH CHECK (true);

-- Insert the admin user with hashed password
INSERT INTO admin_credentials (username, password_hash)
VALUES ('admin', '$2b$12$NvUfHTFIfa4yQOeaxbwAZOCL4CjcW2obdi2H2uyFiSa0zReETVvku')
ON CONFLICT (username) DO UPDATE 
SET password_hash = EXCLUDED.password_hash, updated_at = NOW();
