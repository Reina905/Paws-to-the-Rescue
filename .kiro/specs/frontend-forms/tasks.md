# Implementation Plan: Frontend Forms

## Overview

This plan implements three form systems for Paws to the Rescue: a role-aware registration form (refactoring the existing SignUpForm), a Create Opportunity form for shelters, and an Apply button for volunteers. The implementation follows a bottom-up approach — shared utilities and components first, then feature-specific forms, then wiring and integration.

## Tasks

- [x] 1. Create shared validation utilities and form hooks
  - [x] 1.1 Create `Frontend/src/utils/formValidation.js` with pure validation functions
    - Implement `validateRequired(value, fieldName)` — returns error string or null
    - Implement `validateEmail(value)` — regex-based email pattern check
    - Implement `validateMinLength(value, min, fieldName)` — minimum character check
    - Implement `validateMaxLength(value, max, fieldName)` — maximum character check
    - Implement `validateIntRange(value, min, max, fieldName)` — integer range check
    - Implement `validateUrl(value)` — URL format check (optional fields: null/empty passes)
    - Implement `validateFutureDate(value)` — date must be today or later (day comparison)
    - Implement `runValidators(value, validators)` — runs array of validators, returns first error
    - Implement `validateForm(values, schema)` — validates entire form object, returns `{ isValid, errors }`
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 4.1, 4.2, 4.3, 4.6, 4.7_

  - [ ]* 1.2 Write property tests for validation utilities (Property 3: Registration field validators)
    - **Property 3: Registration field validators reject invalid input**
    - **Validates: Requirements 2.2, 2.3, 2.4**
    - Install `fast-check` and `vitest` as dev dependencies
    - Create `Frontend/src/utils/formValidation.test.js`
    - Generate arbitrary invalid emails → assert `validateEmail` returns error
    - Generate strings with length < 6 → assert `validateMinLength(value, 6)` returns error
    - Generate non-numeric / out-of-range values → assert `validateIntRange(value, 1, 10000)` returns error

  - [ ]* 1.3 Write property tests for opportunity validators (Property 4: Opportunity field validators)
    - **Property 4: Opportunity form field validators reject invalid input**
    - **Validates: Requirements 4.2, 4.3, 4.7**
    - Generate values < 1 or > 10000 → assert `validateIntRange` returns error
    - Generate past date strings → assert `validateFutureDate` returns error
    - Generate non-URL strings → assert `validateUrl` returns error

  - [x] 1.4 Create `Frontend/src/hooks/useFormState.js` custom hook
    - Accept `initialValues` object and optional `validationSchema`
    - Return `{ values, errors, setField, setError, clearErrors, resetFields, validate }`
    - `setField(name, value)` updates value and clears that field's error if value now passes validation
    - `validate()` runs `validateForm` against schema, sets errors, returns boolean
    - _Requirements: 2.7, 6.4_

  - [x] 1.5 Create `Frontend/src/hooks/useFormSubmit.js` custom hook
    - Accept async `submitFn` function
    - Return `{ submit, isSubmitting, submitError, clearSubmitError }`
    - `submit(data)` calls submitFn, manages loading state, catches errors
    - _Requirements: 2.6, 3.7_

  - [ ]* 1.6 Write property test for error clearing behavior (Property 5)
    - **Property 5: Correcting a field value clears its validation error**
    - **Validates: Requirements 2.7, 6.4**
    - Generate field with invalid value → call `setField` with valid value → assert error clears

- [x] 2. Create shared FormField and FormError components
  - [x] 2.1 Create `Frontend/src/components/FormField.jsx`
    - Render `<label htmlFor={id}>` with label text and required indicator
    - Render `<input>` with proper `id`, `type`, `value`, `onChange`, `aria-required`, `aria-invalid`, `aria-describedby`
    - Render error message in `<span id={id + '-error'}>` when error is present
    - Support optional `icon` prop (lucide-react) rendered inside input wrapper
    - Match existing project styling (rounded-full borders, Tailwind classes)
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6_

  - [x] 2.2 Create `Frontend/src/components/FormError.jsx`
    - Render top-level error banner for API/auth errors
    - Include `role="alert"` for screen reader announcement
    - Support optional retry button via `onRetry` prop
    - _Requirements: 1.7, 1.8, 2.5_

  - [ ]* 2.3 Write property test for ARIA label associations (Property 6)
    - **Property 6: Form fields have proper ARIA label associations**
    - **Validates: Requirements 6.1, 6.2, 6.6**
    - Generate arbitrary FormField props → render → assert label `htmlFor` matches input `id`
    - Assert `aria-required="true"` when required=true
    - Assert `aria-describedby` references error element when error is present

- [x] 3. Checkpoint - Ensure shared utilities and components work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Implement role-aware registration form
  - [x] 4.1 Create `Frontend/src/features/auth/RoleSelector.jsx`
    - Render two toggle buttons: "Voluntario" and "Refugio"
    - Accept `selectedRole` and `onChange` props
    - Highlight selected role with distinct styling
    - No role preselected by default
    - _Requirements: 1.1_

  - [x] 4.2 Create `Frontend/src/features/auth/VolunteerFields.jsx`
    - Render FormField components for: name, lastName, description, skills, contactNumber
    - Accept `values`, `errors`, and `onFieldChange` props
    - Mark name and lastName as required
    - _Requirements: 1.2_

  - [x] 4.3 Create `Frontend/src/features/auth/ShelterFields.jsx`
    - Render FormField components for: shelterName, location, description, contactNumber, animalCapacity, logo
    - Accept `values`, `errors`, and `onFieldChange` props
    - Mark shelterName and location as required
    - _Requirements: 1.3_

  - [x] 4.4 Refactor `Frontend/src/features/auth/SignUpForm.jsx` to support role-based registration
    - Replace existing simple form with RoleSelector + shared email/password fields + conditional VolunteerFields/ShelterFields
    - Use `useFormState` hook with role-dependent validation schema
    - On role switch: clear role-specific fields (keep email/password)
    - On submit: validate → call Supabase signUp with role metadata → call POST /volunteers or POST /shelters via api.ts → navigate on success
    - Handle auth errors (top-level FormError), profile creation errors (FormError with retry)
    - Disable submit button while loading, show "Creando cuenta..."
    - Move focus to first invalid field on validation failure
    - Include ARIA live region for success announcement
    - _Requirements: 1.1, 1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 2.5, 2.6, 6.5, 6.7_

  - [ ]* 4.5 Write property test for role switching (Property 1)
    - **Property 1: Role switching clears role-specific field values**
    - **Validates: Requirements 1.4**
    - Generate random non-empty values for volunteer fields → switch to shelter → assert all volunteer fields cleared
    - Generate random non-empty values for shelter fields → switch to volunteer → assert all shelter fields cleared

  - [ ]* 4.6 Write property test for required field validation (Property 2)
    - **Property 2: Required field validation rejects empty submissions**
    - **Validates: Requirements 2.1, 3.3, 4.1**
    - Generate random subsets of empty required fields → validate → assert error count matches empty required field count

- [x] 5. Checkpoint - Ensure registration form works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Implement Create Opportunity form
  - [x] 6.1 Create `Frontend/src/features/shelterDashboard/CreateOpportunityForm.jsx`
    - On mount: fetch categories via GET /opportunities/categories (use api.ts)
    - Render FormField components for: name, category (select), location, date, duration, totalSpaces, image
    - Use `useFormState` with opportunity validation schema
    - Use `useFormSubmit` for POST /opportunities submission
    - Handle category fetch failure: disable category select + show error + block submit
    - On 201 success: show success message via ARIA live region, redirect to shelter dashboard
    - On error (400/401/500): show FormError with descriptive message, preserve form data
    - 30-second timeout on submission
    - Move focus to first invalid field on validation failure
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 6.5, 6.7_

  - [x] 6.2 Create `Frontend/src/pages/CreateOpportunity.jsx` page wrapper
    - Wrap CreateOpportunityForm with page layout
    - Add route protection (shelter role only via ProtectedRoute)
    - _Requirements: 3.1_

- [x] 7. Implement Apply to Opportunity button
  - [x] 7.1 Create `Frontend/src/features/volunteering/ApplyButton.jsx`
    - Accept props: `opportunityId`, `status`, `availableSpaces`, `onApplySuccess`
    - Render enabled button when status="open" and availableSpaces > 0 and user is volunteer
    - Render disabled button with login link when user is not authenticated
    - On click: POST /opportunities/:id/apply via api.ts
    - Handle 201: show confirmation, disable button, call `onApplySuccess`
    - Handle 409: show "ya tienes una aplicación activa" message
    - Handle 404/network error: show error message
    - Show loading state while request in flight
    - Include ARIA live region for status announcements
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 6.7_

  - [ ]* 7.2 Write unit tests for ApplyButton
    - Test enabled state for volunteer with open opportunity
    - Test disabled state for unauthenticated user
    - Test 201 response disables button and updates counter
    - Test 409 response shows duplicate message
    - Test loading state disables button
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.6, 5.7_

- [x] 8. Wire components into routing and navigation
  - [x] 8.1 Add CreateOpportunity route and navigation link
    - Add route `/create-opportunity` in App.jsx (protected, shelter role)
    - Add "Crear Oportunidad" link in `ShelterDashboardQuickActions.jsx`
    - _Requirements: 3.1_

  - [x] 8.2 Integrate ApplyButton into VolunteeringDetailCard
    - Import and render ApplyButton in `Frontend/src/features/volunteering/VolunteeringDetailCard.jsx`
    - Pass opportunityId, status, availableSpaces, and refresh callback
    - _Requirements: 5.1_

- [x] 9. Focus management and final accessibility pass
  - [x] 9.1 Implement focus-to-first-error logic in form submissions
    - In SignUpForm and CreateOpportunityForm: after validation, query first `[aria-invalid="true"]` element and call `.focus()`
    - Ensure tab order follows visual order in all forms
    - _Requirements: 6.3, 6.5_

  - [ ]* 9.2 Write property test for focus on first invalid field (Property 7)
    - **Property 7: Focus moves to first invalid field on form submission**
    - **Validates: Requirements 6.5**
    - Generate random error sets → submit form → assert focused element matches first error in DOM order

- [x] 10. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Testing uses `vitest` (Vite-native) + `fast-check` for property-based tests
- The existing `SignUpForm.jsx` will be refactored in-place (not deleted and recreated)
- All API calls use the existing `api.ts` Axios interceptor for JWT auth
- Supabase auth calls use the existing `supabaseAuth.js` client

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "1.5"] },
    { "id": 2, "tasks": ["1.6", "2.1", "2.2"] },
    { "id": 3, "tasks": ["2.3", "4.1", "4.2", "4.3"] },
    { "id": 4, "tasks": ["4.4", "6.1"] },
    { "id": 5, "tasks": ["4.5", "4.6", "6.2", "7.1"] },
    { "id": 6, "tasks": ["7.2", "8.1", "8.2"] },
    { "id": 7, "tasks": ["9.1"] },
    { "id": 8, "tasks": ["9.2"] }
  ]
}
```
