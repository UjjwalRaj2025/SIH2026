import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import SeverityBadge from '../../components/common/SeverityBadge';
import Tabs from '../../components/common/Tabs';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import BroadcastAlertForm from '../../components/forms/BroadcastAlertForm';
import RiverLevelChart from '../../components/charts/RiverLevelChart';
import RainfallChart from '../../components/charts/RainfallChart';
import CrowdTrendChart from '../../components/charts/CrowdTrendChart';
import {
  Activity,
  Radio,
  BarChart3,
  Users,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from 'lucide-react';
import { mockApiService } from '../../services/mockApi';

export default function Authority() {
  const [activeTab, setActiveTab] = useState('monitoring');
  const [telemetry, setTelemetry] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [dispatchedAlerts, setDispatchedAlerts] = useState([]);
  const [broadcastSuccess, setBroadcastSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [broadcasting, setBroadcasting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [tel, ana, alerts] = await Promise.all([
          mockApiService.getAuthorityTelemetry(),
          mockApiService.getAnalyticsData(),
          mockApiService.getAlerts(),
        ]);
        setTelemetry(tel);
        setAnalytics(ana);
        setDispatchedAlerts(alerts);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleBroadcast = async (alertPayload) => {
    try {
      setBroadcasting(true);
      const created = await mockApiService.broadcastAlert(alertPayload);
      setDispatchedAlerts((prev) => [created, ...prev]);
      setBroadcastSuccess(`Alert "${created.title}" successfully dispatched across CAP gateway!`);
      setTimeout(() => setBroadcastSuccess(null), 5000);
    } finally {
      setBroadcasting(false);
    }
  };

  const authorityTabs = [
    { id: 'monitoring', label: '1. Live Monitoring', icon: Activity },
    { id: 'alerts', label: '2. Alert Dispatcher', icon: Radio },
    { id: 'analytics', label: '3. Disaster Analytics', icon: BarChart3 },
    { id: 'deployments', label: '4. SDRF Deployments', icon: Users },
  ];

  if (loading) {
    return <Loading label="Establishing encrypted link with State Emergency Operations Centre (SEOC)..." fullHeight />;
  }

  return (
    <div className="space-y-8">
      {/* Authority Control Center Header in White Card with Navy Accent */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-red-600 text-white shadow-sm">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Disaster Command & Coordination Center
              </h1>
              <SeverityBadge level="CRITICAL" label="SEOC LIVE" size="sm" pulse variant="solid" />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Uttarakhand State Disaster Management Authority (USDMA) • Joint Operations Room
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <SeverityBadge level="LOW" label="13 DEOCs CONNECTED" size="md" />
          <SeverityBadge level="LOW" label="ISRO SATELLITE SYNC" size="md" />
        </div>
      </div>

      {/* Authority Modules Tabs */}
      <Tabs tabs={authorityTabs} activeTab={activeTab} onChange={setActiveTab} size="lg" />

      {/* Module 1: MONITORING */}
      {activeTab === 'monitoring' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* River Water Discharge Gauges in Light Theme */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card
              title="Major River Basins Telemetry"
              subtitle="CWC automated river water levels vs critical danger thresholds"
              className="lg:col-span-2"
            >
              {telemetry && <RiverLevelChart gauges={telemetry.riverGauges} height={250} />}
            </Card>

            <Card
              title="River Gauging Stations"
              subtitle="Real-time telemetry and discharge velocity"
              className="flex flex-col justify-between"
            >
              <div className="space-y-3">
                {telemetry?.riverGauges.map((g, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{g.name}</span>
                      <span className="text-[11px] text-slate-500 font-medium">Trend: {g.trend}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 block">{g.currentLevelM} m</span>
                      <SeverityBadge
                        level={g.status.includes('Normal') ? 'LOW' : 'CRITICAL'}
                        label={g.status}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Radar & Sensor Network Health */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Doppler Weather Radar Array" subtitle="Atmospheric volume sweeps">
              <div className="space-y-3">
                {telemetry?.radarStations.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{r.station}</span>
                        <span className="text-slate-500 font-medium">Beam Radius: {r.beamRangeKm} km</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <SeverityBadge level="LOW" label={r.status} size="sm" />
                      <span className="text-[11px] text-slate-400 block mt-1 font-mono">Uptime: {r.health}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card title="Sub-Surface Geotechnical Inclinometers" subtitle="Slope movement sensors">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs font-medium">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Active IoT Inclinometers:</span>
                  <span className="font-bold text-emerald-700 font-mono">48 / 48 Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Seismic Accelerometers:</span>
                  <span className="font-bold text-teal-700 font-mono">16 Operational</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Acoustic GLOF Sirens:</span>
                  <span className="font-bold text-amber-700 font-mono">12 Standby Ready</span>
                </div>
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  Data frequency: 1 ping every 30 seconds via satellite LoRaWAN.
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Module 2: ALERTS DISPATCHER */}
      {activeTab === 'alerts' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {broadcastSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex items-center gap-3 text-sm shadow-sm font-semibold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{broadcastSuccess}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BroadcastAlertForm onBroadcast={handleBroadcast} loading={broadcasting} />
            </div>

            <Card title="Emergency Sirens & CAP Status" subtitle="Direct broadcast linkages">
              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Common Alerting Protocol (CAP)</span>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Broadcasting triggers push notifications to NDMA citizen app, SMS cell broadcast tower bursts, and FM radio overrides.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-1">
                  <span className="font-bold text-red-900 block">Automated Sirens on Riverbanks</span>
                  <p className="text-red-950 text-[11px] leading-relaxed font-medium">
                    12 high-output sirens located in Mandakini valley can be triggered remotely with 10-second confirmation latency.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Dispatched Broadcasts Log */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-base">Recent Dispatched Alerts Log</h3>
            <div className="space-y-2">
              {dispatchedAlerts.slice(0, 5).map((a) => {
                const level = a.severity === 'critical' ? 'CRITICAL' : a.severity === 'warning' ? 'HIGH' : 'MODERATE';
                return (
                  <div
                    key={a.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-card flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <SeverityBadge level={level} size="sm" pulse={level === 'CRITICAL'} />
                      <div>
                        <span className="font-bold text-slate-900 block text-sm">{a.title}</span>
                        <span className="text-slate-500 font-medium">{a.location} • {a.timestamp}</span>
                      </div>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px] font-bold">{a.id}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Module 3: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              title="24-Hour Rainfall Precipitation Model"
              subtitle="Observed vs Nowcasted convective activity"
            >
              {analytics && <RainfallChart data={analytics.rainfallTrends} height={250} />}
            </Card>

            <Card
              title="Shrine Carrying Capacity vs Influx"
              subtitle="Pilgrim congestion and risk of crowd stampede"
            >
              {analytics && <CrowdTrendChart data={analytics.crowdCapacityTrends} height={250} />}
            </Card>
          </div>

          {/* Hazard Incidents Distribution in Crisp White Cards */}
          <Card title="Current Hazard Incidents Breakdown" subtitle="Distribution of active threats">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
              {analytics?.incidentDistribution.map((item) => (
                <div
                  key={item.name}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center shadow-subtle"
                >
                  <span className="text-2xl font-black text-slate-900 block">{item.count}</span>
                  <span className="text-xs font-bold mt-1 block" style={{ color: item.fill }}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Module 4: SDRF / NDRF DEPLOYMENTS */}
      {activeTab === 'deployments' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <Card
            title="SDRF & NDRF Rapid Response Battalions"
            subtitle="Personnel deployment across active mountain incident zones"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {telemetry?.sdrfDeployments.map((team) => (
                <div
                  key={team.teamId}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-black text-sm text-slate-900 block">{team.teamId}</span>
                      <span className="text-slate-500 font-bold">{team.station}</span>
                    </div>
                    <SeverityBadge level="LOW" label="ACTIVE FIELD" size="sm" />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <span className="text-slate-600 font-medium">Deployed Personnel:</span>
                    <span className="font-bold text-slate-900 text-sm">{team.personnel} Rescuers</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Mission Operational Status:</span>
                    <span className="font-bold text-teal-800">{team.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
