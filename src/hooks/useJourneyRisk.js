import { useState, useCallback } from 'react';
import { mockApiService } from '../services/mockApi';

export function useJourneyRisk() {
  const [routeResult, setRouteResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateRisk = useCallback(async (origin, destination) => {
    try {
      setLoading(true);
      setError(null);
      const result = await mockApiService.calculateJourneyRisk(origin, destination);
      setRouteResult(result);
      return result;
    } catch (err) {
      setError('Unable to compute route safety corridor. Please verify waypoints.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    routeResult,
    loading,
    error,
    calculateRisk,
    setRouteResult,
  };
}
