import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import SeverityBadge from '../../components/common/SeverityBadge';
import Button from '../../components/common/Button';
import ProgressBar from '../../components/common/ProgressBar';
import Loading from '../../components/common/Loading';
import StatCard from '../../components/dashboard/StatCard';
import { Mountain, AlertTriangle, Layers, Clock, RefreshCw } from 'lucide-react';
import { mockApiService } from '../../services/mockApi';

export default function Landslide() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const data = await mockApiService.getLandslideZones();
      setZones(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  if (loading) {
    return <Loading label="Connecting to slope stability sensors & BRO road recon feeds..." fullHeight />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Landslide Intelligence & Slope Stability Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Real-time monitoring of shooting stone chutes, geotechnical soil moisture saturation, and NH-07/107 road closures.
              </p>
            </div>
          </div>
        </div>

        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={fetchZones}>
          Refresh Feeds
        </Button>
      </div>

      {/* Top Metrics in Light Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Slide Corridors"
          value="2"
          unit="Blocked Highways"
          change="NH-07 Lambagar"
          trend="up"
          variant="rose"
          icon={Mountain}
          subtitle="Heavy earthmovers deployed"
        />
        <StatCard
          title="Peak Soil Saturation"
          value="94%"
          unit="Moisture Index"
          change="Lambagar Chute"
          trend="up"
          variant="amber"
          icon={AlertTriangle}
          subtitle="Critical threshold >80%"
        />
        <StatCard
          title="Monitored Geo-Sectors"
          value="18"
          unit="Inclinometer nodes"
          change="All Active"
          trend="neutral"
          variant="teal"
          icon={Layers}
          subtitle="Sub-surface displacement sensors"
        />
        <StatCard
          title="Est. Route Clearance"
          value="4.5"
          unit="Hours"
          change="BRO Team on site"
          trend="down"
          variant="cyan"
          icon={Clock}
          subtitle="Single-lane pilot convoy"
        />
      </div>

      {/* Landslide Corridors Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Active Landslide Threat Corridors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {zones.map((z) => {
            const level = z.riskScore >= 75 ? 'CRITICAL' : z.riskScore >= 45 ? 'HIGH' : 'LOW';
            return (
              <Card
                key={z.id}
                className="hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">{z.district}</span>
                      <h3 className="font-extrabold text-base text-slate-900 tracking-tight">{z.name}</h3>
                    </div>
                    <SeverityBadge level={level} label={z.status} size="sm" pulse={level === 'CRITICAL'} />
                  </div>

                  <div className="mt-3 text-xs font-semibold text-teal-800">
                    Highway: <span className="text-slate-800">{z.route}</span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">{z.details}</p>

                  <div className="mt-4">
                    <ProgressBar
                      value={z.riskScore}
                      max={100}
                      label="Landslide Susceptibility Index"
                      colorScheme="dynamic"
                    />
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Soil Moisture:</span>
                      <span className="font-bold text-slate-900">{z.soilMoisturePct}%</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Slope Angle:</span>
                      <span className="font-bold text-slate-900">{z.slopeAngleDeg}°</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Last shift: {z.lastMovement}</span>
                  <a
                    href={`/journey-risk?destination=${encodeURIComponent(z.route)}`}
                    className="text-teal-700 hover:text-teal-800 font-bold"
                  >
                    Check Bypass &rarr;
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
