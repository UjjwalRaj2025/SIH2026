import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import SeverityBadge from '../../components/common/SeverityBadge';
import Tabs from '../../components/common/Tabs';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import AlertItem from '../../components/alerts/AlertItem';
import AlertModal from '../../components/alerts/AlertModal';
import { Bell, AlertTriangle, ShieldCheck, PhoneCall, RefreshCw } from 'lucide-react';
import { mockApiService } from '../../services/mockApi';

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedAlert, setSelectedAlert] = useState(null);

  const fetchAlerts = async (filter) => {
    try {
      setLoading(true);
      const data = await mockApiService.getAlerts(filter);
      setAlerts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts(activeFilter);
  }, [activeFilter]);

  const tabs = [
    { id: 'all', label: 'All Advisories' },
    { id: 'critical', label: 'Critical (Red Alert)' },
    { id: 'warning', label: 'High (Orange Alert)' },
    { id: 'advisory', label: 'Moderate (Yellow Watch)' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600">
              <Bell className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Statewide Emergency Alerts & Advisories
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Live multi-channel emergency broadcast messages issued by State Emergency Operations Centre (SEOC) & SDRF.
              </p>
            </div>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={RefreshCw}
          onClick={() => fetchAlerts(activeFilter)}
        >
          Refresh Feeds
        </Button>
      </div>

      {/* Emergency Helpline Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white border border-red-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-2xl bg-red-600 text-white shrink-0 shadow-sm">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">In an active life-safety emergency?</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Immediate connection to SDRF mountain rescue battalions and district disaster control rooms.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <a
            href="tel:1070"
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-sm transition"
          >
            State Helpline: 1070
          </a>
          <a
            href="tel:112"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
          >
            Police / All: 112
          </a>
        </div>
      </div>

      {/* Tabs Filter */}
      <Tabs tabs={tabs} activeTab={activeFilter} onChange={setActiveFilter} />

      {/* Alerts Content */}
      {loading ? (
        <Loading label="Querying emergency alerting nodes..." fullHeight />
      ) : alerts.length === 0 ? (
        <EmptyState
          icon={ShieldCheck}
          title="No active alerts in this severity category"
          description="All sensors and communication nodes report safe operational parameters."
          actionLabel="Show All Alerts"
          onAction={() => setActiveFilter('all')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alt) => (
            <AlertItem key={alt.id} alert={alt} onSelect={setSelectedAlert} />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <AlertModal
        alert={selectedAlert}
        isOpen={!!selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}
