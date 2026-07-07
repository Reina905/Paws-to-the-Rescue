# Technical Design Document

## Introduction

This document describes the technical design of the NestJS backend for **Paws to the Rescue**. It is based on the 12 requirements defined in `requirements.md` and leverages the existing infrastructure: skeleton modules (`auth`, `volunteers`, `shelters`, `opportunities`, `badges`, `supabase`), Supabase as the database and authentication provider, and the React frontend that consumes the API at `http://localhost:3000`.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                       │
│                   http://localhost:5173                           │
└─────────────────┬───────────────────────────────────────────────┘
                  │  axios + Bearer Token
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                  NestJS API (http://localhost:3000)               │
│                                                                   │
│  ┌─────────┐  ┌──────────────┐  ┌──────────────────────────┐    │
│  │  main.ts│  │ ValidationPipe│  │ CORS (localhost:5173)    │    │
│  │  (boot) │  │ (global)      │  │                          │    │
│  └─────────┘  └──────────────┘  └──────────────────────────┘    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                     Guards Layer                            │  │
│  │  JwtAuthGuard → JwtStrategy (passport-jwt, HS256)          │  │
│  │  RolesGuard → @Roles('volunteer' | 'shelter')              │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌─────────────┐ ┌──────────────┐ ┌───────────────────────┐     │
│  │ Volunteers  │ │  Shelters    │ │  Opportunities        │     │
│  │  Module     │ │  Module      │ │  Module               │     │
│  └─────────────┘ └──────────────┘ └───────────────────────┘     │
│                                                                   │
│  ┌─────────────┐ ┌──────────────┐                                │
│  │Applications │ │   Badges     │                                │
│  │  Module     │ │   Module     │                                │
│  └─────────────┘ └──────────────┘                                │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │              SupabaseModule (global)                        │  │
│  │   SupabaseService.getClient() → @supabase/supabase-js      │  │
│  └────────────────────────────────────────────────────────────┘  │
└─────────────────┬───────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────────┐
│              Supabase (PostgreSQL + Auth + Storage)               │
│                                                                   │
│  Tables: volunteers, shelters, opportunities, applications,       │
│          activity_logs, badges                                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema (Supabase Tables)

### Table: `volunteers`
| Column       | Type      | Constraints                    |
|--------------|-----------|--------------------------------|
| id           | uuid      | PK, default gen_random_uuid()  |
| user_id      | uuid      | UNIQUE, NOT NULL (from auth.sub) |
| name         | text      | NOT NULL                       |
| role         | text      | NOT NULL (e.g. "Kitten Guardian") |
| bio          | text      | nullable                       |
| avatar_url   | text      | nullable                       |
| created_at   | timestamptz | default now()                |

### Table: `shelters`
| Column          | Type      | Constraints                    |
|-----------------|-----------|--------------------------------|
| id              | uuid      | PK, default gen_random_uuid()  |
| user_id         | uuid      | UNIQUE, NOT NULL (from auth.sub) |
| name            | text      | NOT NULL                       |
| description     | text      | nullable                       |
| location        | text      | NOT NULL                       |
| contact_number  | text      | nullable                       |
| animal_capacity | integer   | default 0                      |
| total_animals   | integer   | default 0                      |
| logo            | text      | nullable                       |
| created_at      | timestamptz | default now()                |

### Table: `opportunities`
| Column           | Type      | Constraints                     |
|------------------|-----------|---------------------------------|
| id               | uuid      | PK, default gen_random_uuid()   |
| shelter_id       | uuid      | FK → shelters.id, NOT NULL      |
| name             | text      | NOT NULL                        |
| category         | text      | NOT NULL                        |
| location         | text      | NOT NULL                        |
| date             | text      | NOT NULL                        |
| duration         | text      | NOT NULL                        |
| image            | text      | nullable                        |
| total_spaces     | integer   | NOT NULL, > 0                   |
| available_spaces | integer   | NOT NULL                        |
| is_active        | boolean   | default true                    |
| created_at       | timestamptz | default now()                 |

### Table: `applications`
| Column          | Type      | Constraints                       |
|-----------------|-----------|-----------------------------------|
| id              | uuid      | PK, default gen_random_uuid()     |
| volunteer_id    | uuid      | FK → volunteers.id, NOT NULL      |
| opportunity_id  | uuid      | FK → opportunities.id, NOT NULL   |
| status          | text      | NOT NULL, default 'pending'       |
| hours           | integer   | nullable                          |
| note            | text      | nullable                          |
| created_at      | timestamptz | default now()                   |
| UNIQUE          |           | (volunteer_id, opportunity_id) WHERE status IN ('pending','approved') |

### Table: `activity_logs`
| Column          | Type      | Constraints                       |
|-----------------|-----------|-----------------------------------|
| id              | uuid      | PK, default gen_random_uuid()     |
| volunteer_id    | uuid      | FK → volunteers.id, NOT NULL      |
| opportunity_id  | uuid      | FK → opportunities.id, nullable   |
| shelter_id      | uuid      | FK → shelters.id, NOT NULL        |
| title           | text      | NOT NULL                          |
| hours           | integer   | NOT NULL                          |
| note            | text      | nullable                          |
| completed_at    | timestamptz | NOT NULL                        |

---

## Module Design

### 1. AppModule (bootstrap)

**File:** `src/main.ts`

```typescript
// Global configuration: CORS, ValidationPipe, dynamic port
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const port = parseInt(process.env.PORT, 10);
  await app.listen((port >= 1 && port <= 65535) ? port : 3000);
}
```

**Requirement Coverage:** R1 (CORS, ValidationPipe, port), R12 (global errors via NestJS defaults)

---

### 2. Auth Module

**Files:** `src/auth/jwt.strategy.ts`, `src/auth/jwt-auth.guard.ts`, `src/auth/roles.guard.ts`, `src/auth/roles.decorator.ts`

**New additions:**
- `RolesGuard`: Custom guard that reads `@Roles()` metadata and compares with `req.user.role`
- `@Roles()` decorator: SetMetadata to declare allowed roles

```typescript
// roles.decorator.ts
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

**Requirement Coverage:** R2 (JWT validation), R5/R6/R7/R9/R10 (role-based access)

---

### 3. Volunteers Module

**Files:**
- `src/volunteers/volunteers.controller.ts`
- `src/volunteers/volunteers.service.ts`
- `src/volunteers/dto/create-volunteer.dto.ts`

**Endpoints:**

| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| POST   | /volunteers | JWT | any | Create volunteer profile |
| GET    | /volunteers/top-monthly | - | - | Top 3 volunteers of the month |
| GET    | /volunteers/me/dashboard | JWT | volunteer | Dashboard data |
| GET    | /volunteers/me/activity | JWT | volunteer | Activity history |
| GET    | /volunteers/me/recommendations | JWT | volunteer | Recommendations |
| GET    | /volunteers/me/applications | JWT | volunteer | My applications |
| GET    | /volunteers/:id | - | - | Public profile |

**Service Methods:**
- `create(userId, dto)` → insert into `volunteers`, check for duplicate
- `findOne(id)` → select from `volunteers` where id
- `findByUserId(userId)` → select from `volunteers` where user_id
- `getTopMonthly()` → aggregate `activity_logs` for current month, join `volunteers`, order by hours desc, limit 3
- `getDashboard(userId)` → volunteer profile + aggregate totalHours from activity_logs + count distinct shelter_id
- `getActivity(userId)` → select from activity_logs join opportunities, format time as relative
- `getRecommendations(userId)` → select active opportunities NOT already applied by user, limit 5
- `getApplications(userId, statusFilter?)` → select from applications join opportunities join shelters

**Requirement Coverage:** R5, R7, R8, R11

---

### 4. Shelters Module

**Files:**
- `src/shelters/shelters.controller.ts`
- `src/shelters/shelters.service.ts`
- `src/shelters/dto/create-shelter.dto.ts`

**Endpoints:**

| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| POST   | /shelters | JWT | any | Create shelter profile |
| GET    | /shelters | - | - | List shelters |
| GET    | /shelters/me/dashboard | JWT | shelter | Dashboard data |
| GET    | /shelters/me/applications/recent | JWT | shelter | Recent applications |
| GET    | /shelters/:id | - | - | Shelter detail + opportunities |

**Service Methods:**
- `create(userId, dto)` → insert into `shelters`, check for duplicate
- `findAll()` → select shelters + count active opportunities per shelter
- `findOne(id)` → select shelter + select active opportunities for that shelter
- `findByUserId(userId)` → select from shelters where user_id
- `getDashboard(userId)` → shelter stats aggregate
- `getRecentApplications(userId)` → recent 10 applications for shelter's opportunities

**Requirement Coverage:** R4, R6, R11

---

### 5. Opportunities Module

**Files:**
- `src/opportunities/opportunities.controller.ts`
- `src/opportunities/opportunities.service.ts`
- `src/opportunities/dto/create-opportunity.dto.ts`
- `src/opportunities/dto/update-opportunity.dto.ts`
- `src/opportunities/dto/filter-opportunities.dto.ts`

**Endpoints:**

| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| GET    | /opportunities | - | - | List active opportunities (filterable) |
| GET    | /opportunities/:id | - | - | Opportunity detail |
| POST   | /opportunities | JWT | shelter | Create opportunity |
| PATCH  | /opportunities/:id | JWT | shelter | Update opportunity |
| DELETE | /opportunities/:id | JWT | shelter | Soft-delete (isActive=false) |
| POST   | /opportunities/:id/apply | JWT | volunteer | Apply to opportunity |

**Service Methods:**
- `findAll(filters)` → select from opportunities where is_active=true, join shelters for shelterName, apply filters
- `findOne(id)` → select single opportunity with shelter info
- `create(shelterId, dto)` → insert opportunity, set availableSpaces = totalSpaces, isActive = true
- `update(id, shelterId, dto)` → check ownership, partial update
- `softDelete(id, shelterId)` → check ownership, set is_active = false
- `apply(opportunityId, volunteerId)` → check exists, check duplicate, insert application

**Requirement Coverage:** R3, R7, R9

---

### 6. Applications Module (NEW)

**Files:**
- `src/applications/applications.controller.ts`
- `src/applications/applications.service.ts`
- `src/applications/applications.module.ts`
- `src/applications/dto/update-application-status.dto.ts`

**Endpoints:**

| Method | Path | Auth | Role | Description |
|--------|------|------|------|-------------|
| PATCH  | /applications/:id/status | JWT | shelter | Approve/reject application |

**Service Methods:**
- `updateStatus(applicationId, shelterId, newStatus)` → verify ownership, update status, adjust availableSpaces

**Requirement Coverage:** R10

---

## DTOs & Validation

### CreateVolunteerDto
```typescript
class CreateVolunteerDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() role: string;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsString() avatarUrl?: string;
}
```

### CreateShelterDto
```typescript
class CreateShelterDto {
  @IsString() @IsNotEmpty() name: string;
  @IsOptional() @IsString() description?: string;
  @IsString() @IsNotEmpty() location: string;
  @IsOptional() @IsString() contactNumber?: string;
  @IsOptional() @IsInt() @Min(0) animalCapacity?: number;
  @IsOptional() @IsString() logo?: string;
}
```

### CreateOpportunityDto
```typescript
class CreateOpportunityDto {
  @IsString() @IsNotEmpty() name: string;
  @IsString() @IsNotEmpty() category: string;
  @IsString() @IsNotEmpty() location: string;
  @IsString() @IsNotEmpty() date: string;
  @IsString() @IsNotEmpty() duration: string;
  @IsInt() @Min(1) totalSpaces: number;
  @IsOptional() @IsString() image?: string;
}
```

### UpdateOpportunityDto
```typescript
class UpdateOpportunityDto extends PartialType(CreateOpportunityDto) {}
```

### UpdateApplicationStatusDto
```typescript
class UpdateApplicationStatusDto {
  @IsIn(['approved', 'rejected']) status: string;
}
```

### FilterOpportunitiesDto (Query params)
```typescript
class FilterOpportunitiesDto {
  @IsOptional() @IsString() shelterId?: string;
  @IsOptional() @IsString() category?: string;
  @IsOptional() @IsString() location?: string;
}
```

---

## Error Handling Strategy

1. **NestJS built-in `HttpException`** for all controlled errors (400, 401, 403, 404, 409)
2. **Global Exception Filter** (optional override) that:
   - Catches unhandled errors → 500 with generic message
   - Catches Supabase errors → full log to console, generic 500 to client
3. **ValidationPipe** automatically handles 400 responses with field details

---

## Supabase Integration Pattern

Each service injects `SupabaseService` and uses the pattern:

```typescript
@Injectable()
export class ExampleService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase.getClient()
      .from('table_name')
      .select('*')
      .eq('is_active', true);
    
    if (error) {
      console.error('Supabase error:', error.message);
      throw new InternalServerErrorException('Internal server error');
    }
    return data;
  }
}
```

---

## Key Design Decisions

1. **Supabase as DB + Auth**: No TypeORM/Prisma is used; queries go directly via `@supabase/supabase-js`. This simplifies the architecture since Supabase handles auth, storage, and database.

2. **Soft-delete for opportunities**: `DELETE /opportunities/:id` sets `is_active = false` instead of deleting the row, preserving referential integrity with applications.

3. **Applications as a separate module**: Although applications are linked to opportunities and volunteers, they have their own endpoint for shelter management, justifying an independent module.

4. **Centralized RolesGuard**: A single reusable guard with the `@Roles()` decorator avoids duplicated authorization logic in each controller.

5. **Relative time calculated on backend**: The `time` fields ("2 days ago") are calculated server-side for consistency, using timestamp differences with `Date.now()`.

6. **class-validator + class-transformer**: Declarative validation in DTOs, activated globally by `ValidationPipe`.

---

## Dependencies to Add

```json
{
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1"
}
```

These are necessary for `ValidationPipe` to work with the validation decorators in the DTOs.

---

## File Structure (Final)

```
backend/src/
├── main.ts                          (bootstrap with CORS + ValidationPipe)
├── app.module.ts                    (imports all modules + ConfigModule)
├── app.controller.ts
├── app.service.ts
├── auth/
│   ├── auth.module.ts
│   ├── jwt.strategy.ts             (existing)
│   ├── jwt-auth.guard.ts           (existing)
│   ├── roles.guard.ts              (NEW)
│   └── roles.decorator.ts          (NEW)
├── supabase/
│   ├── supabase.module.ts          (existing)
│   └── supabase.service.ts         (existing)
├── volunteers/
│   ├── volunteers.module.ts
│   ├── volunteers.controller.ts    (rewrite)
│   ├── volunteers.service.ts       (rewrite)
│   └── dto/
│       └── create-volunteer.dto.ts (rewrite)
├── shelters/
│   ├── shelters.module.ts
│   ├── shelters.controller.ts      (rewrite)
│   ├── shelters.service.ts         (rewrite)
│   └── dto/
│       └── create-shelter.dto.ts   (rewrite)
├── opportunities/
│   ├── opportunities.module.ts
│   ├── opportunities.controller.ts (rewrite)
│   ├── opportunities.service.ts    (rewrite)
│   └── dto/
│       ├── create-opportunity.dto.ts (rewrite)
│       ├── update-opportunity.dto.ts (rewrite)
│       └── filter-opportunities.dto.ts (NEW)
├── applications/                   (NEW MODULE)
│   ├── applications.module.ts
│   ├── applications.controller.ts
│   ├── applications.service.ts
│   └── dto/
│       └── update-application-status.dto.ts
└── common/
    └── filters/
        └── supabase-exception.filter.ts (NEW)
```
