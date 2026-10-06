import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card';
import SeverityBadge from '../../components/common/SeverityBadge';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import StatCard from '../../components/dashboard/StatCard';
import { Waves, Mountain, Clock, Satellite, RefreshCw } from 'lucide-react';
import { mockApiService } from '../../services/mockApi';

export default function GLOF() {
  const [lakes, setLakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLakes = async () => {
    try {
      setLoading(true);
      const data = await mockApiService.getGlofSurveillance();
      setLakes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLakes();
  }, []);

  if (loading) {
    return <Loading label="Retrieving high-altitude ISRO RISAT & Sentinel-2 cryosphere telemetry..." fullHeight />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-50 border border-sky-200 text-sky-700">
              <Waves className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Glacial Lake Outburst Flood (GLOF) Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Tracking proglacial lake expansion, moraine dam stability, and downstream surge evacuation lead times across high Himalaya.
              </p>
            </div>
          </div>
        </div>

        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={fetchLakes}>
          Sync Satellite Imagery
        </Button>
      </div>

      {/* Top Metrics in Light Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monitored High Lakes"
          value="4"
          unit="Glacial Basins"
          change="Chorabari Watch"
          trend="up"
          variant="cyan"
          icon={Waves}
          subtitle="Mandakini & Alaknanda headwaters"
        />
        <StatCard
          title="Max Surface Expansion"
          value="+14%"
          unit="/ past 36 hrs"
          change="Chorabari Glacial Lake"
          trend="up"
          variant="rose"
          icon={Satellite}
          subtitle="Meltwater surge active"
        />
        <StatCard
          title="Min. Evacuation Buffer"
          value="38"
          unit="Minutes"
          change="Kedarnath Shrine Sector"
          trend="neutral"
          variant="amber"
          icon={Clock}
          subtitle="Acoustic early warning sirens linked"
        />
        <StatCard
          title="Highest Lake Altitude"
          value="4,850"
          unit="Meters AMSL"
          change="Rishiganga Basin"
          trend="neutral"
          variant="teal"
          icon={Mountain}
          subtitle="Automated water level sonar active"
        />
      </div>

      {/* Glacial Lakes Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          High-Altitude Proglacial Lakes & Moraine Integrity
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {lakes.map((lake) => {
            const level = lake.riskLevel.includes('Critical') ? 'CRITICAL' : lake.riskLevel.includes('Elevated') ? 'HIGH' : lake.riskLevel.includes('Moderate') ? 'MODERATE' : 'LOW';
            return (
              <Card
                key={lake.id}
                className="hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500 font-bold block">{lake.basin} • {lake.district}</span>
                      <h3 className="font-extrabold text-base text-slate-900 tracking-tight">{lake.lakeName}</h3>
                    </div>
                    <SeverityBadge level={level} label={lake.riskLevel} size="sm" pulse={level === 'CRITICAL'} />
                  </div>

                  <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Altitude:</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{lake.altitudeMeters} m</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-slate-500 block text-[11px] font-medium">Expansion Rate:</span>
                      <span className="font-bold text-sky-700 text-sm">{lake.expansionRatePct}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
                      <span className="text-slate-500 block text-[11px] font-medium">Freeboard Margin:</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">{lake.freeboardMeters} m</span>
                    </div>
                  </div>

                  <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 font-medium">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Moraine Dam Integrity:</span>
                      <span className={`font-bold ${level === 'CRITICAL' ? 'text-red-700' : 'text-slate-800'}`}>
                        {lake.moraineIntegrity}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Evacuation Lead Time:</span>
                      <span className="font-mono font-bold text-amber-800">
                        {lake.evacuationLeadTimeMins} Minutes
                      </span>
                    </div>
                  </div>

                  <div className="mt-3.5 text-xs">
                    <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider mb-1.5">
                      Downstream Vulnerable Settlements:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {lake.downstreamSettlements.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-[11px] font-semibold"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Coordinates: {lake.coordinates[0]}° N, {lake.coordinates[1]}° E</span>
                  <Link
                    to="/journey-risk"
                    className="text-sky-700 hover:text-sky-800 font-bold"
                  >
                    Check Basin Route &rarr;
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
