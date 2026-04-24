import React from 'react';

const STATS = [
  { label: 'Active Missions', value: '7', change: '+2', up: true },
  { label: 'Volunteers Deployed', value: '1,284', change: '+124', up: true },
  { label: 'People Assisted Today', value: '8,492', change: '+6.2%', up: true },
  { label: 'Zones Under Watch', value: '14', change: '-3', up: false },
  { label: 'Model Accuracy', value: '91.4%', change: '+1.1%', up: true },
];

export default function StatsBar() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: 12,
      marginBottom: 24,
    }}>
      {STATS.map((s, i) => (
        <div
          key={s.label}
          style={{
            background: 'var(--white)',
            border: '1px solid var(--gray-200)',
            borderRadius: 'var(--radius-lg)',
            padding: '14px 16px',
            boxShadow: 'var(--shadow-sm)',
            animation: `fadeUp 0.35s ease ${i * 50}ms both`,
            transition: 'box-shadow 0.2s, transform 0.2s',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{
            fontSize: 9, fontWeight: 600,
            color: 'var(--gray-400)',
            letterSpacing: '0.9px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            marginBottom: 6,
          }}>{s.label}</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800, fontSize: 20,
            color: 'var(--navy-900)',
            letterSpacing: '-0.5px',
          }}>{s.value}</div>
          <div style={{
            fontSize: 10, fontFamily: 'var(--font-mono)',
            color: s.up ? 'var(--green-500)' : 'var(--red-500)',
            marginTop: 3,
          }}>
            {s.up ? '↑' : '↓'} {s.change} today
          </div>
        </div>
      ))}
    </div>
  );
}
