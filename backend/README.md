
# Supabase Setup and Usage

This project uses Supabase as the backend database and authentication provider.

The Supabase setup includes:

- PostgreSQL database
- Authentication
- Database migrations
- Row Level Security (RLS)
- Seed data for development

---

# 1. Prerequisites

Before running Supabase, install:

## Supabase CLI

The Supabase CLI is required to manage the database, migrations, and seed files.

### Windows

Using Scoop:

```bash
scoop install supabase
```

### macOS

Using Homebrew:

```bash
brew install supabase/tap/supabase
```

Verify installation:

```bash
supabase --version
```

---

# 2. Connect Supabase to the Project

Clone the repository:

```bash
git clone <repository-url>

cd <project-folder>
```

Initialize Supabase:

```bash
supabase init
```

Login to Supabase:

```bash
supabase login
```

Create a Supabase project from:

```
https://supabase.com/dashboard
```

Copy the project reference ID.

Link the local project:

```bash
supabase link --project-ref YOUR_PROJECT_ID
```

You will need the database password created when the Supabase project was created.

---

# 3. Create the Database

Run the migrations:

```bash
supabase db push
```

This will create:

- Database tables
- Foreign key relationships
- Functions
- Triggers
- Row Level Security policies
- Default seed data

The migrations are located in:

```
supabase/migrations/
```

---

# 4. Create Authentication Users

The project uses Supabase Authentication.

Users must be created from:

```
Supabase Dashboard
→ Authentication
→ Users
```

Create the demo users:

```
shelter@test.com

volunteer1@test.com

volunteer2@test.com
```

These accounts are required before loading the demo data.

---

# 5. Load Demo Data

After creating the users, run:

```bash
supabase db execute --file supabase/seed/demo_data.sql
```

This creates:

- Shelter information
- Volunteer profiles
- Volunteer opportunities
- Volunteer registrations
- Volunteer hours
- Badges

The demo script finds users by email, so the emails must match exactly.

---

# 6. Supabase Configuration

The project requires Supabase environment variables.

Create a `.env` file in the root of the proyect:

```env
SUPABASE_URL=your_project_url

SUPABASE_ANON_KEY=your_anon_key
```

These values can be found in:

```
Supabase Dashboard
→ Project Settings
→ API
```

Use:

- **Project URL** → `SUPABASE_URL`
- **anon public key** → `SUPABASE_ANON_KEY`

---

# 7. Updating the Database

If database changes are required, create a new migration:

```bash
supabase migration new migration_name
```

Example:

```bash
supabase migration new add_notifications_table
```

After modifying the migration file:

```bash
supabase db push
```

---

# 8. Resetting the Database (Development Only)

To recreate the database from scratch:

```bash
supabase db reset
```

This will:

- Remove existing database data
- Run migrations again
- Recreate the database structure

---

# Project Supabase Structure

```
supabase/

├── migrations/
│
│   ├── 001_schema.sql
│   ├── 002_functions.sql
│   ├── 003_triggers.sql
│   ├── 004_rls.sql
│   └── 005_seed.sql
│
└── seed/
    └── demo_data.sql
```










cd backend
pnpm install @supabase/supabase-js
pnpm install @nestjs/config
pnpm install passport passport-jwt @nestjs/passport
pnpm install @types/passport-jwt --save-dev
