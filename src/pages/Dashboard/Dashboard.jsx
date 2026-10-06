import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mountain,
  CloudRain,
  Waves,
  Users,
  CheckCircle2,
  RefreshCw,
  MapPin,
  Clock,
  ShieldCheck,
  Radio,
  Layers,
  Navigation,
  Compass,
  Building2,
  AlertTriangle,
} from 'lucide-react';
import RiskSummaryCard from '../../components/dashboard/RiskSummaryCard';
import DashboardMap from '../../components/map/DashboardMap';
import RecentAlerts from '../../components/alerts/RecentAlerts';
import RiskTrendChart from '../../components/charts/RiskTrendChart';
import AlertModal from '../../components/alerts/AlertModal';
import SeverityBadge from '../../components/common/SeverityBadge';
import { mockApiService } from '../../services/mockApi';

/**
 * Dashboard - Main Unified Disaster Intelligence Screen for CrisisGuard AI
 * Route: /dashboard
 *
 * Information Hierarchy:
 * 1. Top Bar: Welcome, Location Selector, Last Updated, Refresh Button
 * 2. 5 Multi-Hazard Risk Cards: Landslide, Cloudburst, GLOF, Crowd, Fake News
 * 3. Central Command Section: Large Interactive GIS Map (Left) + Live Active Alerts (Right)
 * 4. Analytics Section: Multi-Hazard Risk Trends (Landslide, Cloudburst, Crowd)
 */
export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [mapData, setMapData] = useState({
    landslides: [],
    cloudbursts: [],
    glof: [],
    crowds: [],
    shelters: [],
  });
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Today at 15:32 IST (2 mins ago)');
  const [currentLocation, setCurrentLocation] = useState('All Uttarakhand (Char Dham Belt)');

  // Available location corridors for quick switching
  const locationOptions = [
    'All Uttarakhand (Char Dham Belt)',
    'Rudraprayag & Chamoli Corridors',
    'NH-107 Kedarnath Axis (Sonprayag - Gaurikund)',
    'NH-07 Badrinath Axis (Joshimath - Lambagar)',
    'Uttarkashi & Bhagirathi Basin',
  ];

  // Load telemetry data from mockApiService
  const loadDashboardData = async () => {
    try {
      const [alertsRes, mapRes] = await Promise.all([
        mockApiService.getAlerts(),
        mockApiService.getRiskMapData(),
      ]);
      setAlerts(alertsRes);
      setMapData(mapRes);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Handle manual refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    await loadDashboardData();
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastUpdated(`Today at ${timeStr} IST (Just now)`);
    setIsRefreshing(false);
  };

  // 5 Multi-Hazard Risk Cards Specifications
  const riskCardsData = [
    {
      title: 'Landslide Risk',
      icon: Mountain,
      status: 'Active Slope Instability',
      riskLevel: 'HIGH',
      percentage: 82,
      valueLabel: 'Saturation Probability',
      location: 'NH-07 Chamoli - Joshimath (Lambagar)',
      updatedTime: '4 mins ago',
      detailsPath: '/landslide',
      accentColor: 'red',
      trendText: 'Displacement +2.4 mm/hr',
    },
    {
      title: 'Cloudburst Risk',
      icon: CloudRain,
      status: 'Convective Radar Echoes',
      riskLevel: 'HIGH',
      percentage: 74,
      valueLabel: 'Convective Storm Index',
      location: 'Mandakini Valley, Rudraprayag',
      updatedTime: '6 mins ago',
      detailsPath: '/cloudburst',
      accentColor: 'amber',
      trendText: 'Peak rain nowcast: 72 mm/hr',
    },
    {
      title: 'GLOF Risk',
      icon: Waves,
      status: 'Moraine Breach Watch',
      riskLevel: 'MODERATE',
      percentage: 38,
      valueLabel: 'Basin Volume Expansion',
      location: 'Chorabari Lake Basin, Kedarnath',
      updatedTime: '18 mins ago',
      detailsPath: '/glof',
      accentColor: 'sky',
      trendText: 'Water volume 0.85 MCM (Stable)',
    },
    {
      title: 'Crowd Risk',
      icon: Users,
      status: 'Choke Point Congestion',
      riskLevel: 'HIGH',
      percentage: 91,
      valueLabel: 'Trek Capacity Overload',
      location: 'Gaurikund Mule Track & Kedarnath',
      updatedTime: '2 mins ago',
      detailsPath: '/crowd-risk',
      accentColor: 'purple',
      trendText: 'Queue wait: 4.5 hrs at gate',
    },
    {
      title: 'Fake News Activity',
      icon: CheckCircle2,
      status: 'Rumor Cluster Debunked',
      riskLevel: 'LOW',
      percentage: 88,
      valueLabel: 'Fact-Check Verification Rate',
      location: 'WhatsApp & Social Media Feeds',
      updatedTime: '12 mins ago',
      detailsPath: '/fake-news',
      accentColor: 'emerald',
      trendText: '14 fabricated claims blocked',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* =========================================================================
          1. TOP WELCOME SECTION & MONITORING CONTEXT BAR
         ========================================================================= */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-card p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Welcome & Overview */}
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                CrisisGuard AI Dashboard
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>STATE MONITORING ONLINE</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
              Unified disaster surveillance, automated geotechnical AI alerts & live crowd analytics for Uttarakhand.
            </p>
          </div>

          {/* Quick Route Planning / Authority Links */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/journey-risk"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition shadow-sm"
            >
              <Compass className="w-4 h-4 text-teal-300" />
              <span>Check Journey Risk</span>
            </Link>
          </div>
        </div>

        {/* Location Filter & Real-Time Sync Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          {/* Current Location Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-slate-600 font-bold">
              <MapPin className="w-4 h-4 text-red-500 shrink-0" />
              <span>Current Monitoring Zone:</span>
            </div>
            <select
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              className="font-bold text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all cursor-pointer text-xs"
            >
              {locationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Last Updated Timestamp & Refresh Button */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5 text-slate-500 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{lastUpdated}</span>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold text-xs shadow-xs transition active:scale-95 disabled:opacity-60"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-teal-600 ${isRefreshing ? 'animate-spin' : ''}`}
              />
              <span>{isRefreshing ? 'Syncing...' : 'Refresh'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE 5 UNIFIED HAZARD RISK CARDS
         ========================================================================= */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-navy-900" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Multi-Hazard Intelligence Telemetry
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Live probability matrices & active state alerts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {riskCardsData.map((card, idx) => (
            <RiskSummaryCard key={idx} {...card} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          3. LARGE INTERACTIVE RISK MAP (LEFT) & ACTIVE ALERTS (RIGHT)
         ========================================================================= */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Large Interactive Risk Map */}
        <div className="lg:col-span-8 space-y-2">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">
                Geospatial Multi-Hazard GIS Map
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span>Rockfall Alert</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Doppler Radar Swath</span>
              </span>
            </div>
          </div>

          <DashboardMap
            landslides={mapData.landslides}
            cloudbursts={mapData.cloudbursts}
            glof={mapData.glof}
            crowds={mapData.crowds}
            shelters={mapData.shelters}
            height="540px"
          />
        </div>

        {/* Right Column: Active Emergency Alerts */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-600 animate-pulse" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-800">
                Urgent Advisories
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-500">
              CAP Multi-Channel Feed
            </span>
          </div>

          <RecentAlerts
            alerts={alerts}
            maxHeight="540px"
            onSelectAlert={(alert) => setSelectedAlert(alert)}
          />
        </div>
      </section>

      {/* =========================================================================
          4. RISK TRENDS & ANALYTICAL EARLY WARNING CHARTS
         ========================================================================= */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Hazard Trends & Geotechnical Dynamics
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            24h time-series sensor curves & predictive thresholds
          </span>
        </div>

        <RiskTrendChart defaultTab="landslide" />
      </section>

      {/* Incident Detail Modal */}
      <AlertModal
        alert={selectedAlert}
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}
