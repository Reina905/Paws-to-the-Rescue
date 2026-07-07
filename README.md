# Paws to the Rescue 🐾

A volunteer management platform for cat shelters. Volunteers can discover opportunities, apply for shifts, track hours, and earn badges. Shelters can post opportunities and manage applications.

## Tech Stack

| Layer    | Technology                                             |
| -------- | ------------------------------------------------------ |
| Frontend | React 19, Vite 8, Tailwind CSS v4, React Router v7    |
| Backend  | NestJS 11, TypeScript, Passport JWT                    |
| Database | Supabase (PostgreSQL 17) with Row Level Security       |
| Auth     | Supabase Auth (JWT-based)                              |

---

## Prerequisites

Make sure the following are installed before proceeding:

| Tool           | Version         | Install Command / Link                          |
| -------------- | --------------- | ----------------------------------------------- |
| **Node.js**    | 18+             | https://nodejs.org                              |
| **pnpm**       | 8+              | `npm install -g pnpm`                           |
| **Supabase CLI** | Latest        | `brew install supabase/tap/supabase` (macOS)    |
| **Git**        | Any recent      | https://git-scm.com                             |

Verify installations:

```bash
node --version
pnpm --version
supabase --version
```

---

## Project Structure

```
Paws-to-the-Rescue/
├── backend/            # NestJS REST API (port 3000)
├── Frontend/           # React SPA via Vite (port 5173)
├── supabase/           # Database migrations & seed data
│   ├── config.toml
│   ├── migrations/
│   │   ├── 001_schema.sql       # Tables & constraints
│   │   ├── 002_functions.sql    # Database functions
│   │   ├── 003_triggers.sql     # Triggers
│   │   ├── 004_rls.sql          # Row Level Security policies
│   │   └── 005_seed.sql         # Badge seed data
│   └── seed/
│       └── demo_data.sql        # Full demo dataset
└── README.md
```

---

## Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Paws-to-the-Rescue
```

---

## Step 2: Supabase Database Setup

### 2.1 Create a Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard) and create a new project.
2. Choose a strong database password (you'll need it later).
3. Wait for the project to finish provisioning.

### 2.2 Get Your Project Credentials

From your Supabase Dashboard, go to **Project Settings → API** and note:

| Value              | Where to Find                                     |
| ------------------ | ------------------------------------------------- |
| Project URL        | `Settings → API → Project URL`                    |
| Anon public key    | `Settings → API → Project API keys → anon public` |
| Service role key   | `Settings → API → Project API keys → service_role` |
| JWT Secret         | `Settings → API → JWT Settings → JWT Secret`      |
| Project Ref ID     | `Settings → General → Reference ID`               |

### 2.3 Link Local Project to Supabase

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF_ID
```

You will be prompted for the database password you set when creating the project.

### 2.4 Run Migrations (Create the Database Schema)

```bash
supabase db push
```

This executes all migration files in order and creates:
- All database tables (profiles, shelters, volunteers, opportunities, applications, activity_logs, badges, earned_badges)
- Database functions and triggers
- Row Level Security (RLS) policies
- Initial badge seed data

### 2.5 Create Authentication Users

The demo data requires 3 users to exist in Supabase Auth **before** running the seed script.

Go to **Supabase Dashboard → Authentication → Users → Add User** and create:

| Email                 | Password       | User Metadata (raw_user_meta_data) |
| --------------------- | -------------- | ---------------------------------- |
| `shelter@test.com`    | `password123`  | `{"role": "shelter"}`              |
| `volunteer1@test.com` | `password123`  | `{"role": "volunteer"}`            |
| `volunteer2@test.com` | `password123`  | `{"role": "volunteer"}`            |

> **Important:** Check **"Auto Confirm User"** when creating each user so their email is immediately verified.

To set the user metadata:
1. Click "Add User" → "Create New User"
2. Enter the email and password
3. Check "Auto Confirm User"
4. After creating the user, go to the SQL editor and run:

UPDATE auth.users 
SET raw_user_meta_data = '{"role": "shelter"}'::jsonb 
WHERE email = 'shelter@test.com';

UPDATE auth.users 
SET raw_user_meta_data = '{"role": "volunteer"}'::jsonb 
WHERE email = 'volunteer1@test.com';

UPDATE auth.users 
SET raw_user_meta_data = '{"role": "volunteer"}'::jsonb 
WHERE email = 'volunteer2@test.com';


### 2.6 Load Demo Data

After creating the 3 auth users, run:

```bash
supabase db query --linked --file supabase/seed/demo_data.sql
```

This populates the database with:
- A shelter profile with details
- 2 volunteer profiles
- 4 volunteer opportunities
- Applications with various statuses
- Activity logs with tracked hours
- Earned badges

> If the script fails with "Missing user: …", make sure the emails match exactly and users were created in step 2.5.

---

## Step 3: Backend Setup

### 3.1 Install Dependencies

```bash
cd backend
pnpm install
pnpm install @supabase/supabase-js
pnpm install @nestjs/config
pnpm install passport passport-jwt @nestjs/passport
pnpm install @types/passport-jwt --save-dev
```

### 3.2 Configure Environment Variables

Create a `.env` file inside `backend/`:

```env
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
port=3000
```

| Variable                    | Description                                                            |
| --------------------------- | ---------------------------------------------------------------------- |
| `SUPABASE_URL`              | Your Supabase project URL (from Step 2.2)                              |
| `SUPABASE_ANON_KEY`         | Anonymous public key for client-side access                            |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for privileged server-side operations (bypasses RLS)   |
| `SUPABASE_JWT_SECRET`       | Secret used to verify JWT tokens issued by Supabase Auth               |
| `port`                      | Port the NestJS server listens on (defaults to `3000`)                 |

### 3.3 Start the Backend

```bash
pnpm run start:dev
```

The API will be running at **http://localhost:3000**.

Other available commands:

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `pnpm build`       | Compile TypeScript             |
| `pnpm start:prod`  | Run compiled output            |
| `pnpm test`        | Run unit tests                 |
| `pnpm lint`        | Lint and auto-fix              |

---

## Step 4: Frontend Setup

### 4.1 Install Dependencies

```bash
cd Frontend
pnpm install
pnpm install -D tailwindcss @tailwindcss/vite
pnpm install react-router-dom
pnpm install lucide-react
pnpm install react-countup
brew install supabase
supabase init
npm install @supabase/supabase-js axios
```

### 4.2 Configure Environment Variables

Create a `.env` file inside `Frontend/`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

| Variable                 | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `VITE_SUPABASE_URL`      | Same Supabase project URL used in the backend       |
| `VITE_SUPABASE_ANON_KEY` | Same anonymous public key used in the backend       |

### 4.3 Start the Frontend

```bash
pnpm run dev
```

The app will be running at **http://localhost:5173**.

Other available commands:

| Command          | Description                          |
| ---------------- | ------------------------------------ |
| `pnpm build`     | Build for production                 |
| `pnpm preview`   | Preview the production build locally |
| `pnpm lint`      | Lint the codebase                    |

---

## Step 5: Run Both Services

Open two terminal windows/tabs:

```bash
# Terminal 1 — Backend
cd backend
pnpm run start:dev

# Terminal 2 — Frontend
cd Frontend
pnpm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Demo Login Credentials

Once the project is running, you can log in with the demo users:

| Role       | Email                 | Password      |
| ---------- | --------------------- | ------------- |
| Shelter    | `shelter@test.com`    | `password123` |
| Volunteer  | `volunteer1@test.com` | `password123` |
| Volunteer  | `volunteer2@test.com` | `password123` |

---

## Quick Start (TL;DR)

```bash
# 1. Clone
git clone <repository-url> && cd Paws-to-the-Rescue

# 2. Supabase — link and push schema
supabase login
supabase link --project-ref YOUR_REF_ID
supabase db push

# 3. Supabase — create auth users (via Dashboard, see Step 2.5)
# 4. Supabase — load demo data
supabase db query --linked --file supabase/seed/demo_data.sql

# 5. Backend
cd backend
pnpm install
# (create .env with Supabase credentials — see Step 3.2)
pnpm start:dev

# 6. Frontend (new terminal)
cd Frontend
pnpm install
# (create .env with Supabase credentials — see Step 4.2)
pnpm dev
```

---

## Architecture Overview

```
┌─────────────┐       ┌──────────────┐       ┌──────────────┐
│   Frontend  │──────▶│   Backend    │──────▶│   Supabase   │
│  React/Vite │ HTTP  │   NestJS     │  SDK  │  PostgreSQL  │
│  :5173      │       │   :3000      │       │  + Auth      │
└─────────────┘       └──────────────┘       └──────────────┘
```

**Authentication Flow:**

1. User signs up / signs in via the frontend → Supabase Auth issues a JWT.
2. Frontend stores the session and attaches the token as `Authorization: Bearer <token>` on every API request (via axios interceptor).
3. Backend validates the JWT using Passport with the `SUPABASE_JWT_SECRET`.
4. Role-based guards (`volunteer` / `shelter`) protect endpoints based on JWT claims.

---

## Resetting the Database

If you need to start fresh:

```bash
supabase db reset
```

This drops and recreates everything from migrations. You'll need to re-create the auth users (Step 2.5) and re-run the demo data (Step 2.6) afterward.

if that command doesn't work you can run the following code in the SQL editor:
DO $$ DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

DELETE FROM supabase_migrations.schema_migrations;
DROP TYPE IF EXISTS user_role CASCADE;
DROP TYPE IF EXISTS opportunity_status CASCADE;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

Then delete the users you created. Make sure there are no migrations, triggers, functions, users and tables remaining. Then follow the instructions from Step 2: Supabase Database Setup