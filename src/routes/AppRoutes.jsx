import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import AuthorityLayout from '../layouts/AuthorityLayout';

// Public App Pages
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import JourneyRisk from '../pages/JourneyRisk';
import Landslide from '../pages/Landslide';
import Cloudburst from '../pages/Cloudburst';
import GLOF from '../pages/GLOF';
import CrowdRisk from '../pages/CrowdRisk';
import FakeNews from '../pages/FakeNews';
import Alerts from '../pages/Alerts';
import About from '../pages/About';

// Authority App Page
import Authority from '../pages/Authority';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public App Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/risk-map" element={<Navigate to="/" replace />} />
        <Route path="/journey-risk" element={<JourneyRisk />} />
        <Route path="/landslide" element={<Landslide />} />
        <Route path="/cloudburst" element={<Cloudburst />} />
        <Route path="/glof" element={<GLOF />} />
        <Route path="/crowd-risk" element={<CrowdRisk />} />
        <Route path="/fake-news" element={<FakeNews />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/about" element={<About />} />
      </Route>

      {/* Authority App Layout */}
      <Route element={<AuthorityLayout />}>
        <Route path="/authority" element={<Authority />} />
      </Route>

      {/* Fallback to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
