import React from 'react';
import Card from '../common/Card';
import SeverityBadge from '../common/SeverityBadge';
import ProgressBar from '../common/ProgressBar';

export default function HazardSummaryCard({
  title,
  icon: Icon,
  riskScore,
  status,
  metrics = [],
  description,
  actionText,
  onClickAction,
}) {
  const getSeverityLevel = (score) => {
    if (score >= 75) return 'CRITICAL';
    if (score >= 50) return 'HIGH';
    if (score >= 30) return 'MODERATE';
    return 'LOW';
  };

  const severityLevel = getSeverityLevel(riskScore);

  return (
    <Card className="hover:border-slate-300 transition duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 shadow-subtle">
              {Icon && <Icon className="w-5 h-5" />}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">{title}</h4>
              <span className="text-xs text-slate-500 font-medium">{description}</span>
            </div>
          </div>
          {/* Strictly contains both icon and text */}
          <SeverityBadge level={severityLevel} label={status} size="sm" />
        </div>

        <div className="mt-4">
          <ProgressBar
            value={riskScore}
            max={100}
            label="Calculated Threat Probability"
            colorScheme="dynamic"
          />
        </div>

        {metrics.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
            {metrics.map((m, idx) => (
              <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[11px] font-medium">{m.label}</span>
                <span className="font-bold text-slate-800">{m.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {actionText && (
        <button
          onClick={onClickAction}
          className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center justify-between transition"
        >
          <span>{actionText}</span>
          <span>&rarr;</span>
        </button>
      )}
    </Card>
  );
}
