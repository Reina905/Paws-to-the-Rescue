import { useState, useCallback } from 'react';
import { validateForm, runValidators } from '../utils/formValidation';

/**
 * Custom hook for managing form state with optional validation.
 *
 * @param {Object} initialValues - Initial form field values (key: field name, value: initial value)
 * @param {Object} [validationSchema] - Optional validation schema (key: field name, value: array of validator functions)
 * @returns {{ values: Object, errors: Object, setField: Function, setError: Function, clearErrors: Function, resetFields: Function, validate: Function }}
 */
export function useFormState(initialValues, validationSchema) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  /**
   * Updates a single field's value. If the field currently has an error and the
   * new value passes validation for that field, the error is cleared immediately.
   * (Requirement 2.7 — correcting a field clears its error)
   */
  const setField = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      if (!prevErrors[name]) {
        return prevErrors;
      }

      // If there's a current error for this field and we have a schema,
      // check if the new value passes validation
      if (validationSchema && validationSchema[name]) {
        const fieldError = runValidators(value, validationSchema[name]);
        if (!fieldError) {
          // Value is now valid — clear the error
          const { [name]: _, ...rest } = prevErrors;
          return rest;
        }
      }

      return prevErrors;
    });
  }, [validationSchema]);

  /**
   * Manually sets an error for a specific field.
   */
  const setError = useCallback((name, message) => {
    setErrors((prev) => ({ ...prev, [name]: message }));
  }, []);

  /**
   * Clears all errors.
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Resets all field values back to initialValues and clears errors.
   */
  const resetFields = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  /**
   * Runs validateForm against the validation schema.
   * Sets errors state and returns true if valid, false otherwise.
   */
  const validate = useCallback(() => {
    if (!validationSchema) {
      return true;
    }

    const { isValid, errors: formErrors } = validateForm(values, validationSchema);

    // Only set fields that have actual errors (filter out nulls)
    const activeErrors = {};
    for (const [field, error] of Object.entries(formErrors)) {
      if (error) {
        activeErrors[field] = error;
      }
    }

    setErrors(activeErrors);
    return isValid;
  }, [values, validationSchema]);

  return { values, errors, setField, setError, clearErrors, resetFields, validate };
}
