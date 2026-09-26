import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from 'recharts';
import {
  Mountain,
  CloudRain,
  Users,
  Activity,
  AlertTriangle,
  TrendingUp,
  Clock,
  ShieldAlert,
  Compass,
} from 'lucide-react';
import SeverityBadge from '../common/SeverityBadge';

/**
 * RiskTrendChart - Multi-Hazard Predictive Trend Analysis for CrisisGuard AI
 * Provides deep time-series insights for:
 * 1. Landslide: Slope displacement (mm) & Soil saturation (%)
 * 2. Cloudburst: Doppler radar rainfall intensity (mm/hr) vs 60mm/hr danger threshold
 * 3. Crowd: Pilgrim volume vs carrying capacity across the Char Dham shrines
 */
export default function RiskTrendChart({
  defaultTab = 'landslide', // 'landslide' | 'cloudburst' | 'crowd'
}) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [timeRange, setTimeRange] = useState('24h');

  // --- 1. Landslide Mock Trend Data (24h) ---
  const landslideTrendData = [
    { time: '00:00', saturation: 42, displacementMm: 2.1, threshold: 80 },
    { time: '04:00', saturation: 56, displacementMm: 3.4, threshold: 80 },
    { time: '08:00', saturation: 68, displacementMm: 5.8, threshold: 80 },
    { time: '12:00', saturation: 84, displacementMm: 9.6, threshold: 80 },
    { time: '16:00', saturation: 88, displacementMm: 14.2, threshold: 80 },
    { time: '20:00', saturation: 79, displacementMm: 12.8, threshold: 80 },
    { time: 'Now', saturation: 74, displacementMm: 11.5, threshold: 80 },
  ];

  // --- 2. Cloudburst Mock Trend Data (Hourly mm/hr) ---
  const cloudburstTrendData = [
    { time: '10:00', rudraprayag: 18, chamoli: 12, uttarkashi: 8, dangerLimit: 60 },
    { time: '11:00', rudraprayag: 28, chamoli: 19, uttarkashi: 14, dangerLimit: 60 },
    { time: '12:00', rudraprayag: 45, chamoli: 32, uttarkashi: 22, dangerLimit: 60 },
    { time: '13:00', rudraprayag: 72, chamoli: 48, uttarkashi: 31, dangerLimit: 60 }, // Cloudburst breach
    { time: '14:00', rudraprayag: 64, chamoli: 58, uttarkashi: 42, dangerLimit: 60 },
    { time: '15:00', rudraprayag: 41, chamoli: 35, uttarkashi: 25, dangerLimit: 60 },
    { time: 'Now', rudraprayag: 32, chamoli: 26, uttarkashi: 18, dangerLimit: 60 },
  ];

  // --- 3. Crowd Capacity Mock Data ---
  const crowdCapacityData = [
    {
      shrine: 'Kedarnath',
      current: 17200,
      safeLimit: 14000,
      overload: 3200,
      waitTimeHrs: 4.5,
      status: 'HIGH OVERLOAD',
    },
    {
      shrine: 'Badrinath',
      current: 16800,
      safeLimit: 22000,
      overload: 0,
      waitTimeHrs: 2.2,
      status: 'NORMAL CAPACITY',
    },
    {
      shrine: 'Gangotri',
      current: 6200,
      safeLimit: 9000,
      overload: 0,
      waitTimeHrs: 1.0,
      status: 'NORMAL CAPACITY',
    },
    {
      shrine: 'Yamunotri',
      current: 5400,
      safeLimit: 7500,
      overload: 0,
      waitTimeHrs: 1.5,
      status: 'NORMAL CAPACITY',
    },
  ];

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy-950/95 text-white p-3 rounded-xl border border-navy-700 shadow-2xl text-xs space-y-1.5 backdrop-blur-md">
          <div className="font-bold text-slate-200 border-b border-navy-800 pb-1 flex items-center justify-between gap-3">
            <span>{label}</span>
            <Clock className="w-3 h-3 text-teal-400" />
          </div>
          {payload.map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4 font-mono text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-bold text-white">
                {entry.value} {entry.unit || ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card p-4 sm:p-6 space-y-6">
      {/* Chart Header & Engine Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="font-black text-slate-900 text-lg sm:text-xl tracking-tight">
              Risk Trends & Early Warning Analytics
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Multi-sensor geotechnical, meteorological & transit telemetry tracking over time.
          </p>
        </div>

        {/* Tab & Range Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Engine Selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('landslide')}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'landslide'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-red-400" />
              <span>Landslide</span>
            </button>

            <button
              onClick={() => setActiveTab('cloudburst')}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'cloudburst'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5 text-amber-400" />
              <span>Cloudburst</span>
            </button>

            <button
              onClick={() => setActiveTab('crowd')}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'crowd'
                  ? 'bg-navy-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-purple-400" />
              <span>Crowd Surges</span>
            </button>
          </div>

          {/* Time range selector */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {['24h', '7d', 'Real-Time'].map((rng) => (
              <button
                key={rng}
                onClick={() => setTimeRange(rng)}
                type="button"
                className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all ${
                  timeRange === rng
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {rng}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Render Active Chart Engine */}
      {activeTab === 'landslide' && (
        <div className="space-y-5">
          {/* Key Metric Snapshot Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-red-50/70 border border-red-200">
              <span className="text-red-700 font-bold block text-[11px]">Peak Saturation</span>
              <span className="text-xl font-black font-mono text-red-950">88%</span>
              <span className="text-[10px] text-red-800 block mt-0.5">NH-07 Lambagar Sector</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-amber-700 font-bold block text-[11px]">Displacement</span>
              <span className="text-xl font-black font-mono text-amber-950">14.2 mm</span>
              <span className="text-[10px] text-amber-800 block mt-0.5">Creep rate: +2.4 mm/hr</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-600 font-bold block text-[11px]">Failure Limit</span>
              <span className="text-xl font-black font-mono text-slate-800">80% Sat</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Geotechnical threshold</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-emerald-700 font-bold block text-[11px]">IoT Inclinometers</span>
              <span className="text-xl font-black font-mono text-emerald-950">148 Active</span>
              <span className="text-[10px] text-emerald-800 block mt-0.5">100% telemetry online</span>
            </div>
          </div>

          {/* Area + Line Chart */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={landslideTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="saturationGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <ReferenceLine
                  y={80}
                  stroke="#dc2626"
                  strokeDasharray="4 4"
                  label={{ value: 'CRITICAL FAILURE THRESHOLD (80%)', fill: '#dc2626', fontSize: 10, position: 'insideTopRight' }}
                />
                <Area
                  type="monotone"
                  dataKey="saturation"
                  name="Soil Saturation (%)"
                  unit="%"
                  stroke="#dc2626"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#saturationGradient)"
                />
                <Line
                  type="monotone"
                  dataKey="displacementMm"
                  name="Slope Displacement (mm)"
                  unit="mm"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#d97706' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Operational Assessment:</span> Soil moisture saturation at Lambagar chute breached the 80% failure limit between 12:00 and 16:00. Single-lane convoy clearance protocols are active with SDRF heavy earthmovers positioned on-site.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'cloudburst' && (
        <div className="space-y-5">
          {/* Key Metric Snapshot Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-amber-700 font-bold block text-[11px]">Peak Intensity</span>
              <span className="text-xl font-black font-mono text-amber-950">72 mm/hr</span>
              <span className="text-[10px] text-amber-800 block mt-0.5">Mandakini Valley (13:00)</span>
            </div>
            <div className="p-3 rounded-xl bg-red-50/70 border border-red-200">
              <span className="text-red-700 font-bold block text-[11px]">Cloudburst Limit</span>
              <span className="text-xl font-black font-mono text-red-950">60 mm/hr</span>
              <span className="text-[10px] text-red-800 block mt-0.5">IMD Extreme Nowcast</span>
            </div>
            <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200">
              <span className="text-sky-700 font-bold block text-[11px]">Doppler Echo</span>
              <span className="text-xl font-black font-mono text-sky-950">52 dBZ</span>
              <span className="text-[10px] text-sky-800 block mt-0.5">Mukteshwar Radar Station</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-emerald-700 font-bold block text-[11px]">Lead Time Buffer</span>
              <span className="text-xl font-black font-mono text-emerald-950">35 mins</span>
              <span className="text-[10px] text-emerald-800 block mt-0.5">Evacuation warning window</span>
            </div>
          </div>

          {/* Bar Chart comparing 3 vulnerable valleys */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cloudburstTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 90]} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <ReferenceLine
                  y={60}
                  stroke="#dc2626"
                  strokeDasharray="4 4"
                  label={{ value: 'CLOUDBURST THRESHOLD (60 mm/hr)', fill: '#dc2626', fontSize: 10, position: 'insideTopRight' }}
                />
                <Bar
                  dataKey="rudraprayag"
                  name="Rudraprayag / Mandakini"
                  unit="mm/hr"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="chamoli"
                  name="Chamoli / Alaknanda"
                  unit="mm/hr"
                  fill="#0284c7"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="uttarkashi"
                  name="Uttarkashi / Bhagirathi"
                  unit="mm/hr"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <CloudRain className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Nowcast Alert:</span> Doppler radar tracking shows convective storm cells peaked at 72 mm/hr in Rudraprayag before diffusing towards higher ridges. River gauge on Mandakini is +0.6m/hr. Downstream flood sirens tested active.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'crowd' && (
        <div className="space-y-5">
          {/* Key Metric Snapshot Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-200">
              <span className="text-purple-700 font-bold block text-[11px]">Kedarnath Load</span>
              <span className="text-xl font-black font-mono text-purple-950">122%</span>
              <span className="text-[10px] text-purple-800 block mt-0.5">+3,200 pilgrims over limit</span>
            </div>
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200">
              <span className="text-amber-700 font-bold block text-[11px]">Gaurikund Gate</span>
              <span className="text-xl font-black font-mono text-amber-950">4.5 hrs</span>
              <span className="text-[10px] text-amber-800 block mt-0.5">Queue wait time for trek</span>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-emerald-700 font-bold block text-[11px]">Badrinath Flow</span>
              <span className="text-xl font-black font-mono text-emerald-950">76%</span>
              <span className="text-[10px] text-emerald-800 block mt-0.5">Smooth transit via NH-07</span>
            </div>
            <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200">
              <span className="text-sky-700 font-bold block text-[11px]">Total Tracked</span>
              <span className="text-xl font-black font-mono text-sky-950">45,600</span>
              <span className="text-[10px] text-sky-800 block mt-0.5">Active RFID pilgrims</span>
            </div>
          </div>

          {/* Bar Chart comparing Current vs Safe Capacity */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={crowdCapacityData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="shrine" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar
                  dataKey="safeLimit"
                  name="Safe Daily Capacity"
                  unit="pilgrims"
                  fill="#94a3b8"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="current"
                  name="Current Pilgrims"
                  unit="pilgrims"
                  fill="#8b5cf6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Users className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Transit Advisory:</span> Kedarnath Dham is operating at 122% carrying capacity. Temporary ascent holding camps have been enacted at Guptkashi and Sonprayag to regulate mule tracks and prevent bottlenecks along the upper valley bridge.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
