# Technical Design Document

## Introduction

Este documento describe el diseño técnico del backend NestJS para **Paws to the Rescue**. Se basa en los 12 requisitos definidos en `requirements.md` y aprovecha la infraestructura existente: módulos skeleton (`auth`, `volunteers`, `shelters`, `opportunities`, `badges`, `supabase`), Supabase como base de datos y proveedor de autenticación, y el frontend React que consume la API en `http://localhost:3000`.

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
// Configuración global: CORS, ValidationPipe, puerto dinámico
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

**Requirement Coverage:** R1 (CORS, ValidationPipe, puerto), R12 (errores globales via NestJS defaults)

---

### 2. Auth Module

**Files:** `src/auth/jwt.strategy.ts`, `src/auth/jwt-auth.guard.ts`, `src/auth/roles.guard.ts`, `src/auth/roles.decorator.ts`

**New additions:**
- `RolesGuard`: Custom guard que lee `@Roles()` metadata y compara con `req.user.role`
- `@Roles()` decorator: SetMetadata para declarar roles permitidos

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
| POST   | /volunteers | JWT | any | Crear perfil de voluntario |
| GET    | /volunteers/top-monthly | - | - | Top 3 voluntarios del mes |
| GET    | /volunteers/me/dashboard | JWT | volunteer | Dashboard datos |
| GET    | /volunteers/me/activity | JWT | volunteer | Historial actividades |
| GET    | /volunteers/me/recommendations | JWT | volunteer | Recomendaciones |
| GET    | /volunteers/me/applications | JWT | volunteer | Mis aplicaciones |
| GET    | /volunteers/:id | - | - | Perfil público |

**Service Methods:**
- `create(userId, dto)` → insert en `volunteers`, check duplicado
- `findOne(id)` → select from `volunteers` where id
- `findByUserId(userId)` → select from `volunteers` where user_id
- `getTopMonthly()` → aggregate `activity_logs` del mes actual, join `volunteers`, order by hours desc, limit 3
- `getDashboard(userId)` → volunteer profile + aggregate totalHours from activity_logs + count distinct shelter_id
- `getActivity(userId)` → select from activity_logs join opportunities, format time relative
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
| POST   | /shelters | JWT | any | Crear perfil de refugio |
| GET    | /shelters | - | - | Listar refugios |
| GET    | /shelters/me/dashboard | JWT | shelter | Dashboard datos |
| GET    | /shelters/me/applications/recent | JWT | shelter | Aplicaciones recientes |
| GET    | /shelters/:id | - | - | Detalle refugio + oportunidades |

**Service Methods:**
- `create(userId, dto)` → insert en `shelters`, check duplicado
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
| GET    | /opportunities | - | - | Listar oportunidades activas (filtrable) |
| GET    | /opportunities/:id | - | - | Detalle oportunidad |
| POST   | /opportunities | JWT | shelter | Crear oportunidad |
| PATCH  | /opportunities/:id | JWT | shelter | Actualizar oportunidad |
| DELETE | /opportunities/:id | JWT | shelter | Soft-delete (isActive=false) |
| POST   | /opportunities/:id/apply | JWT | volunteer | Aplicar a oportunidad |

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
| PATCH  | /applications/:id/status | JWT | shelter | Aprobar/rechazar aplicación |

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

1. **NestJS built-in `HttpException`** para todos los errores controlados (400, 401, 403, 404, 409)
2. **Global Exception Filter** (optional override) que:
   - Captura errores no controlados → 500 con mensaje genérico
   - Captura errores de Supabase → log completo en consola, 500 genérico al cliente
3. **ValidationPipe** maneja automáticamente los 400 con detalle de campos

---

## Supabase Integration Pattern

Cada servicio inyecta `SupabaseService` y usa el patrón:

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

1. **Supabase como DB + Auth**: No se usa TypeORM/Prisma; las queries van directamente via `@supabase/supabase-js`. Esto simplifica la arquitectura ya que Supabase maneja auth, storage y database.

2. **Soft-delete para oportunidades**: `DELETE /opportunities/:id` marca `is_active = false` en lugar de eliminar la fila, preservando integridad referencial con applications.

3. **Applications como módulo separado**: Aunque las applications están vinculadas a opportunities y volunteers, tienen su propio endpoint para gestión por el shelter, justificando un módulo independiente.

4. **RolesGuard centralizado**: Un solo guard reutilizable con decorator `@Roles()` evita lógica de autorización duplicada en cada controller.

5. **Tiempo relativo calculado en backend**: Los campos `time` ("2 days ago") se calculan server-side para consistencia, usando diferencia de timestamps con `Date.now()`.

6. **class-validator + class-transformer**: Validación declarativa en DTOs, activada globalmente por `ValidationPipe`.

---

## Dependencies to Add

```json
{
  "class-validator": "^0.14.0",
  "class-transformer": "^0.5.1"
}
```

Estas son necesarias para que `ValidationPipe` funcione con los decorators de validación en los DTOs.

---

## File Structure (Final)

```
backend/src/
├── main.ts                          (bootstrap con CORS + ValidationPipe)
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
