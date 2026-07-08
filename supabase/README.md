# Supabase Setup

## Step 1: Run Migrations

There are two ways to run the migrations:

### Option A: Using Supabase Dashboard (Recommended)
1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor** > **New query**
3. Copy and paste the contents of `000001_create_properties_table.sql` and click **Run**
4. Create another new query, copy and paste `000002_create_storage_bucket.sql`, and click **Run**

### Option B: Using Supabase CLI
If you have the Supabase CLI installed:
```bash
# Link your project (if not already linked)
supabase link --project-ref <your-project-ref>

# Push migrations
supabase db push
```

## Step 2: Verify Setup

After running the migrations:
- Check that the `properties` table exists in your database (**Table Editor** > `properties`)
- Check that the `properties` storage bucket exists (**Storage** > `properties`)

## Step 3: Test the Connection

Start your dev server and verify that properties are being fetched from Supabase:
```bash
npm run dev
```
