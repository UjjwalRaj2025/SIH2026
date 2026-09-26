import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card';
import SeverityBadge from '../../components/common/SeverityBadge';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import ProgressBar from '../../components/common/ProgressBar';
import ReportRumorForm from '../../components/forms/ReportRumorForm';
import StatCard from '../../components/dashboard/StatCard';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Search,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { mockApiService } from '../../services/mockApi';

export default function FakeNews() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [activeVerification, setActiveVerification] = useState(null);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const data = await mockApiService.getFakeNewsFeed();
      setFeed(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleVerifyClaim = async (claimText) => {
    try {
      setVerifying(true);
      const result = await mockApiService.verifyClaim(claimText);
      setActiveVerification(result);
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return <Loading label="Syncing with verified State Disaster Information Feed..." fullHeight />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Crisis Rumor Buster & Fact-Checking Engine
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                Detecting fabricated disaster clips, recycled flood media, and panic-inducing viral rumors during mountain emergencies.
              </p>
            </div>
          </div>
        </div>

        <Button variant="secondary" size="sm" icon={RefreshCw} onClick={fetchFeed}>
          Refresh Feeds
        </Button>
      </div>

      {/* Top Metrics in Light Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Viral Claims Fact-Checked"
          value="14"
          unit="Today"
          change="3 Hoaxes Blocked"
          trend="up"
          variant="teal"
          icon={CheckCircle2}
          subtitle="Real-time multi-platform scanner"
        />
        <StatCard
          title="Recycled Media Detected"
          value="68%"
          unit="Of Flagged Content"
          change="2013 archive footage"
          trend="up"
          variant="rose"
          icon={XCircle}
          subtitle="Exif & reverse video analysis"
        />
        <StatCard
          title="Official Clarifications"
          value="8"
          unit="USDMA Bulletins"
          change="Dispatched to media"
          trend="neutral"
          variant="cyan"
          icon={ShieldCheck}
          subtitle="Direct link to District Magistrates"
        />
        <StatCard
          title="Average Verification Time"
          value="4.2"
          unit="Minutes"
          change="-35% response latency"
          trend="down"
          variant="purple"
          icon={Search}
          subtitle="Automated corroboration pipeline"
        />
      </div>

      {/* Interactive Fact-Check Submission Tool */}
      <ReportRumorForm onVerify={handleVerifyClaim} loading={verifying} />

      {/* Live AI Verification Result Card in White Background */}
      {activeVerification && (
        <Card
          className="border-teal-300 bg-white shadow-elevated animate-in fade-in duration-300"
          title="AI NLP Fact-Check Analysis Result"
          subtitle={activeVerification.timestamp}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs text-slate-500 block font-bold mb-1">Claim Inspected:</span>
              <p className="text-sm font-bold text-slate-900 italic">"{activeVerification.claim}"</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Verdict:</span>
                <div>
                  <SeverityBadge
                    level={activeVerification.credibilityScore > 50 ? 'LOW' : 'CRITICAL'}
                    label={activeVerification.verdict}
                    size="md"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <ProgressBar
                  value={activeVerification.credibilityScore}
                  max={100}
                  label="Claim Credibility Confidence Index"
                  colorScheme={activeVerification.credibilityScore > 50 ? 'emerald' : 'rose'}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              <span className="text-teal-800 font-bold block mb-1">Investigative Evidence:</span>
              {activeVerification.analysis}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500 font-medium">
                Corroborated against: {activeVerification.officialSources.join(', ')}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveVerification(null)}
              >
                Dismiss Analysis
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Verified Claims Feed Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
          Verified Advisories & Debunked Disaster Rumors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {feed.map((item) => {
            const isCritical = item.verdict.includes('FALSE') || item.verdict.includes('FABRICATED');
            const isHoax = item.verdict.includes('HOAX');
            const isMisleading = item.verdict.includes('MISLEADING');
            const level = isCritical ? 'CRITICAL' : isHoax ? 'HIGH' : isMisleading ? 'MODERATE' : 'LOW';

            return (
              <Card
                key={item.id}
                className="hover:border-slate-300 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <SeverityBadge level={level} label={item.verdict} size="sm" pulse={level === 'CRITICAL'} />
                    <span className="text-xs text-slate-500 font-mono">{item.timestamp}</span>
                  </div>

                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mt-3 leading-snug">
                    "{item.claim}"
                  </h3>

                  <div className="mt-3.5">
                    <ProgressBar
                      value={item.credibilityScore}
                      max={100}
                      label={`Credibility Score: ${item.credibilityScore} / 100`}
                      colorScheme={item.credibilityScore > 50 ? 'emerald' : 'rose'}
                    />
                  </div>

                  <div className="mt-3.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                    <span className="font-bold text-teal-800 block">Ground-Truth Fact Check:</span>
                    <p className="text-slate-700 leading-relaxed font-medium">{item.factCheck}</p>
                  </div>

                  <div className="mt-3.5 text-[11px] text-slate-500 font-medium flex items-center justify-between">
                    <span>Source: {item.sourceAnalyzed}</span>
                    <span className="text-red-700 font-bold">{item.spreadVelocity}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 text-xs text-slate-600 font-medium flex items-center justify-between">
                  <span>Action: {item.actionTaken}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
