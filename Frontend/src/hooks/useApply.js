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
        setError('Ya tienes una aplicación activa para esta oportunidad.');
      } else if (status === 404) {
        setError('La oportunidad no existe.');
      } else if (status === 401) {
        setError('AUTH_REQUIRED');
      } else {
        setError(err.response?.data?.message || 'Error al aplicar.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { apply, loading, error, success };
}
