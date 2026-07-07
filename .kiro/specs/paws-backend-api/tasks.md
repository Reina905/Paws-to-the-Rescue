# Implementation Tasks

## Task 1: API bootstrap and global configuration
- [x] Requirement: R1, R12
- [x] Install `class-validator` and `class-transformer` dependencies
- [x] Update `main.ts` to enable CORS with origin `http://localhost:5173`, allowed methods and headers
- [x] Add global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true`
- [x] Configure dynamic port from `PORT` env var with range validation (1-65535, default 3000)
- [x] Add `ConfigModule.forRoot({ isGlobal: true })` to `AppModule`
- [x] Fix duplicate imports in `app.module.ts`
- [x] Add global exception filter for Supabase errors (log internally, return generic 500)

## Task 2: Auth guards and role decorators
- [x] Requirement: R2, R5, R6, R7, R9, R10
- [x] Create `src/auth/roles.decorator.ts` with `@Roles()` SetMetadata decorator
- [x] Create `src/auth/roles.guard.ts` implementing `CanActivate`, reading roles from metadata and comparing with `req.user.role`, returning 403 if unauthorized
- [x] Update `auth.module.ts` to export `RolesGuard`
- [x] Verify `JwtStrategy` handles missing `user_metadata` by defaulting to `null`

## Task 3: Volunteers module — Registration and profile
- [x] Requirement: R11, R5
- [x] Rewrite `CreateVolunteerDto` with class-validator decorators: `name` (required string), `role` (required string), `bio` (optional string), `avatarUrl` (optional string)
- [x] Rewrite `VolunteersService` to inject `SupabaseService` and implement: `create(userId, dto)` with duplicate check (409), `findOne(id)` with 404, `findByUserId(userId)`
- [x] Update `VolunteersController` endpoint `POST /volunteers` to use JwtAuthGuard, extract `req.user.id`, call service.create
- [x] Update `VolunteersController` endpoint `GET /volunteers/:id` to return volunteer profile or 404
- [x] Update `VolunteersModule` to import `SupabaseModule` and `AuthModule`

## Task 4: Volunteers module — Dashboard, activity, and recommendations
- [x] Requirement: R5, R8
- [x] Add `getDashboard(userId)` to VolunteersService: query volunteer profile + aggregate totalHours from activity_logs + count distinct shelter_id for sheltersAssisted + format `since` as "MMM YYYY"
- [x] Add `getActivity(userId)` to VolunteersService: query activity_logs joined with opportunities/shelters, format `time` as relative string, format `hours` as "N hours"
- [x] Add `getRecommendations(userId)` to VolunteersService: query active opportunities not yet applied by user, limit 5, return title/location/description/tag
- [x] Add `getTopMonthly()` to VolunteersService: aggregate activity_logs for current calendar month, join volunteers, order desc by hours, limit 3, assign `place` and `label`
- [x] Add controller endpoints: `GET /volunteers/me/dashboard`, `GET /volunteers/me/activity`, `GET /volunteers/me/recommendations` (all with JwtAuthGuard + RolesGuard + @Roles('volunteer'))
- [x] Add controller endpoint `GET /volunteers/top-monthly` (public, no auth)

## Task 5: Volunteers module — Volunteer applications
- [x] Requirement: R7
- [x] Add `getApplications(userId, statusFilter?)` to VolunteersService: query applications join opportunities join shelters, return id/title/shelter/location/date/hours/status, filter by status if provided, validate status param (400 if invalid)
- [x] Add controller endpoint `GET /volunteers/me/applications` with JwtAuthGuard + RolesGuard + @Roles('volunteer'), accept optional `status` query param

## Task 6: Shelters module — Registration and listing
- [x] Requirement: R11, R4
- [x] Rewrite `CreateShelterDto` with class-validator: `name` (required), `description` (optional), `location` (required), `contactNumber` (optional), `animalCapacity` (optional int ≥0), `logo` (optional)
- [x] Rewrite `SheltersService` to inject `SupabaseService` and implement: `create(userId, dto)` with duplicate check (409), `findAll()` with activeVolunteerOpportunities count, `findOne(id)` with opportunities array, `findByUserId(userId)`
- [x] Rewrite `SheltersController`: `POST /shelters` with JwtAuthGuard, `GET /shelters` (public), `GET /shelters/:id` (public, handle "me" route conflict)
- [x] Update `SheltersModule` to import `SupabaseModule` and `AuthModule`

## Task 7: Shelters module — Dashboard
- [x] Requirement: R6
- [x] Add `getDashboard(userId)` to SheltersService: query shelter + count active opportunities + count approved volunteers + count pending applications + totalAnimals
- [x] Add `getRecentApplications(userId)` to SheltersService: query last 10 applications for shelter's opportunities, join volunteer names, format time as relative
- [x] Add controller endpoints: `GET /shelters/me/dashboard` and `GET /shelters/me/applications/recent` with JwtAuthGuard + RolesGuard + @Roles('shelter')

## Task 8: Opportunities module — Public listing and detail
- [x] Requirement: R3
- [x] Create `FilterOpportunitiesDto` with optional `shelterId`, `category`, `location` (all strings)
- [x] Rewrite `OpportunitiesService.findAll(filters)`: query opportunities where is_active=true, join shelters for shelterName (name+logo), apply filters with AND logic and case-insensitive matching
- [x] Rewrite `OpportunitiesService.findOne(id)`: return full opportunity object regardless of isActive, throw 404 if not found
- [x] Update `OpportunitiesController`: `GET /opportunities` (public, accept query params), `GET /opportunities/:id` (public)

## Task 9: Opportunities module — CRUD by shelter
- [x] Requirement: R9
- [x] Rewrite `CreateOpportunityDto` with class-validator: `name`, `category`, `location`, `date`, `duration` (required strings), `totalSpaces` (required int ≥1), `image` (optional)
- [x] Rewrite `UpdateOpportunityDto` using `PartialType(CreateOpportunityDto)`
- [x] Add `create(shelterId, dto)` to OpportunitiesService: insert with availableSpaces=totalSpaces, isActive=true
- [x] Add `update(id, shelterId, dto)` to OpportunitiesService: verify ownership (403), partial update, return updated
- [x] Add `softDelete(id, shelterId)` to OpportunitiesService: verify ownership (403), set is_active=false
- [x] Add `apply(opportunityId, volunteerId)` to OpportunitiesService: check opportunity exists (404), check duplicate application (409), insert application with status 'pending', return created application
- [x] Update controller: `POST /opportunities` (JwtAuthGuard + @Roles('shelter')), `PATCH /opportunities/:id` (same), `DELETE /opportunities/:id` (same), `POST /opportunities/:id/apply` (JwtAuthGuard + @Roles('volunteer'))
- [x] Update `OpportunitiesModule` to import `SupabaseModule` and `AuthModule`

## Task 10: Applications module — Management by shelter
- [x] Requirement: R10
- [x] Create `src/applications/applications.module.ts`
- [x] Create `UpdateApplicationStatusDto` with class-validator: `status` must be `IsIn(['approved', 'rejected'])`
- [x] Create `ApplicationsService` with `updateStatus(applicationId, shelterUserId, newStatus)`: find application + opportunity, verify shelter ownership (403), handle 404, check availableSpaces for approval (409), update status, adjust availableSpaces (+1 for approved→rejected, -1 for non-approved→approved)
- [x] Create `ApplicationsController` with `PATCH /applications/:id/status` using JwtAuthGuard + RolesGuard + @Roles('shelter')
- [x] Register `ApplicationsModule` in `AppModule` imports

## Task 11: Build verification and startup check
- [x] Run `pnpm install` to install new dependencies
- [x] Run `pnpm build` to verify TypeScript compilation passes with no errors
- [x] Verify all modules are properly registered and no circular dependencies exist
