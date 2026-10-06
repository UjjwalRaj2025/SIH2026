// CrisisGuard AI - API Service Layer
// Cleanly encapsulates frontend access to mock datasets; ready for future FastAPI endpoint bindings.

import {
  MOCK_ALERTS,
  MOCK_LANDSLIDE_ZONES,
  MOCK_CLOUDBURST_DATA,
  MOCK_GLOF_DATA,
  MOCK_CROWD_DATA,
  MOCK_FAKE_NEWS,
  MOCK_SAFE_SHELTERS,
  MOCK_JOURNEY_ROUTES,
  MOCK_AUTHORITY_TELEMETRY,
  MOCK_ANALYTICS_DATA,
  DISTRICTS,
} from '../data/mockDisasters';
import { imdService } from './imdService';

// Small helper to simulate realistic asynchronous network response
const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApiService = {
  // --- Live Emergency Alerts ---
  async getAlerts(filterSeverity = 'all') {
    await delay();
    if (filterSeverity === 'all') return [...MOCK_ALERTS];
    return MOCK_ALERTS.filter((a) => a.severity === filterSeverity);
  },

  async broadcastAlert(newAlert) {
    await delay(300);
    const alertRecord = {
      id: `ALT-2026-${Math.floor(100 + Math.random() * 900)}`,
      timestamp: 'Just now',
      source: 'CrisisGuard Authority Portal (Admin Broadcast)',
      ...newAlert,
    };
    MOCK_ALERTS.unshift(alertRecord);
    return alertRecord;
  },

  // --- Journey Risk Intelligence ---
  async calculateJourneyRisk(origin, destination) {
    await delay(250);
    // Find matching route or fallback to smart computed route
    const found = MOCK_JOURNEY_ROUTES.find(
      (r) =>
        r.origin.toLowerCase().includes(origin.toLowerCase()) ||
        r.destination.toLowerCase().includes(destination.toLowerCase())
    );
    if (found) return found;

    // Generated default route response
    return {
      id: `route-custom-${Date.now()}`,
      origin: origin || 'Rishikesh',
      destination: destination || 'Kedarnath Dham',
      distanceKm: 215,
      estimatedDriveHours: '7h 30m',
      overallRisk: 'Moderate Risk',
      riskScore: 54,
      status: 'Advisory in Effect',
      hazardsAlongRoute: {
        landslideCount: 1,
        cloudburstWarnings: 1,
        glofWatchCount: 0,
        crowdBottlenecks: 1,
        debunkedRumors: 1,
      },
      waypoints: [
        { name: origin || 'Rishikesh', status: 'Clear', condition: 'Smooth highway', km: 0 },
        { name: 'Srinagar Transit Point', status: 'Safe', condition: 'Clear weather', km: 105 },
        { name: 'Hazard Monitoring Sector', status: 'Watch', condition: 'Moderate rain, slow speeds', km: 160 },
        { name: destination || 'Destination', status: 'Advisory', condition: 'Check live local holding camps', km: 215 },
      ],
      safeSheltersNearby: ['Sonprayag Relief Camp', 'Govindghat Shelter'],
    };
  },

  async getAllRoutes() {
    await delay();
    return [...MOCK_JOURNEY_ROUTES];
  },

  // --- 5 Core Hazard Engines ---
  async getLandslideZones() {
    await delay();
    return [...MOCK_LANDSLIDE_ZONES];
  },

  async getCloudburstTelemetry() {
    await delay();
    return [...MOCK_CLOUDBURST_DATA];
  },

  async getGlofSurveillance() {
    await delay();
    return [...MOCK_GLOF_DATA];
  },

  async getCrowdDensityMetrics() {
    await delay();
    return [...MOCK_CROWD_DATA];
  },

  async getFakeNewsFeed() {
    await delay();
    return [...MOCK_FAKE_NEWS];
  },

  async verifyClaim(claimText) {
    await delay(400);
    // Simulated AI NLP Claim Verification Engine
    const isSuspicious = claimText.toLowerCase().includes('collapsed') ||
      claimText.toLowerCase().includes('drowned') ||
      claimText.toLowerCase().includes('submerged') ||
      claimText.toLowerCase().includes('burst');

    return {
      id: `FN-AI-${Date.now()}`,
      claim: claimText,
      verdict: isSuspicious ? 'UNVERIFIED / HIGH SENSATIONALISM' : 'LIKELY BENIGN / OFFICIAL ADVISORY',
      credibilityScore: isSuspicious ? 18 : 84,
      analysis: isSuspicious
        ? 'Cross-check against SDRF field logs and district sensor telemetries indicates no corroboration for this claim. High likelihood of recycled crisis media.'
        : 'Aligns with known state meteorological bulletins and official Char Dham regulatory alerts.',
      officialSources: ['USDMA Control Room', 'IMD Doppler Radar Network', 'SDRF Quick Response Log'],
      timestamp: 'Verified moments ago by CrisisGuard AI Engine',
    };
  },

  // --- Geospatial Map Data ---
  async getRiskMapData() {
    await delay();
    const imdData = await imdService.getCombinedIMDTelemetry();
    return {
      landslides: MOCK_LANDSLIDE_ZONES,
      cloudbursts: MOCK_CLOUDBURST_DATA,
      glof: MOCK_GLOF_DATA,
      crowds: MOCK_CROWD_DATA,
      shelters: MOCK_SAFE_SHELTERS,
      alerts: MOCK_ALERTS,
      imd: imdData,
    };
  },

  async getSafeShelters() {
    await delay();
    return [...MOCK_SAFE_SHELTERS];
  },

  // --- Authority Command Center ---
  async getAuthorityTelemetry() {
    await delay();
    return { ...MOCK_AUTHORITY_TELEMETRY };
  },

  async getAnalyticsData() {
    await delay();
    return { ...MOCK_ANALYTICS_DATA };
  },

  async getDistricts() {
    return [...DISTRICTS];
  },
};

export { imdService };
