import React, { useState } from 'react';
import './styles/globals.css';
import LandingPage from './pages/LandingPage';
import ServiceReceiverPage from './pages/ServiceReceiverPage';
import NGODashboardPage from './pages/NGODashboardPage';

export default function App() {
  // role: null = landing, 'receiver' = service receiver, 'ngo' = NGO dashboard
  const [role, setRole] = useState(null);

  if (role === 'receiver') {
    return <ServiceReceiverPage onBack={() => setRole(null)} />;
  }

  if (role === 'ngo') {
    return <NGODashboardPage onBack={() => setRole(null)} />;
  }

  return <LandingPage onSelectRole={setRole} />;
}
