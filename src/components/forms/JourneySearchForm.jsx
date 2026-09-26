import React, { useState } from 'react';
import Select from '../common/Select';
import Button from '../common/Button';
import { Navigation, MapPin, Search } from 'lucide-react';

export default function JourneySearchForm({ onSearch, loading = false }) {
  const [origin, setOrigin] = useState('Haridwar / Rishikesh');
  const [destination, setDestination] = useState('Kedarnath Dham');

  const originOptions = [
    { value: 'Haridwar / Rishikesh', label: 'Haridwar / Rishikesh (Plains Base)' },
    { value: 'Dehradun', label: 'Dehradun (Capital Hub)' },
    { value: 'Srinagar Garhwal', label: 'Srinagar Garhwal (Mid-way Transit)' },
    { value: 'Joshimath', label: 'Joshimath' },
    { value: 'Rudraprayag', label: 'Rudraprayag Confluence' },
  ];

  const destinationOptions = [
    { value: 'Kedarnath Dham', label: 'Kedarnath Dham (Mandakini Valley)' },
    { value: 'Badrinath Dham', label: 'Badrinath Dham (Alaknanda Valley)' },
    { value: 'Yamunotri Dham', label: 'Yamunotri Dham (Rawai Valley)' },
    { value: 'Gangotri Dham', label: 'Gangotri Dham (Bhagirathi Valley)' },
    { value: 'Hemkund Sahib', label: 'Hemkund Sahib / Valley of Flowers' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(origin, destination);
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Starting Origin / Transit Hub"
          options={originOptions}
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          icon={MapPin}
        />
        <Select
          label="Char Dham Pilgrimage Destination"
          options={destinationOptions}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          icon={Navigation}
        />
      </div>

      <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-500 font-medium">
          Multi-hazard analysis covering Landslides, Cloudbursts, GLOF, Crowd Chokepoints & Rumor checks.
        </span>
        <Button
          type="submit"
          variant="navy"
          size="md"
          icon={Search}
          loading={loading}
          className="w-full sm:w-auto"
        >
          Analyze Route Risk
        </Button>
      </div>
    </form>
  );
}
