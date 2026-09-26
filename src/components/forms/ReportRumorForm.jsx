import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { Search, ShieldCheck } from 'lucide-react';

export default function ReportRumorForm({ onVerify, loading = false }) {
  const [claimText, setClaimText] = useState('');

  const sampleRumors = [
    'Kedarnath temple flooded by Mandakini river overflow',
    'Badrinath highway bridge collapsed at Lambagar',
    'Helicopter services suspended for remaining season',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claimText.trim()) return;
    onVerify?.(claimText.trim());
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
          Verify Crisis Claim / Fact-Checking NLP Engine
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              placeholder="Paste social media post, WhatsApp forward, or rumor headline..."
              icon={Search}
            />
          </div>
          <Button
            type="submit"
            variant="navy"
            icon={ShieldCheck}
            loading={loading}
            disabled={!claimText.trim()}
          >
            Fact Check Claim
          </Button>
        </div>
      </form>

      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center gap-2 flex-wrap text-xs">
        <span className="text-slate-500 font-semibold">Quick verification examples:</span>
        {sampleRumors.map((r, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setClaimText(r);
              onVerify?.(r);
            }}
            className="text-[11px] px-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 text-teal-800 border border-slate-200 font-medium transition"
          >
            "{r.slice(0, 36)}..."
          </button>
        ))}
      </div>
    </div>
  );
}
