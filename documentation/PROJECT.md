# Paws to the Rescue — Project Documentation

## 1. Project Overview

### What I Am Building

**Paws to the Rescue** is a volunteer management platform designed specifically for cat shelters. The platform connects cat shelters with passionate volunteers by providing a centralized system where:

- **Volunteers** can discover volunteering opportunities, register for shifts directly (no approval required), track their hours, and earn achievement badges.
- **Shelters** can publish and manage volunteering opportunities, see which volunteers registered for each opportunity, and monitor their operation through a real-time dashboard.

The application features role-based experiences: volunteers get a personal dashboard with activity history and earned badges, while shelters get a management dashboard with statistics and volunteering opportunities management tools.

### Why I Am Building It

Cat shelters rely heavily on volunteers to operate. Many shelters still coordinate volunteers through spreadsheets, group chats, or word of mouth, which leads to scheduling conflict and missed shifts.

**Paws to the Rescue** solves this by:

- Providing a **structured discovery system** so volunteers can find opportunities that match their availability and interests.
- Allowing volunteers to **register instantly** for opportunities without requiring shelter approval, reducing friction and increasing participation.
- Offering a **gamification layer** (badges and hours tracking) to keep volunteers engaged and recognized for their contributions.
- Giving shelters **operational visibility** into volunteer participation without manual tracking.
- Creating a **community** that genuinely cares about kitties.

### How It Relates to the Hackathon Theme

This project was designed to help shelters that need a paw to properly care for kittens. By digitizing volunteer opportunities, we can reach more people and transform the lives of many cats in need, improving their world and—in many cases—allowing them to experience love for the first time. Therefore, given that the hackathon focuses on projects that create a positive impact on cats, this idea is a perfect fit.

---

## 2. Technology Stack

| Layer        | Technology                         | Version   | Purpose                                      |
| ------------ | ---------------------------------- | --------- | -------------------------------------------- |
| **Frontend** | React                              | 19        | UI component library                         |
|              | Vite                               | 8         | Build tool and dev server                    |
|              | Tailwind CSS                       | 4         | Utility-first CSS framework                  |
|              | React Router                       | 7         | Client-side routing                          |
|              | Zustand                            | 5         | Lightweight state management                 |              |
|              | Axios                              | 1.18      | HTTP client for API communication            |
|              | Lucide React                       | 1.23      | Icon library                                 |
|              | React CountUp                      | 6.5       | Animated number counters                     |
| **Backend**  | NestJS                             | 11        | Server-side framework (Node.js)              |
|              | TypeScript                         | 5.7       | Type-safe JavaScript                         |
|              | Passport + passport-jwt            | 0.7 / 4.0 | JWT authentication strategy                  |
|              | class-validator / class-transformer| 0.15 / 0.5| DTO validation and transformation            |
| **Database** | Supabase (PostgreSQL)              | Latest    | Managed database with built-in auth          |
|              | Row Level Security (RLS)           | —         | Database-level access control policies       |
| **Auth**     | Supabase Auth                      | —         | JWT-based authentication (HS256)             |

---

## 3. Technical Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                                  │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐     │
│  │              React SPA (Vite dev server :5173)                    │     │
│  │                                                                   │     │
│  │  Pages: Home, Volunteering, Shelters, About,                      │     │
│  │         VolunteerDashboard, ShelterDashboard, ShelterDetail       │     │
│  │                                                                   │     │
│  │  State: Zustand stores (auth session, UI state)                   │     │
│  │  HTTP: Axios with Bearer token interceptor                        │     │
│  └─────────────────────────────────────────────────────────────────┘     │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │ REST API (JSON over HTTP)
                                 │ Authorization: Bearer <JWT>
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                     NestJS Backend API (:3000)                            │
│                                                                           │
│  ┌───────────────────────────────────────────────────────────────────┐   │
│  │  Global Middleware: CORS, ValidationPipe, Exception Filters        │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌───────────────────────────────────────────────────────────────────┐   │
│  │  Guards: JwtAuthGuard (Passport) → RolesGuard (@Roles decorator)   │   │
│  └───────────────────────────────────────────────────────────────────┘   │
│                                                                           │
│  ┌──────────────┐ ┌──────────────┐ ┌────────────────┐ ┌─────────────┐   │
│  │  Volunteers  │ │   Shelters   │ │ Opportunities  │ │   Badges    │   │
│  │   Module     │ │   Module     │ │    Module      │ │   Module    │   │
│  └──────────────┘ └──────────────┘ └────────────────┘ └─────────────┘   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │              SupabaseModule (global)                                  │ │
│  │   SupabaseService → @supabase/supabase-js client                     │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────┬────────────────────────────────────────┘
                                 │ Supabase JS SDK
                                 ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    Supabase Cloud (PostgreSQL + Auth)                     │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐     │
│  │  Auth: User registration, login, JWT issuance (HS256)            │     │
│  │  Roles: volunteer | shelter (stored in user_metadata)            │     │
│  └─────────────────────────────────────────────────────────────────┘     │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐     │
│  │  Database Tables:                                                 │     │
│  │  • profiles        • shelters       • volunteers                  │     │
│  │  • opportunities   • applications   • activity_logs               │     │
│  │  • badges          • earned_badges                                │     │
│  └─────────────────────────────────────────────────────────────────┘     │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────┐     │
│  │  Security: Row Level Security (RLS) policies per table            │     │
│  │  Functions & Triggers: auto-profile creation, badge awarding      │     │
│  └─────────────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────────────┘
```

### Authentication Flow

1. User signs up or logs in via the frontend → Supabase Auth issues a JWT containing `sub` (user ID), `email`, and `user_metadata` (including `role`).
2. The frontend stores the session (managed by Supabase client) and attaches the token as `Authorization: Bearer <token>` on every API request via an Axios interceptor.
3. The NestJS backend validates the JWT using Passport's JWT strategy with the `SUPABASE_JWT_SECRET` (HS256 algorithm).
4. Role-based guards (`@Roles('volunteer')` or `@Roles('shelter')`) protect endpoints based on the `role` claim extracted from the token.

### Data Flow for Key Features

**Volunteer Registering for an Opportunity:**
```
Frontend → POST /opportunities/:id/apply (Bearer token)
    → JwtAuthGuard validates token
    → RolesGuard checks role = 'volunteer'
    → OpportunitiesService.apply() checks for duplicates & available spaces
    → Supabase insert into applications table (status = 'approved' immediately)
    → Decrement available_spaces on the opportunity
    → Returns 201 with registration object
```

**Shelter Viewing Registrations:**
```
Frontend → GET /shelters/dashboard/registrations (Bearer token)
    → JwtAuthGuard validates token
    → RolesGuard checks role = 'shelter'
    → SheltersService fetches recent registrations for shelter's opportunities
    → Returns list of volunteer registrations
```

### Project Structure

```
Paws-to-the-Rescue/
├── frontend/                # React SPA (Vite)
│   ├── src/
│   │   ├── assets/          # Static assets (images, icons)
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Feature-specific components (home, about, volunteers)
│   │   ├── hooks/           # Custom React hooks
│   │   ├── layouts/         # Layout components (Navbar, Header)
│   │   ├── pages/           # Route-level page components
│   │   ├── services/        # API service layer (Supabase client, Axios)
│   │   ├── store/           # Zustand state stores
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── backend/                 # NestJS REST API
│   ├── src/
│   │   ├── auth/            # JWT strategy, guards, decorators
│   │   ├── volunteers/      # Volunteer profiles, dashboard, activity
│   │   ├── shelters/        # Shelter profiles, dashboard, management
│   │   ├── opportunities/   # CRUD for volunteering opportunities + volunteer registration
│   │   ├── badges/          # Achievement badge system
│   │   ├── supabase/        # Supabase client service (global)
│   │   └── common/          # Shared filters, pipes, utilities
│   └── package.json
│
├── supabase/                # Database infrastructure
│   ├── migrations/          # SQL migration files (schema, functions, RLS)
│   ├── seed/                # Demo data for development
│   └── config.toml          # Supabase CLI configuration
│
└── documentation/           # Project documentation
```

---

## 4. Tools Used

### Development Tools

| Tool             | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| **Kiro**         | AI-powered IDE used for spec-driven development, code generation, and iterative implementation |
| **VS Code**      | Primary code editor                                       |
| **Git / GitHub** | Version control and collaboration                         |
| **pnpm**         | Fast, disk-efficient package manager                      |
| **Supabase CLI** | Local database management, migrations, and seeding        |
| **Vite**         | Frontend build tool with HMR for rapid development        |
| **ESLint**       | Code linting for both frontend and backend                |
| **Prettier**     | Code formatting (backend)                                 |

### Design & Planning Tools

| Tool                 | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| **Kiro Specs**       | Structured requirement → design → task workflow for backend API development |
| **Supabase Dashboard** | Database design, user management, and RLS policy testing |

### Runtime & Infrastructure

| Tool                    | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| **Node.js 18+**         | JavaScript runtime for backend and build tools    |
| **Supabase Cloud**      | Managed PostgreSQL database, authentication, and storage |
| **NestJS CLI**          | Project scaffolding and module generation          |

### Key Libraries & Frameworks

| Library / Framework  | Role in Project                                       |
| -------------------- | ----------------------------------------------------- |
| **React 19**         | Component-based UI with latest concurrent features    |
| **NestJS 11**        | Modular, testable server-side architecture            |
| **Passport JWT**     | Stateless authentication via Supabase-issued tokens   |
| **Tailwind CSS v4**  | Rapid UI styling without custom CSS                   |
| **Zustand**          | Minimal global state (auth session, UI toggles)       |
| **Axios**            | HTTP client with interceptors for token injection     |
| **class-validator**  | Declarative DTO validation on the backend             |
