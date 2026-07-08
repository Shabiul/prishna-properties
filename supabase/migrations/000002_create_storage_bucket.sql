-- Create properties storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('properties', 'properties', true)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow public read access to the bucket
CREATE POLICY "Public Access"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'properties');

-- Create policy to allow public uploads
CREATE POLICY "Public can upload"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'properties');

-- Create policy to allow public updates
CREATE POLICY "Public can update"
  ON storage.objects
  FOR UPDATE
  TO public
  USING (bucket_id = 'properties');

-- Create policy to allow public deletes
CREATE POLICY "Public can delete"
  ON storage.objects
  FOR DELETE
  TO public
  USING (bucket_id = 'properties');
