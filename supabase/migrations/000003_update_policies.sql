-- Update RLS policies for properties table
DROP POLICY IF EXISTS "Allow authenticated users full access" ON properties;
DROP POLICY IF EXISTS "Allow public read access" ON properties;

-- Create new policies
CREATE POLICY "Allow public read access"
  ON properties
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public full access"
  ON properties
  USING (true)
  WITH CHECK (true);

-- Update storage policies
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;

CREATE POLICY "Public Access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'properties');

CREATE POLICY "Public can upload"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'properties');

CREATE POLICY "Public can update"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'properties');

CREATE POLICY "Public can delete"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'properties');
