import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import StatsBar from './components/StatsBar';
import PredictionForm from './components/PredictionForm';
import ResultCards from './components/ResultCards';
import AlertPanel from './components/AlertPanel';
import SimulationMode from './components/SimulationMode';
import ChatPanel from './components/ChatPanel';
import IndiaHeatmap from './components/IndiaHeatmap';
import { PredictionsPage, AllocationPage, AlertsPage, ReportsPage } from './components/Pages';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'predictions': return <PredictionsPage />;
      case 'allocation':  return <AllocationPage />;
      case 'alerts':      return <AlertsPage />;
      case 'reports':     return <ReportsPage />;
      default: return (
        <DashboardPage
          result={result}
          setResult={setResult}
          loading={loading}
          setLoading={setLoading}
        />
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--gray-100)' }}>
      <Navbar />
      <Sidebar active={activePage} onNav={setActivePage} />
      <main style={{
        marginLeft: 'var(--sidebar-w)',
        marginTop: 'var(--navbar-h)',
        padding: '28px 28px 40px',
        minHeight: 'calc(100vh - var(--navbar-h))',
      }}>
        {renderPage()}
      </main>

      {/* Floating AI chat — always visible */}
      <ChatPanel result={result} />
    </div>
  );
}

/* ─────────────────────────────────────────
   DASHBOARD PAGE
───────────────────────────────────────── */
function DashboardPage({ result, setResult, loading, setLoading }) {
  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: 24, animation: 'fadeUp 0.3s ease both' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              fontSize: 9, fontWeight: 600, color: 'var(--gray-400)',
              letterSpacing: '1.5px', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)', marginBottom: 4,
            }}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 26,
              color: 'var(--navy-950)', letterSpacing: '-0.5px',
            }}>Crisis Intelligence Dashboard</h1>
            <p style={{ color: 'var(--gray-500)', fontSize: 13, marginTop: 3 }}>
              Real-time AI-powered resource allocation and volunteer demand forecasting.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              padding: '6px 12px', background: 'var(--white)',
              border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)',
              fontSize: 11, color: 'var(--gray-500)', fontFamily: 'var(--font-mono)',
              boxShadow: 'var(--shadow-sm)',
            }}>Last updated: just now</div>
            <button style={{
              padding: '7px 14px', background: 'var(--navy-900)',
              border: '1px solid var(--navy-700)', borderRadius: 'var(--radius-md)',
              color: 'var(--white)', fontSize: 12,
              fontFamily: 'var(--font-display)', fontWeight: 600,
              cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 1V3M6 9V11M1 6H3M9 6H11M2.64 2.64L4.05 4.05M7.95 7.95L9.36 9.36M2.64 9.36L4.05 7.95M7.95 4.05L9.36 2.64"
                  stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <StatsBar />

      {/* ── Row 1: Prediction form + Right column ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start', marginBottom: 20 }}>
        {/* Left: form + results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <PredictionForm onResult={setResult} loading={loading} setLoading={setLoading} />
          {result && <ResultCards result={result} />}
        </div>

        {/* Right: simulation + alerts + missions + actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* ① Crisis Simulation */}
          <SimulationMode onResult={setResult} />

          <AlertPanel result={result} />
          <ActiveMissionsCard />
          <QuickActionsCard />
        </div>
      </div>

      {/* ── Row 2: Full-width India Heatmap ── */}
      <IndiaHeatmap externalResult={result} />
    </div>
  );
}

/* ── Active Missions ── */
function ActiveMissionsCard() {
  const missions = [
    { zone: 'Zone A — North', type: 'Medical',  status: 'Critical', volunteers: 42, color: '#e01f33' },
    { zone: 'Zone C — East',  type: 'Food',     status: 'High',     volunteers: 28, color: '#f59e0b' },
    { zone: 'Zone E — West',  type: 'Shelter',  status: 'Moderate', volunteers: 61, color: '#10b981' },
  ];
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--gray-200)',
      borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 18px', borderBottom: '1px solid var(--gray-100)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--navy-900)' }}>
          Active Missions
        </span>
        <span style={{ fontSize: 10, color: 'var(--navy-400)', fontFamily: 'var(--font-mono)', fontWeight: 600, cursor: 'pointer' }}>
          View all →
        </span>
      </div>
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {missions.map(m => (
          <div key={m.zone} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', background: 'var(--gray-50)',
            borderRadius: 'var(--radius-md)', border: '1px solid var(--gray-100)',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-100)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--gray-50)'}
          >
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0 }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--navy-800)' }}>{m.zone}</div>
              <div style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)' }}>
                {m.type} • {m.volunteers} volunteers
              </div>
            </div>
            <span style={{
              padding: '2px 8px', background: m.color + '15',
              border: `1px solid ${m.color}30`, borderRadius: 99,
              fontSize: 10, fontWeight: 600, color: m.color,
              fontFamily: 'var(--font-mono)',
            }}>{m.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Quick Actions ── */
function QuickActionsCard() {
  const actions = [
    { label: 'Dispatch Emergency Team', icon: '🚨', color: 'var(--red-500)',    bg: 'var(--red-50)',   border: 'rgba(224,31,51,0.2)' },
    { label: 'Request Volunteer Surge',  icon: '👥', color: 'var(--navy-500)',  bg: 'var(--navy-50)',  border: 'rgba(42,63,143,0.2)' },
    { label: 'Generate Field Report',    icon: '📋', color: 'var(--green-500)', bg: 'var(--green-50)', border: 'rgba(16,185,129,0.2)' },
  ];
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--gray-200)',
      borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)', overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--gray-100)' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--navy-900)' }}>
          Quick Actions
        </span>
      </div>
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {actions.map(a => (
          <button key={a.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '11px 14px', background: a.bg,
            border: `1px solid ${a.border}`, borderRadius: 'var(--radius-md)',
            cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.18s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateX(3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <span style={{ fontSize: 16 }}>{a.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: a.color, fontFamily: 'var(--font-display)' }}>{a.label}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12, color: a.color, opacity: 0.6 }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
