/**
 * Pure validation functions for form fields.
 * Each returns null for valid input, or an error message string for invalid input.
 */

/**
 * Validates that a value is not empty (after trimming whitespace).
 * @param {string} value - The value to validate
 * @param {string} fieldName - Human-readable field name for the error message
 * @returns {string|null} Error message or null if valid
 */
export function validateRequired(value, fieldName) {
  if (value === null || value === undefined || String(value).trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
}

/**
 * Validates that a value matches a standard email pattern.
 * @param {string} value - The email string to validate
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(value) {
  if (!value || String(value).trim() === '') {
    return null; // Empty check is handled by validateRequired
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(String(value).trim())) {
    return 'Invalid email format';
  }
  return null;
}

/**
 * Validates that a value meets a minimum character length.
 * @param {string} value - The value to validate
 * @param {number} min - Minimum number of characters required
 * @param {string} fieldName - Human-readable field name for the error message
 * @returns {string|null} Error message or null if valid
 */
export function validateMinLength(value, min, fieldName) {
  if (!value || String(value).trim() === '') {
    return null; // Empty check is handled by validateRequired
  }
  if (String(value).length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  return null;
}

/**
 * Validates that a value does not exceed a maximum character length.
 * @param {string} value - The value to validate
 * @param {number} max - Maximum number of characters allowed
 * @param {string} fieldName - Human-readable field name for the error message
 * @returns {string|null} Error message or null if valid
 */
export function validateMaxLength(value, max, fieldName) {
  if (!value || String(value).trim() === '') {
    return null; // Empty values pass (handled by validateRequired if needed)
  }
  if (String(value).length > max) {
    return `${fieldName} must not exceed ${max} characters`;
  }
  return null;
}

/**
 * Validates that a value is an integer within a specified range.
 * Optional field: null/empty values pass (return null).
 * @param {string|number} value - The value to validate
 * @param {number} min - Minimum allowed value (inclusive)
 * @param {number} max - Maximum allowed value (inclusive)
 * @param {string} fieldName - Human-readable field name for the error message
 * @returns {string|null} Error message or null if valid
 */
export function validateIntRange(value, min, max, fieldName) {
  if (value === null || value === undefined || String(value).trim() === '') {
    return null; // Optional field: empty passes
  }
  const num = Number(value);
  if (!Number.isInteger(num) || num < min || num > max) {
    return `${fieldName} must be a whole number between ${min} and ${max}`;
  }
  return null;
}

/**
 * Validates that a value is a valid URL format.
 * Optional field: null/empty values pass (return null).
 * @param {string} value - The URL string to validate
 * @returns {string|null} Error message or null if valid
 */
export function validateUrl(value) {
  if (value === null || value === undefined || String(value).trim() === '') {
    return null; // Optional field: empty passes
  }
  try {
    const url = new URL(String(value).trim());
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return 'Value must be a valid URL';
    }
    return null;
  } catch {
    return 'Value must be a valid URL';
  }
}

/**
 * Validates that a date value is today or in the future (day comparison only).
 * @param {string} value - The date string to validate (ISO format YYYY-MM-DD)
 * @returns {string|null} Error message or null if valid
 */
export function validateFutureDate(value) {
  if (!value || String(value).trim() === '') {
    return null; // Empty check is handled by validateRequired
  }
  const inputDate = new Date(String(value).trim());
  if (isNaN(inputDate.getTime())) {
    return 'Invalid date';
  }
  // Compare by day only (strip time component)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    return 'Date must be today or in the future';
  }
  return null;
}

/**
 * Runs a list of validator functions on a value, returning the first error or null.
 * Each validator in the array should be a function that takes a value and returns
 * an error string or null.
 * @param {*} value - The value to validate
 * @param {Array<Function>} validators - Array of validator functions
 * @returns {string|null} First error message encountered, or null if all pass
 */
export function runValidators(value, validators) {
  for (const validator of validators) {
    const error = validator(value);
    if (error) {
      return error;
    }
  }
  return null;
}

/**
 * Validates an entire form object against a schema of validators.
 * The schema maps field names to arrays of validator functions.
 * @param {Object} values - Form values object (key: field name, value: field value)
 * @param {Object} schema - Validation schema (key: field name, value: array of validator functions)
 * @returns {{ isValid: boolean, errors: Object.<string, string|null> }}
 */
export function validateForm(values, schema) {
  const errors = {};
  let isValid = true;

  for (const [field, validators] of Object.entries(schema)) {
    const value = values[field];
    const error = runValidators(value, validators);
    errors[field] = error;
    if (error) {
      isValid = false;
    }
  }

  return { isValid, errors };
}
