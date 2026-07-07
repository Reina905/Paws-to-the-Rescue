import { useState, useCallback } from 'react';
import { applyToOpportunity } from '../services/opportunitiesService';

export function useApply() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const apply = useCallback(async (opportunityId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await applyToOpportunity(opportunityId);
      setSuccess(true);
    } catch (err) {
      const status = err.response?.status;
      if (status === 409) {
        setError('You already have an active application for this opportunity.');
      } else if (status === 404) {
        setError('Opportunity not found.');
      } else if (status === 401) {
        setError('AUTH_REQUIRED');
      } else {
        setError(err.response?.data?.message || 'Failed to apply.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { apply, loading, error, success };
}
