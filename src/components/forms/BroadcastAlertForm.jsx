import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { Radio, AlertTriangle } from 'lucide-react';

export default function BroadcastAlertForm({ onBroadcast, loading = false }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Landslide');
  const [severity, setSeverity] = useState('critical');
  const [location, setLocation] = useState('Chamoli / Joshimath Axis');
  const [description, setDescription] = useState('');
  const [actionRequired, setActionRequired] = useState('');
  const [radiusKm, setRadiusKm] = useState('15');

  const typeOptions = [
    { value: 'Landslide', label: 'Landslide & Rockfall' },
    { value: 'Cloudburst', label: 'Cloudburst / Flash Flood' },
    { value: 'GLOF', label: 'GLOF Glacial Lake Breach' },
    { value: 'Crowd Risk', label: 'Pilgrim Crowd Congestion' },
    { value: 'Fake News', label: 'Disaster Rumor Debunk' },
  ];

  const severityOptions = [
    { value: 'critical', label: 'CRITICAL (Immediate Evacuation / Red Alert)' },
    { value: 'warning', label: 'HIGH (Elevated Warning / Orange Alert)' },
    { value: 'advisory', label: 'MODERATE (Caution Watch / Yellow Alert)' },
    { value: 'safe', label: 'LOW (Normal Safe Parameters / Green)' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;
    onBroadcast?.({
      title,
      type,
      severity,
      location,
      description,
      actionRequired: actionRequired || 'Exercise high caution. Obey SDRF and police directives.',
      affectedRadiusKm: Number(radiusKm) || 10,
      coordinates: [30.45, 79.15],
    });
    // Reset form fields
    setTitle('');
    setDescription('');
    setActionRequired('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-2xl bg-white border border-red-200 shadow-card space-y-4">
      <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3.5">
        <div className="p-2 rounded-xl bg-red-100 text-red-700">
          <Radio className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-extrabold text-slate-900 text-base">
            Emergency Early Warning Broadcast (CAP Protocol)
          </h3>
          <p className="text-xs text-slate-500 font-medium">Dispatches instant push alerts, SMS bursts, and siren triggers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Hazard Classification"
          options={typeOptions}
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <Select
          label="Severity Level"
          options={severityOptions}
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Alert Title / Headline"
          placeholder="e.g. Mudslide blocking NH-07 near Joshimath"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Input
          label="Affected Location / District"
          placeholder="e.g. Rudraprayag / Sonprayag Transit"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Incident Brief & Sensor Telemetry
        </label>
        <textarea
          rows={3}
          className="w-full rounded-xl bg-white border border-slate-300 p-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition shadow-subtle"
          placeholder="Describe ground observation, rainfall rate or hazard readings..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Public Action Protocol (Evacuation / Diversion)"
          placeholder="e.g. Halt at nearest shelter; avoid riverbanks"
          value={actionRequired}
          onChange={(e) => setActionRequired(e.target.value)}
        />
        <Input
          label="Broadcasting Radius (km)"
          type="number"
          value={radiusKm}
          onChange={(e) => setRadiusKm(e.target.value)}
        />
      </div>

      <div className="pt-2 flex justify-end">
        <Button
          type="submit"
          variant="danger"
          icon={AlertTriangle}
          loading={loading}
          disabled={!title.trim() || !description.trim()}
        >
          Transmit State-Wide Alert
        </Button>
      </div>
    </form>
  );
}
