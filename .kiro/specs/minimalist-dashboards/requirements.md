# Requirements Document

## Introduction

This feature provides minimalist dashboard experiences for both Shelters and Volunteers in the "Paws to the Rescue" application. The Shelter Dashboard includes a metrics overview with recent applications and a dedicated screen for managing volunteer opportunity cards (with CRUD operations and enrolled volunteer visibility). The Volunteer Dashboard includes a metrics overview with recent applications and badges, plus a full history screen of all participated volunteer opportunities displayed as cards.

## Glossary

- **Shelter_Dashboard**: The authenticated dashboard interface for shelter users, displaying shelter-specific metrics, recent applications, and opportunity management capabilities.
- **Volunteer_Dashboard**: The authenticated dashboard interface for volunteer users, displaying volunteer-specific metrics, recent applications, badges, and participation history.
- **Opportunity_Card**: A visual card component representing a single volunteer opportunity, showing its status (open, closed, past date, full capacity) and enrolled volunteers.
- **Dashboard_Metrics**: A summary panel displaying key numerical indicators relevant to the authenticated user role.
- **Application**: A record representing a volunteer's request to participate in a specific opportunity, containing status information (pending, approved, rejected).
- **Badge**: A recognition award earned by a volunteer for completing milestones or achievements.
- **Opportunity_Status**: The derived state of an opportunity, computed from its properties: open (active with available spaces and future date), closed (inactive), past date (date has passed), or full capacity (zero available spaces).
- **Enrolled_Volunteer**: A volunteer whose application for a specific opportunity has been approved.

## Requirements

### Requirement 1: Shelter Dashboard Metrics Display

**User Story:** As a shelter administrator, I want to see key metrics on my dashboard, so that I can quickly assess my shelter's volunteering activity at a glance.

#### Acceptance Criteria

1. WHEN an authenticated shelter user navigates to the Shelter_Dashboard, THE Shelter_Dashboard SHALL display the total number of active opportunities (opportunities with `isActive: true`) belonging to that shelter as a non-negative integer.
2. WHEN an authenticated shelter user navigates to the Shelter_Dashboard, THE Shelter_Dashboard SHALL display the total number of unique volunteers who have at least one application with status `approved` across all of the shelter's opportunities, as a non-negative integer.
3. WHEN an authenticated shelter user navigates to the Shelter_Dashboard, THE Shelter_Dashboard SHALL display the count of applications with status `pending` across all of the shelter's opportunities as a non-negative integer.
4. WHEN an authenticated shelter user navigates to the Shelter_Dashboard, THE Shelter_Dashboard SHALL display a greeting header containing the shelter name (e.g., "Welcome, [shelter name]").
5. IF the shelter has no active opportunities, no approved volunteers, and no pending applications, THEN THE Shelter_Dashboard SHALL display `0` for each respective metric.
6. IF the request to retrieve dashboard metrics fails, THEN THE Shelter_Dashboard SHALL display an error message indicating that metrics could not be loaded and SHALL NOT display stale or partial data.

### Requirement 2: Shelter Dashboard Recent Applications

**User Story:** As a shelter administrator, I want to see recent volunteer applications on my dashboard, so that I can stay informed about incoming interest without navigating away.

#### Acceptance Criteria

1. WHEN a shelter user navigates to the Shelter_Dashboard, THE Shelter_Dashboard SHALL display up to 10 of the most recent applications belonging to the shelter's opportunities, ordered by submission date descending. IF fewer than 10 applications exist, THE Shelter_Dashboard SHALL display only the available applications.
2. THE Shelter_Dashboard SHALL display each recent application with the volunteer name, opportunity name, and a human-readable relative time since submission using the thresholds: less than 1 hour displays "Just now", 1–23 hours displays "X hours ago", 1 day displays "Yesterday", 2–6 days displays "X days ago", 7–29 days displays "Last week", and 30+ days displays "Last month".
3. THE Shelter_Dashboard SHALL include applications in all statuses (pending, approved, and rejected) in the recent applications list.
4. IF no applications exist for the shelter's opportunities, THEN THE Shelter_Dashboard SHALL display an empty state message indicating no recent applications.

### Requirement 3: Shelter Opportunity Management Screen

**User Story:** As a shelter administrator, I want a dedicated screen to manage my volunteer opportunities as cards, so that I can create, view, edit, and remove opportunities and see who is enrolled.

#### Acceptance Criteria

1. WHEN a shelter user navigates to the opportunity management screen, THE Shelter_Dashboard SHALL display all opportunities belonging to that shelter as Opportunity_Cards, ordered by date descending (nearest future date first). IF the shelter has no opportunities, THE Shelter_Dashboard SHALL display an empty state message indicating no opportunities exist.
2. THE Shelter_Dashboard SHALL display each Opportunity_Card with the opportunity name, date, location, category, and Opportunity_Status.
3. THE Shelter_Dashboard SHALL derive the Opportunity_Status as "open" when the opportunity is active, has available spaces greater than zero, and the date is in the future.
4. THE Shelter_Dashboard SHALL derive the Opportunity_Status as "closed" when the opportunity is_active field is false.
5. THE Shelter_Dashboard SHALL derive the Opportunity_Status as "past date" when the opportunity date is earlier than the current date.
6. THE Shelter_Dashboard SHALL derive the Opportunity_Status as "full capacity" when the opportunity available_spaces equals zero and the opportunity is active with a future date.
7. WHEN a shelter user expands or selects an Opportunity_Card, THE Shelter_Dashboard SHALL display the list of Enrolled_Volunteers (approved applicants) with their names. IF no volunteers are enrolled, THE Shelter_Dashboard SHALL display a message indicating no volunteers are currently enrolled.
8. WHEN a shelter user initiates creation of a new opportunity, THE Shelter_Dashboard SHALL provide a form to input name (maximum 100 characters), category, location (maximum 200 characters), date (must be today or a future date), duration, total spaces (integer between 1 and 10000), and an optional image URL.
9. WHEN a shelter user submits the new opportunity form with all required fields (name, category, location, date, duration, total spaces) populated and passing their constraints, THE Shelter_Dashboard SHALL create the opportunity via the backend API and display the new Opportunity_Card. IF any required field is empty or fails its constraint, THEN THE Shelter_Dashboard SHALL display inline validation errors identifying each invalid field and SHALL NOT submit the form.
10. WHEN a shelter user initiates editing of an existing opportunity, THE Shelter_Dashboard SHALL pre-populate the edit form with current opportunity data.
11. WHEN a shelter user submits the edited opportunity form with all fields passing their constraints, THE Shelter_Dashboard SHALL update the opportunity via the backend API and reflect changes on the Opportunity_Card. IF any field fails its constraint, THEN THE Shelter_Dashboard SHALL display inline validation errors and SHALL NOT submit the form.
12. WHEN a shelter user initiates deletion of an opportunity, THE Shelter_Dashboard SHALL display a confirmation prompt before proceeding. WHEN the shelter user confirms deletion, THE Shelter_Dashboard SHALL soft-delete the opportunity via the backend API and remove the Opportunity_Card from the active list. IF the shelter user cancels the confirmation, THEN THE Shelter_Dashboard SHALL take no action and return focus to the Opportunity_Card.
13. IF the backend API returns an error during any CRUD operation, THEN THE Shelter_Dashboard SHALL display an error message indicating the nature of the failure (creation failed, update failed, or deletion failed) and SHALL preserve any user-entered form data so the user can retry without re-entering information.

### Requirement 4: Volunteer Dashboard Metrics Display

**User Story:** As a volunteer, I want to see key metrics on my dashboard, so that I can track my volunteering progress at a glance.

#### Acceptance Criteria

1. WHEN a volunteer user navigates to the Volunteer_Dashboard, THE Volunteer_Dashboard SHALL display the total volunteer hours accumulated by that volunteer as a non-negative integer derived from the sum of hours in activity_logs.
2. WHEN a volunteer user navigates to the Volunteer_Dashboard, THE Volunteer_Dashboard SHALL display the number of distinct shelters the volunteer has assisted (shelters where the volunteer has completed logged activities) as a non-negative integer.
3. WHEN a volunteer user navigates to the Volunteer_Dashboard, THE Volunteer_Dashboard SHALL display the volunteer name and role.
4. WHEN a volunteer user navigates to the Volunteer_Dashboard, THE Volunteer_Dashboard SHALL display the date since the volunteer joined formatted as "MMM YYYY" (e.g., "Oct 2023").
5. IF the volunteer has no logged activities, THEN THE Volunteer_Dashboard SHALL display `0` for total hours and `0` for shelters assisted.
6. IF the request to retrieve dashboard metrics fails, THEN THE Volunteer_Dashboard SHALL display an error message indicating that metrics could not be loaded.

### Requirement 5: Volunteer Dashboard Recent Applications

**User Story:** As a volunteer, I want to see my recent applications on my dashboard, so that I can track the status of my volunteering requests.

#### Acceptance Criteria

1. WHEN a volunteer user navigates to the Volunteer_Dashboard, THE Volunteer_Dashboard SHALL display at most 5 of the volunteer's most recent applications ordered by submission date descending.
2. THE Volunteer_Dashboard SHALL display each application with the opportunity name, shelter name, location, opportunity date, and application status where status is one of "pending", "approved", or "rejected".
3. IF no applications exist for the volunteer, THEN THE Volunteer_Dashboard SHALL display an empty state message indicating no applications have been submitted.
4. IF the applications data fails to load, THEN THE Volunteer_Dashboard SHALL display an error message indicating that applications could not be retrieved.

### Requirement 6: Volunteer Dashboard Recent Badges

**User Story:** As a volunteer, I want to see my recently earned badges on my dashboard, so that I can celebrate my achievements.

#### Acceptance Criteria

1. WHEN a volunteer user navigates to the Volunteer_Dashboard, THE Volunteer_Dashboard SHALL display the volunteer's 5 most recently earned badges ordered by earned date descending, each with the fields: name, description, and image URL. IF the volunteer has fewer than 5 badges, THE Volunteer_Dashboard SHALL display only the available badges.
2. THE Volunteer_Dashboard SHALL display each badge with its name and icon or image.
3. IF the volunteer has no badges, THEN THE Volunteer_Dashboard SHALL display an empty state message indicating no badges earned yet.
4. IF the badges data fails to load, THEN THE Volunteer_Dashboard SHALL display an error message indicating that badges could not be retrieved.

### Requirement 7: Volunteer Participation History Screen

**User Story:** As a volunteer, I want a dedicated screen showing my full participation history as cards, so that I can review all opportunities I have been involved in.

#### Acceptance Criteria

1. WHEN a volunteer user navigates to the participation history screen, THE Volunteer_Dashboard SHALL display all opportunities where the volunteer has an approved application, presented as cards.
2. THE Volunteer_Dashboard SHALL display each history card with the opportunity name, shelter name, location, date, hours contributed (as an integer), and category.
3. THE Volunteer_Dashboard SHALL order history cards by opportunity date descending (most recent first).
4. IF the volunteer has no participation history, THEN THE Volunteer_Dashboard SHALL display an empty state message indicating no past participations.
5. IF the participation history data fails to load, THEN THE Volunteer_Dashboard SHALL display an error message indicating that history could not be retrieved.
