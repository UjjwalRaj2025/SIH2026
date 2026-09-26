import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import SeverityBadge from '../../components/common/SeverityBadge';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import Loading from '../../components/common/Loading';
import StatCard from '../../components/dashboard/StatCard';
import CrowdTrendChart from '../../components/charts/CrowdTrendChart';
import { Users, AlertTriangle, ShieldCheck, Clock, DoorClosed, DoorOpen, RefreshCw } from 'lucide-react';
import { mockApiService } from '../../services/mockApi';

export default function CrowdRisk() {
  const [crowds, setCrowds] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCrowd = async () => {
    try {
      setLoading(true);
      const [crowdData, analyticsData] = await Promise.all([
        mockApiService.getCrowdDensityMetrics(),
        mockApiService.getAnalyticsData(),
      ]);
      setCrowds(crowdData);
      setAnalytics(analyticsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrowd();
  }, []);

  if (loading) {
    return <Loading label="Processing RFID transit gate counts & drone crowd density estimates..." fullHeight />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Char Dham Pilgrim Flow & Crowd Risk Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Real-time carrying capacity monitoring, trek bottleneck detection, queue wait times, and stampede prevention protocols.
              </p>
            </div>
          </div>
        </div>

        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={fetchCrowd}>
          Refresh Gates
        </Button>
      </div>

      {/* Top Metrics in Light Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Pilgrims In Transit"
          value="45,400"
          unit="Pilgrims"
          change="+12% daily influx"
          trend="up"
          variant="purple"
          icon={Users}
          subtitle="Across 4 Himalayan shrines"
        />
        <StatCard
          title="Peak Trek Density"
          value="5.1"
          unit="Persons / m²"
          change="Gaurikund Base"
          trend="up"
          variant="rose"
          icon={AlertTriangle}
          subtitle="Safe limit: <3.0 p/m²"
        />
        <StatCard
          title="Max Queue Wait Time"
          value="6.5"
          unit="Hours"
          change="Kedarnath Sanctum"
          trend="up"
          variant="amber"
          icon={Clock}
          subtitle="Metered batch entry enforced"
        />
        <StatCard
          title="RFID Transit Gates"
          value="12 / 14"
          unit="Open"
          change="Sonprayag Restricting"
          trend="neutral"
          variant="teal"
          icon={ShieldCheck}
          subtitle="Real-time holding camps active"
        />
      </div>

      {/* Influx vs Safe Carrying Capacity Chart */}
      {analytics && (
        <Card
          title="Char Dham Shrine Capacity vs Influx"
          subtitle="Threshold comparison to prevent structural and ecological over-saturation"
        >
          <CrowdTrendChart data={analytics.crowdCapacityTrends} height={250} />
        </Card>
      )}

      {/* Shrine Chokepoint & Gate Status Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Shrine Circuits & Trek Corridors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {crowds.map((c) => {
            const isOverloaded = c.currentOccupancy > c.capacityLimit;
            const level = c.currentOccupancy > c.capacityLimit * 1.2 ? 'CRITICAL' : isOverloaded ? 'HIGH' : c.currentOccupancy > c.capacityLimit * 0.7 ? 'MODERATE' : 'LOW';

            return (
              <Card
                key={c.id}
                className="hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 tracking-tight">{c.shrineName}</h3>
                      <span className="text-xs text-slate-500 font-mono">Transit Node ID: {c.id}</span>
                    </div>
                    <SeverityBadge level={level} label={c.status} size="sm" pulse={level === 'CRITICAL'} />
                  </div>

                  <div className="mt-3.5">
                    <ProgressBar
                      value={c.currentOccupancy}
                      max={c.capacityLimit}
                      label={`Capacity Occupancy (${c.currentOccupancy.toLocaleString()} / ${c.capacityLimit.toLocaleString()})`}
                      colorScheme={isOverloaded ? 'rose' : 'teal'}
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Crowd Density:</span>
                      <span className={`text-sm font-black ${c.crowdDensityPerSqm > 4 ? 'text-red-700' : 'text-slate-900'}`}>
                        {c.crowdDensityPerSqm} persons/m²
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Est. Queue Wait:</span>
                      <span className="text-sm font-black text-purple-800">
                        {c.averageQueueWaitHours} Hours
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs">
                    <span className="font-bold text-purple-900 block mb-0.5">
                      Crowd Control Directive:
                    </span>
                    <p className="text-purple-950 font-medium leading-relaxed">{c.recommendation}</p>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1.5 font-bold">
                    {c.gateStatus.includes('Suspend') ? (
                      <DoorClosed className="w-4 h-4 text-red-600" />
                    ) : (
                      <DoorOpen className="w-4 h-4 text-emerald-600" />
                    )}
                    <span className={c.gateStatus.includes('Suspend') ? 'text-red-700' : 'text-emerald-700'}>
                      Gate Status: {c.gateStatus}
                    </span>
                  </span>
                  <a href="/journey-risk" className="text-teal-700 hover:text-teal-800 font-bold">
                    Plan Transit Slot &rarr;
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
