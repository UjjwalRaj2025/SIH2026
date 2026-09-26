import { useState, useEffect, useCallback } from 'react';
import { mockApiService } from '../services/mockApi';

export function useAlerts(initialFilter = 'all') {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState(initialFilter);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await mockApiService.getAlerts(filter);
      setAlerts(data);
    } catch (err) {
      setError('Failed to fetch emergency alert broadcast stream.');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const broadcastAlert = async (alertPayload) => {
    try {
      const created = await mockApiService.broadcastAlert(alertPayload);
      setAlerts((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      throw new Error('Broadcast transmission failed.');
    }
  };

  return {
    alerts,
    loading,
    error,
    filter,
    setFilter,
    refetch: fetchAlerts,
    broadcastAlert,
  };
}
