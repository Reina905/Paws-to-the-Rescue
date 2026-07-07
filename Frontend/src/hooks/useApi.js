import { useState, useEffect, useCallback, useRef } from 'react';

export function useApi(serviceFn, ...args) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const argsRef = useRef(args);
  argsRef.current = args;

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceFn(...argsRef.current);
      setData(result);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error desconocido');
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [serviceFn, JSON.stringify(args)]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
