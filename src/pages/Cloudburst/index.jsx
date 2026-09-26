import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import SeverityBadge from '../../components/common/SeverityBadge';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import Loading from '../../components/common/Loading';
import StatCard from '../../components/dashboard/StatCard';
import RainfallChart from '../../components/charts/RainfallChart';
import { CloudRain, AlertTriangle, Radio, Zap, RefreshCw } from 'lucide-react';
import { mockApiService } from '../../services/mockApi';

export default function Cloudburst() {
  const [data, setData] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCloudburst = async () => {
    try {
      setLoading(true);
      const [cbData, analyticsData] = await Promise.all([
        mockApiService.getCloudburstTelemetry(),
        mockApiService.getAnalyticsData(),
      ]);
      setData(cbData);
      setAnalytics(analyticsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCloudburst();
  }, []);

  if (loading) {
    return <Loading label="Syncing with IMD Doppler Radar Network (Mukteshwar & Surkanda Devi)..." fullHeight />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
              <CloudRain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Cloudburst Nowcasting & Convective Flash Flood Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Nowcasting hyper-localized convective rainfall spikes exceeding &gt;60 mm/hr and flash flood basin risks.
              </p>
            </div>
          </div>
        </div>

        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={loadCloudburst}>
          Sync Doppler Radar
        </Button>
      </div>

      {/* Top Metrics in Light Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Peak Precipitation Nowcast"
          value="72"
          unit="mm / hr"
          change="Dharali Catchment"
          trend="up"
          variant="amber"
          icon={CloudRain}
          subtitle="Cloudburst criteria: >60 mm/hr"
        />
        <StatCard
          title="Doppler Reflectivity"
          value="54"
          unit="dBZ (Extreme)"
          change="Upper Kedarnath"
          trend="up"
          variant="rose"
          icon={Zap}
          subtitle="Cumulonimbus cell converging"
        />
        <StatCard
          title="Flash Flood Probability"
          value="89%"
          unit="Next 90 mins"
          change="Mandakini Tributaries"
          trend="up"
          variant="rose"
          icon={AlertTriangle}
          subtitle="Riverside sirens activated"
        />
        <StatCard
          title="Active Radar Sweeps"
          value="2"
          unit="Stations Online"
          change="Surkanda + Mukteshwar"
          trend="neutral"
          variant="teal"
          icon={Radio}
          subtitle="360° volume scan every 10m"
        />
      </div>

      {/* 24-hr Rainfall Trend Chart in White Card */}
      {analytics && (
        <Card
          title="Real-Time Precipitation Intensity Matrix (mm/hr)"
          subtitle="Continuous gauge records across major Himalayan river catchment valleys"
        >
          <RainfallChart data={analytics.rainfallTrends} height={250} />
        </Card>
      )}

      {/* Cloudburst Monitored Basins Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Monitored Valley Catchment Cells
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.map((c) => {
            const level = c.currentRainfallRateMmHr >= c.thresholdMmHr ? 'CRITICAL' : c.currentRainfallRateMmHr >= 40 ? 'HIGH' : c.currentRainfallRateMmHr >= 25 ? 'MODERATE' : 'LOW';
            return (
              <Card
                key={c.id}
                className="hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">{c.district}</span>
                      <h3 className="font-extrabold text-base text-slate-900 tracking-tight">{c.zone}</h3>
                    </div>
                    <SeverityBadge level={level} label={c.status} size="sm" pulse={level === 'CRITICAL'} />
                  </div>

                  <div className="mt-3.5 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Current Rainfall Rate:</span>
                      <span className={`text-base font-black ${c.currentRainfallRateMmHr >= c.thresholdMmHr ? 'text-red-600' : 'text-amber-600'}`}>
                        {c.currentRainfallRateMmHr} mm/hr
                      </span>
                      <span className="text-[10px] text-slate-400 block font-medium">Threshold: {c.thresholdMmHr} mm/h</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Radar Reflectivity:</span>
                      <span className="text-base font-black text-slate-900">
                        {c.radarReflectivityDbz} dBZ
                      </span>
                      <span className="text-[10px] text-slate-400 block font-medium">Convective core signature</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <ProgressBar
                      value={c.probabilityPct}
                      max={100}
                      label="Cloudburst Strike Probability"
                      colorScheme="dynamic"
                    />
                  </div>

                  <div className="mt-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 font-medium">
                    <span className="font-bold text-amber-900 block mb-0.5">2-Hour Forecast Outlook:</span>
                    <span>{c.forecastNext2Hours}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Sensor ID: {c.id}</span>
                  <span className="text-red-700 font-bold">Immediate Riverside Evacuation Protocol</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
