# Requirements Document

## Introduction

This document defines the requirements for the NestJS backend of the **Paws to the Rescue** platform, a volunteering application for cat shelters. The backend exposes a REST API consumed by the React frontend (Vite) via axios with Bearer Token authentication issued by Supabase Auth. The skeleton modules already exist (`auth`, `volunteers`, `shelters`, `opportunities`, `badges`, `supabase`); this spec covers the full implementation of their services, controllers, DTOs, and endpoint security.

---

## Glossary

- **API**: The NestJS application running at `http://localhost:3000` that exposes the REST endpoints.
- **Supabase_Client**: Instance of `@supabase/supabase-js` provided by `SupabaseService.getClient()`.
- **JWT_Guard**: The Passport `JwtAuthGuard` that validates the Bearer token issued by Supabase Auth.
- **Volunteer**: A user registered with the `volunteer` role; has a profile, activity history, and applications to opportunities.
- **Shelter**: An organization registered with the `shelter` role; manages volunteering opportunities.
- **Opportunity**: A volunteering shift or activity published by a Shelter.
- **Application**: A Volunteer's registration to participate in an Opportunity. Volunteers are auto-approved upon registration (status is immediately `approved`). No shelter approval is required.
- **Badge**: An achievement awarded to a Volunteer upon reaching certain milestones.
- **Dashboard_Volunteer**: The Volunteer's personal dashboard view.
- **Dashboard_Shelter**: The Shelter's management dashboard view.
- **CORS_Origin**: Allowed origin for cross-origin requests, defaults to `http://localhost:5173`.

---

## Requirements

### Requirement 1: Global API Configuration

**User Story:** As a frontend developer, I want the API to start correctly with CORS enabled and global validation, so that the React client can consume it without network errors or invalid payloads.

#### Acceptance Criteria

1. WHEN the API starts, THE API SHALL enable CORS with origin `http://localhost:5173`, allowing methods `GET`, `POST`, `PATCH`, `PUT`, `DELETE`, and `OPTIONS`, and the `Authorization` header.
2. WHEN the API receives a preflight `OPTIONS` request, THE API SHALL respond with HTTP 204 and include the corresponding CORS headers before processing the main request.
3. THE API SHALL apply `ValidationPipe` globally with `whitelist: true` and `forbidNonWhitelisted: true`.
4. WHEN the API starts, THE API SHALL listen on the port defined by the environment variable `PORT` if its value is in the range 1–65535; IF the variable is not defined or is out of range, THEN THE API SHALL use port `3000`.
5. WHEN a request arrives with a payload that violates the DTO validation rules, THEN THE API SHALL respond with HTTP 400 and include in `message` an array identifying each invalid field and the violated constraint (e.g., `"name must be a string"`).

---

### Requirement 2: Supabase JWT Authentication

**User Story:** As an authenticated user, I want my requests to be validated with the Supabase JWT token, so that only I can access my protected resources.

#### Acceptance Criteria

1. THE JWT_Guard SHALL extract the token from the `Authorization: Bearer <token>` header on each protected request.
2. THE JWT_Guard SHALL verify the token signature using the `SUPABASE_JWT_SECRET` environment secret with the `HS256` algorithm.
3. WHEN the token is valid, THE JWT_Guard SHALL inject into `req.user` the fields `id` (claim `sub`), `email`, `role`, and `metadata` (claim `user_metadata`); IF the `user_metadata` claim is absent from the token, THEN `metadata` SHALL be `null`.
4. IF the token is absent or invalid, THEN THE JWT_Guard SHALL respond with HTTP 401.
5. IF the token has expired, THEN THE JWT_Guard SHALL respond with HTTP 401.
6. IF the environment variable `SUPABASE_JWT_SECRET` is not defined when the API starts, THEN THE API SHALL throw a startup error and log it to the console without exposing the secret value.

---

### Requirement 3: Listing Volunteering Opportunities

**User Story:** As a visitor on the `/volunteering` page, I want to get the list of active volunteering opportunities with all the fields needed for the card, so I can choose which one to participate in.

#### Acceptance Criteria

1. WHEN `GET /opportunities` is performed, THE API SHALL respond with HTTP 200 and an array of objects with the fields: `id`, `image`, `category`, `shelterName` (object with `name` and `logo`), `name`, `location`, `date`, `duration`, `availableSpaces`, `totalSpaces`. IF no active opportunities exist, THE API SHALL respond with HTTP 200 and an empty array `[]`.
2. THE API SHALL include only opportunities whose `isActive` field is `true`.
3. IF the query parameter `shelterId` is present but does not correspond to any existing Shelter, THE API SHALL respond with HTTP 200 and an empty array `[]`.
4. IF the query parameters `category` and/or `location` are present, THE API SHALL filter the result applying the conditions with AND logic and case-insensitive comparison.
5. WHEN `GET /opportunities/:id` is performed, THE API SHALL respond with HTTP 200 and all stored fields of the opportunity, regardless of the `isActive` value.
6. IF the identifier `:id` does not correspond to any opportunity, THEN THE API SHALL respond with HTTP 404.

---

### Requirement 4: Shelter Management

**User Story:** As a visitor on the `/shelters` page, I want to get the list of shelters with their basic statistics to learn where I can volunteer.

#### Acceptance Criteria

1. WHEN `GET /shelters` is performed, THE API SHALL respond with HTTP 200 and an array of objects with the fields: `id`, `name`, `logo`, `description`, `contactNumber`, `location`, `animalCapacity`, `activeVolunteerOpportunities`. IF no shelters exist, THE API SHALL respond with HTTP 200 and `[]`.
2. THE API SHALL calculate `activeVolunteerOpportunities` as the count of Opportunities with `isActive: true` associated with the Shelter; IF there are none, the value SHALL be `0`.
3. WHEN `GET /shelters/:id` is performed, THE API SHALL respond with HTTP 200 with the full Shelter object plus an `opportunities` array containing the objects of its active opportunities with the fields `id`, `name`, `category`, `location`, `date`, `duration`, `availableSpaces`, `totalSpaces`; IF there are no active opportunities, `opportunities` SHALL be `[]`.
4. IF the identifier `:id` does not correspond to any Shelter, THEN THE API SHALL respond with HTTP 404 and `message: "Shelter not found"`.

---

### Requirement 5: Volunteer Dashboard

**User Story:** As an authenticated volunteer, I want to access my personal dashboard with my profile, activity history, and recommendations, to track my participation.

#### Acceptance Criteria

1. THE JWT_Guard SHALL protect the endpoints `GET /volunteers/me/dashboard`, `GET /volunteers/me/activity`, and `GET /volunteers/me/recommendations`; IF the token is absent or invalid, THE API SHALL respond with HTTP 401.
2. IF the token is valid but the `role` claim is not `volunteer`, THEN THE API SHALL respond with HTTP 403.
3. WHEN `GET /volunteers/me/dashboard` is performed with a valid token with role `volunteer`, THE API SHALL respond with HTTP 200 and an object with: `name` (string), `role` (string), `since` (string in `MMM YYYY` format, e.g., `"Oct 2023"`), `totalHours` (non-negative integer), `sheltersAssisted` (non-negative integer).
4. WHEN `GET /volunteers/me/activity` is performed with a valid token with role `volunteer`, THE API SHALL respond with HTTP 200 and an array of completed activities, each with: `title` (string), `location` (string), `time` (string in readable relative format, e.g., `"2 days ago"`), `hours` (string, e.g., `"3 hours"`), `note` (string). IF there are no activities, THE API SHALL respond with `[]`.
5. WHEN `GET /volunteers/me/recommendations` is performed with a valid token with role `volunteer`, THE API SHALL respond with HTTP 200 and an array of recommended opportunities, each with: `title` (string), `location` (string), `description` (string), `tag` (string or `null`). IF there are no recommendations, THE API SHALL respond with `[]`.
6. IF the token does not correspond to an existing Volunteer profile in the database, THEN THE API SHALL respond with HTTP 404.

---

### Requirement 6: Shelter Dashboard

**User Story:** As an authenticated shelter administrator, I want to access my shelter's dashboard with statistics and recent volunteer registrations, to monitor my shelter's activity.

#### Acceptance Criteria

1. THE JWT_Guard SHALL protect the endpoints `GET /shelters/me/dashboard` and `GET /shelters/me/applications/recent`; IF the token is absent or invalid, THE API SHALL respond with HTTP 401.
2. IF the token is valid but the `role` claim is not `shelter`, THEN THE API SHALL respond with HTTP 403.
3. WHEN `GET /shelters/me/dashboard` is performed with a valid token with role `shelter`, THE API SHALL respond with HTTP 200 and an object with: `name` (string), `location` (string), `totalAnimals` (integer, sum of animals currently registered in the Shelter), `volunteers` (integer, count of Volunteers with at least one registration in the Shelter's Opportunities), `activeOpportunities` (integer, count of Opportunities with `isActive: true`).
4. WHEN `GET /shelters/me/applications/recent` is performed with a valid token with role `shelter`, THE API SHALL respond with HTTP 200 and an array of up to 10 most recent volunteer registrations ordered by `createdAt` descending, each with: `name` (Volunteer's name), `role` (Opportunity's name), `time` (string in readable relative format, e.g., `"2 hours ago"`). IF there are no registrations, THE API SHALL respond with `[]`.
5. IF the token does not correspond to an existing Shelter profile, THEN THE API SHALL respond with HTTP 404.

---

### Requirement 7: Volunteer Registrations

**User Story:** As an authenticated volunteer, I want to register for volunteering opportunities and see my registrations, to track my participation.

#### Acceptance Criteria

1. THE JWT_Guard SHALL protect `GET /volunteers/me/applications` and `POST /opportunities/:id/apply`; IF the token is absent or invalid, THE API SHALL respond with HTTP 401.
2. WHEN `GET /volunteers/me/applications` is performed with a valid token, THE API SHALL respond with HTTP 200 and an array of the authenticated Volunteer's registrations with: `id`, `title`, `shelter`, `location`, `date`, `hours`, `status`. IF there are no registrations, THE API SHALL respond with `[]`.
3. THE API SHALL include registrations with status `approved` (all registrations are auto-approved).
4. WHEN `POST /opportunities/:id/apply` is performed with a valid token, THE API SHALL create a registration with status `approved` immediately (no shelter approval required), decrement the Opportunity's `availableSpaces` by 1, and respond with HTTP 201 and the object `{ id, opportunityId, volunteerId, status: "registered" }`.
5. IF the Volunteer is already registered for that same Opportunity, THEN THE API SHALL respond with HTTP 409 and `message: "You are already registered for this opportunity"`.
6. IF the Opportunity identifier does not exist, THEN THE API SHALL respond with HTTP 404.
7. IF the Opportunity has no available spaces (`availableSpaces` is 0), THEN THE API SHALL respond with HTTP 409 and `message: "No available spaces for this opportunity"`.

---

### Requirement 8: Volunteers of the Month (Home)

**User Story:** As a visitor on the home page, I want to see the three volunteers with the most registered hours in the current month, to learn about those who contribute the most.

#### Acceptance Criteria

1. WHEN `GET /volunteers/top-monthly` is performed, THE API SHALL respond with HTTP 200 and an array of up to 3 objects with the fields: `place` (integer 1, 2, or 3), `name` (string), `hours` (non-negative integer), `label` (string).
2. THE API SHALL order the results from highest to lowest by `hours` accumulated in the current calendar month (full current calendar month).
3. IF fewer than 3 volunteers have registered hours in the month, THE API SHALL return only the available ones without filling empty positions.

---

### Requirement 9: Opportunity Management by Shelter

**User Story:** As an authenticated shelter administrator, I want to create, update, and deactivate volunteering opportunities from the dashboard, to manage available shifts.

#### Acceptance Criteria

1. THE JWT_Guard SHALL protect `POST /opportunities`, `PATCH /opportunities/:id`, and `DELETE /opportunities/:id`; IF the token is absent or invalid, THE API SHALL respond with HTTP 401.
2. WHEN `POST /opportunities` is performed with a valid payload and a `shelter` role token, THE API SHALL create the Opportunity associated with the authenticated user's Shelter (using `req.user.id`) and respond with HTTP 201 with the full created object.
3. THE API SHALL require in the creation payload the fields: `name` (string), `category` (string), `location` (string), `date` (string), `duration` (string), `totalSpaces` (positive integer). `availableSpaces` SHALL be initialized with the same value as `totalSpaces`. `isActive` SHALL be initialized to `true`.
4. IF any required field is absent or has an incorrect type, THEN THE API SHALL respond with HTTP 400 with details of the invalid fields.
5. WHEN `PATCH /opportunities/:id` is performed with a valid `shelter` role token, THE API SHALL update only the fields sent in the payload and respond with HTTP 200 with the updated object.
6. IF the authenticated Shelter is not the owner of the Opportunity with `:id`, THEN THE API SHALL respond with HTTP 403.
7. WHEN `DELETE /opportunities/:id` is performed by the owning Shelter, THE API SHALL mark the Opportunity as `isActive: false` (soft-delete) and respond with HTTP 200.

---

### Requirement 10: Shelter Visibility of Registrations

**User Story:** As an authenticated shelter administrator, I want to see which volunteers registered for my opportunities, to know who is participating in each shift.

#### Acceptance Criteria

1. THE JWT_Guard SHALL protect `GET /shelters/me/applications/recent`; IF the token is absent or invalid, THE API SHALL respond with HTTP 401.
2. IF the token is valid but the `role` claim is not `shelter`, THEN THE API SHALL respond with HTTP 403.
3. WHEN `GET /shelters/me/applications/recent` is performed with a valid `shelter` role token, THE API SHALL respond with HTTP 200 and an array of up to 10 most recent volunteer registrations ordered by `createdAt` descending, each with: `name` (Volunteer's name), `role` (Opportunity's name), `time` (string in readable relative format, e.g., `"2 hours ago"`). IF there are no registrations, THE API SHALL respond with `[]`.
4. IF the token does not correspond to an existing Shelter profile, THEN THE API SHALL respond with HTTP 404.

> Note: Shelters do not approve or reject volunteer registrations. Volunteers register directly and are immediately confirmed.

---

### Requirement 11: User Registration and Profile

**User Story:** As a new user, I want to complete my profile after registering with Supabase Auth, so the platform has my volunteer or shelter data.

#### Acceptance Criteria

1. WHEN `POST /volunteers` is performed with a valid token and the payload `{ name, role, bio, avatarUrl }`, THE API SHALL create the Volunteer profile in Supabase linked to the token's `sub` (`user_id`) and respond with HTTP 201 with the created profile.
2. IF a Volunteer profile already exists for that `sub`, THEN THE API SHALL respond with HTTP 409 and `message: "Volunteer profile already exists"`.
3. WHEN `POST /shelters` is performed with a valid token and the payload `{ name, description, location, contactNumber, animalCapacity, logo }`, THE API SHALL create the Shelter profile linked to the token's `sub` and respond with HTTP 201 with the created profile.
4. IF a Shelter profile already exists for that `sub`, THEN THE API SHALL respond with HTTP 409 and `message: "Shelter profile already exists"`.
5. WHEN `GET /volunteers/:id` is performed with a valid `id`, THE API SHALL respond with HTTP 200 and the Volunteer's profile; IF the `id` does not exist, THE API SHALL respond with HTTP 404.
6. WHEN `GET /shelters/:id` is performed with a valid `id` (different from `"me"`), THE API SHALL respond with HTTP 200 and the Shelter's profile; IF the `id` does not exist, THE API SHALL respond with HTTP 404.

---

### Requirement 12: Global Error Handling

**User Story:** As a frontend developer, I want to receive consistent error responses in a standard format, so I can display useful messages to the user without additional logic.

#### Acceptance Criteria

1. THE API SHALL return all errors in the format `{ statusCode: number, message: string | string[], error: string }` following the standard NestJS `HttpException` structure.
2. WHEN an unhandled error occurs on the server, THE API SHALL respond with HTTP 500, `message: "Internal server error"`, and `error: "Internal Server Error"` without exposing stack traces or internal details to the client.
3. WHEN a Supabase_Client query fails, THE API SHALL log the full error (including the Supabase message) to the console at `error` level, and respond to the client with HTTP 500 in the standard format without including the internal Supabase message in the response.
