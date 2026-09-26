import { useState, useEffect } from 'react';
import { mockApiService } from '../services/mockApi';

export function useDisasterData() {
  const [data, setData] = useState({
    landslides: [],
    cloudbursts: [],
    glof: [],
    crowds: [],
    fakeNews: [],
    shelters: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const [landslides, cloudbursts, glof, crowds, fakeNews, shelters] = await Promise.all([
          mockApiService.getLandslideZones(),
          mockApiService.getCloudburstTelemetry(),
          mockApiService.getGlofSurveillance(),
          mockApiService.getCrowdDensityMetrics(),
          mockApiService.getFakeNewsFeed(),
          mockApiService.getSafeShelters(),
        ]);
        setData({
          landslides,
          cloudbursts,
          glof,
          crowds,
          fakeNews,
          shelters,
        });
      } catch (err) {
        setError('Failed to load multi-hazard datasets.');
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  return { data, loading, error };
}
