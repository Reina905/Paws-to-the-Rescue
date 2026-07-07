# Implementation Plan: Minimalist Dashboards

## Overview

Implement minimalist dashboard experiences for Shelters and Volunteers in the React (Vite) frontend. The backend API endpoints already exist. This plan focuses on: utility functions, service layer additions, custom hooks, new and enhanced components, new pages, routing, and wiring everything together.

## Tasks

- [x] 1. Create utility functions and service layer foundations
  - [x] 1.1 Create the `relativeTime.js` utility in `src/utils/`
    - Implement `formatRelativeTime(dateString)` function that takes an ISO timestamp and returns a human-readable relative time string
    - Use thresholds: <1h → "Just now", 1–23h → "X hours ago", 1 day → "Yesterday", 2–6 days → "X days ago", 7–29 days → "Last week", 30+ days → "Last month"
    - Export as named export
    - _Requirements: 2.2_

  - [x] 1.2 Create the `opportunityStatus.js` utility in `src/utils/`
    - Implement `deriveOpportunityStatus(opportunity)` function that takes an opportunity object with `isActive`, `date`, and `availableSpaces` fields
    - Return `"closed"` when `isActive` is false
    - Return `"past_date"` when `isActive` is true AND date is before today
    - Return `"full_capacity"` when `isActive` is true AND date is today/future AND `availableSpaces === 0`
    - Return `"open"` when `isActive` is true AND date is today/future AND `availableSpaces > 0`
    - _Requirements: 3.3, 3.4, 3.5, 3.6_

  - [x] 1.3 Add shelter opportunity CRUD functions to `src/services/opportunitiesService.js`
    - Add `getShelterOpportunities(shelterId)` — GET `/opportunities?shelterId=X`
    - Add `createOpportunity(data)` — POST `/opportunities`
    - Add `updateOpportunity(id, data)` — PATCH `/opportunities/:id`
    - Add `deleteOpportunity(id)` — DELETE `/opportunities/:id`
    - Add `getOpportunityApplicants(opportunityId)` — GET `/opportunities/:id/applicants`
    - _Requirements: 3.9, 3.11, 3.12_

  - [x] 1.4 Create `src/services/badgesService.js`
    - Implement `getVolunteerBadges()` — GET `/volunteers/me/badges`
    - Export as named export
    - _Requirements: 6.1_

  - [x] 1.5 Add volunteer history function to `src/services/volunteersService.js`
    - Add `getVolunteerHistory()` — GET `/volunteers/me/applications?status=approved`
    - _Requirements: 7.1_

  - [ ]* 1.6 Write property tests for `relativeTime.js`
    - **Property 2: Relative time formatting produces correct threshold bucket**
    - Use fast-check with `fc.date()` to generate arbitrary timestamps
    - Verify the output matches the correct threshold bucket for the time difference
    - **Validates: Requirements 2.2**

  - [ ]* 1.7 Write property tests for `opportunityStatus.js`
    - **Property 3: Opportunity status derivation correctness**
    - Use fast-check with custom arbitrary: `{ isActive: fc.boolean(), date: fc.date(), availableSpaces: fc.nat() }`
    - Verify the returned status matches the expected derivation rules
    - **Validates: Requirements 3.3, 3.4, 3.5, 3.6**

- [x] 2. Checkpoint - Ensure utilities and services are correct
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Implement Shelter Dashboard enhancements and new components
  - [x] 3.1 Enhance `ShelterDashboardApplications.jsx` to show status and relative time
    - Import `formatRelativeTime` from utils
    - Add a colored status pill/badge (pending=yellow, approved=green, rejected=red) to each application entry
    - Use `formatRelativeTime(createdAt)` to compute the time display
    - Handle empty state using `EmptyState` component when no applications exist
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 3.2 Create `OpportunityCard.jsx` in `src/features/shelterDashboard/`
    - Accept props: `{ opportunity, onEdit, onDelete, onExpand, isExpanded }`
    - Display opportunity name, date, location, category, and a status badge using `deriveOpportunityStatus`
    - Status badge colors: open=green, closed=gray, past_date=orange, full_capacity=red
    - Render edit and delete action buttons
    - When expanded, render `EnrolledVolunteersList` component
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 3.3 Create `EnrolledVolunteersList.jsx` in `src/features/shelterDashboard/`
    - Accept props: `{ volunteers, isLoading }`
    - Render list of volunteer names when volunteers array is non-empty
    - Show "No volunteers currently enrolled" message when array is empty
    - Show loading state while fetching
    - _Requirements: 3.7_

  - [x] 3.4 Create `OpportunityFormModal.jsx` in `src/features/shelterDashboard/`
    - Accept props: `{ opportunity, onSubmit, onCancel, isSubmitting, submitError }`
    - Render a modal with form fields: name (max 100 chars), category (select), location (max 200 chars), date (today or future), duration, totalSpaces (1–10000), image URL (optional)
    - Pre-populate fields in edit mode when `opportunity` prop is provided
    - Use existing `useFormState` and `useFormSubmit` hooks
    - Add inline validation errors for each field per constraints
    - Preserve form data on API error (do not clear fields)
    - Display `FormError` component for API error messages above form
    - _Requirements: 3.8, 3.9, 3.10, 3.11, 3.13_

  - [x] 3.5 Create `DeleteConfirmModal.jsx` in `src/features/shelterDashboard/`
    - Accept props: `{ isOpen, opportunityName, onConfirm, onCancel }`
    - Render accessible confirmation dialog with opportunity name in message
    - Confirm and Cancel buttons
    - _Requirements: 3.12_

  - [x] 3.6 Create `OpportunityCardList.jsx` in `src/features/shelterDashboard/`
    - Accept props: `{ opportunities, onEdit, onDelete, onCreate, onExpand, expandedId, enrolledVolunteers, enrolledLoading }`
    - Render a grid of `OpportunityCard` components sorted by date descending (nearest future first)
    - Include a "Create New Opportunity" button that triggers `onCreate`
    - Show `EmptyState` when opportunities array is empty
    - _Requirements: 3.1, 3.2_

  - [ ]* 3.7 Write property tests for `OpportunityCard`
    - **Property 5: Opportunity card renders all required fields**
    - Use fast-check to generate arbitrary opportunity objects with valid name, date, location, category
    - Verify the rendered output contains all required fields and a status indicator
    - **Validates: Requirements 3.2**

  - [ ]* 3.8 Write property test for opportunity list sorting
    - **Property 4: Opportunities sorted by date descending**
    - Use fast-check with `fc.array(fc.date())` to generate lists of dates
    - Verify the sort utility produces date-descending order
    - **Validates: Requirements 3.1, 7.3**

  - [ ]* 3.9 Write property test for form validation
    - **Property 9: Form validation rejects invalid inputs and accepts valid ones**
    - Use fast-check with `fc.string()` and `fc.integer()` to test boundary conditions
    - Verify names >100 chars rejected, locations >200 chars rejected, past dates rejected, totalSpaces outside [1, 10000] rejected
    - **Validates: Requirements 3.8, 3.9**

- [x] 4. Implement Volunteer Dashboard enhancements and new components
  - [x] 4.1 Create `VolunteerRecentApplications.jsx` in `src/features/volunteerDashboard/`
    - Accept props: `{ applications, isLoading, error }`
    - Display up to 5 recent applications as compact cards
    - Each card shows: opportunity name, shelter name, location, date, and colored status pill
    - Show `EmptyState` when no applications
    - Show `ErrorMessage` when error is truthy
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

  - [x] 4.2 Create `VolunteerRecentBadges.jsx` in `src/features/volunteerDashboard/`
    - Accept props: `{ badges, isLoading, error }`
    - Display up to 5 badges as visual cards with icon/image and name
    - Show `EmptyState` when no badges ("No badges earned yet")
    - Show `ErrorMessage` when error is truthy
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 4.3 Create `ParticipationHistoryCard.jsx` in `src/features/volunteerDashboard/`
    - Accept props: `{ opportunityName, shelterName, location, date, hours, category }`
    - Display all six fields in a card layout
    - _Requirements: 7.2_

  - [x] 4.4 Create `ParticipationHistoryList.jsx` in `src/features/volunteerDashboard/`
    - Accept props: `{ history, isLoading, error }`
    - Render scrollable list of `ParticipationHistoryCard` components sorted by date descending
    - Show `EmptyState` when history is empty
    - Show `ErrorMessage` when error is truthy
    - _Requirements: 7.1, 7.3, 7.4, 7.5_

  - [ ]* 4.5 Write property tests for `VolunteerRecentApplications`
    - **Property 6: Volunteer application card renders all required fields**
    - Use fast-check to generate application objects with valid opportunityName, shelterName, location, date, status
    - Verify rendered output contains all five fields
    - **Validates: Requirements 5.2**

  - [ ]* 4.6 Write property tests for `VolunteerRecentBadges`
    - **Property 7: Badge card renders name and image**
    - Use fast-check to generate badge objects with valid name and imageUrl
    - Verify rendered output contains the badge name and references the image URL
    - **Validates: Requirements 6.2**

  - [ ]* 4.7 Write property tests for `ParticipationHistoryCard`
    - **Property 8: Participation history card renders all required fields**
    - Use fast-check to generate participation records with valid opportunityName, shelterName, location, date, hours, category
    - Verify rendered output contains all six fields
    - **Validates: Requirements 7.2**

- [x] 5. Checkpoint - Ensure all component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create custom hooks and wire pages together
  - [x] 6.1 Add `useShelterOpportunities` hook in `src/hooks/useShelters.js`
    - Use existing `useApi` pattern to wrap `getShelterOpportunities`
    - Return `{ data, loading, error, refetch }`
    - _Requirements: 3.1_

  - [x] 6.2 Add `useVolunteerBadges` hook in `src/hooks/useVolunteers.js`
    - Use existing `useApi` pattern to wrap `getVolunteerBadges`
    - Return `{ data, loading, error }`
    - _Requirements: 6.1_

  - [x] 6.3 Add `useVolunteerHistory` hook in `src/hooks/useVolunteers.js`
    - Use existing `useApi` pattern to wrap `getVolunteerHistory`
    - Return `{ data, loading, error }`
    - _Requirements: 7.1_

  - [x] 6.4 Create `ShelterOpportunityManagement.jsx` page in `src/pages/`
    - Import sidebar, hooks, and shelter opportunity components
    - Use `useShelterOpportunities` to fetch opportunities on mount
    - Manage expanded card state and enrolled volunteers fetching via `getOpportunityApplicants`
    - Wire create/edit/delete flows through `OpportunityFormModal` and `DeleteConfirmModal`
    - Handle CRUD operations (create, update, delete) with error handling and form data preservation
    - Show loading spinner during initial fetch, error message on failure
    - _Requirements: 3.1, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12, 3.13_

  - [x] 6.5 Create `VolunteerParticipationHistory.jsx` page in `src/pages/`
    - Import sidebar and `ParticipationHistoryList`
    - Use `useVolunteerHistory` to fetch participation data on mount
    - Pass data to `ParticipationHistoryList`
    - Show loading spinner during fetch, error message on failure
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 6.6 Enhance `ShelterDashboard.jsx` page
    - Ensure metrics section uses data from existing `useShelterDashboard` hook
    - Wire `ShelterDashboardApplications` with relative time and status badge enhancements
    - Display greeting header containing shelter name ("Welcome, [shelter name]")
    - Handle error states per section (metrics error does not block applications)
    - Show `0` for metrics when no data exists
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.3, 2.4_

  - [x] 6.7 Enhance `VolunteerDashboard.jsx` page
    - Wire `VolunteerRecentApplications` component with volunteer applications data
    - Wire `VolunteerRecentBadges` component with badges data from `useVolunteerBadges`
    - Display volunteer name, role, and join date formatted as "MMM YYYY"
    - Display total hours and shelters assisted metrics
    - Handle error states per section independently
    - Show `0` for metrics when no data exists
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4_

  - [ ]* 6.8 Write property test for shelter dashboard greeting
    - **Property 1: Greeting contains shelter name**
    - Use fast-check with `fc.string({ minLength: 1 })` to generate non-empty shelter names
    - Render ShelterDashboard with mocked hook returning the generated name
    - Verify rendered output contains the exact shelter name
    - **Validates: Requirements 1.4**

- [x] 7. Update routing and sidebar navigation
  - [x] 7.1 Add new routes to `src/App.jsx`
    - Add `/shelter-opportunities` route with `ProtectedRoute(shelter)` guard pointing to `ShelterOpportunityManagement`
    - Add `/volunteer-history` route with `ProtectedRoute(volunteer)` guard pointing to `VolunteerParticipationHistory`
    - Import the new page components
    - _Requirements: 3.1, 7.1_

  - [x] 7.2 Update `ShelterDashboardSidebar.jsx` with new navigation item
    - Add "Manage Opportunities" nav item linking to `/shelter-opportunities`
    - Use an appropriate icon (Briefcase or similar from project's icon library)
    - _Requirements: 3.1_

  - [x] 7.3 Update `DashboardSidebar.jsx` (volunteer) with new navigation item
    - Add "Participation History" nav item linking to `/volunteer-history`
    - Use an appropriate icon (History or similar from project's icon library)
    - _Requirements: 7.1_

- [x] 8. Final checkpoint - Ensure all tests pass and pages render correctly
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- The backend API endpoints are assumed to already be functional — tasks focus on frontend only
- Existing shared components (`EmptyState`, `ErrorMessage`, `LoadingSpinner`, `FormField`, `FormError`) are reused rather than recreated

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5"] },
    { "id": 1, "tasks": ["1.6", "1.7", "3.1", "3.3", "3.5", "4.1", "4.2", "4.3"] },
    { "id": 2, "tasks": ["3.2", "3.4", "3.9", "4.4", "4.5", "4.6", "4.7"] },
    { "id": 3, "tasks": ["3.6", "3.7", "3.8", "6.1", "6.2", "6.3"] },
    { "id": 4, "tasks": ["6.4", "6.5", "6.6", "6.7"] },
    { "id": 5, "tasks": ["6.8", "7.1", "7.2", "7.3"] }
  ]
}
```
