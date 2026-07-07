import { useState, useCallback } from 'react';

/**
 * Custom hook for managing async form submission lifecycle.
 * Handles loading state, error capture, and error clearing.
 *
 * @param {Function} submitFn - Async function that performs the submission. Receives form data as argument.
 * @returns {{ submit: Function, isSubmitting: boolean, submitError: string|null, clearSubmitError: Function }}
 */
export function useFormSubmit(submitFn) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const clearSubmitError = useCallback(() => {
    setSubmitError(null);
  }, []);

  const submit = useCallback(
    async (data) => {
      setIsSubmitting(true);
      setSubmitError(null);

      try {
        const result = await submitFn(data);
        setIsSubmitting(false);
        return result;
      } catch (error) {
        setIsSubmitting(false);

        // Extract error message: Axios errors have response.data.message
        const message =
          error.response?.data?.message || error.message || 'Error desconocido';

        setSubmitError(message);
        throw error;
      }
    },
    [submitFn]
  );

  return { submit, isSubmitting, submitError, clearSubmitError };
}
