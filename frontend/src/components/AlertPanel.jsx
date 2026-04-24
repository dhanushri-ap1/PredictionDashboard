import React from 'react';

const STATIC_ALERTS = [
  {
    id: 1,
    type: 'info',
    title: 'Model Training Complete',
    detail: 'Crisis prediction model updated with latest field data.',
    time: '2 min ago',
    color: 'var(--navy-400)',
    bg: 'var(--navy-50)',
    border: 'rgba(42,63,143,0.2)',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Zone B Supply Low',
    detail: 'Medical supplies below 20% threshold in northern sector.',
    time: '18 min ago',
    color: 'var(--amber-500)',
    bg: 'var(--amber-50)',
    border: 'rgba(245,158,11,0.2)',
  },
];

export default function AlertPanel({ result }) {
  const crisisAlerts = result && result.shortage > 0 ? [
    {
      id: 'crit-1',
      type: 'critical',
      title: 'Critical Shortage Detected',
      detail: `${result.shortage.toLocaleString()} volunteers required immediately. ${result.impact?.toLocaleString()} individuals at risk.`,
      time: 'Just now',
      color: 'var(--red-500)',
      bg: 'var(--red-50)',
      border: 'rgba(224,31,51,0.2)',
      pulse: true,
    },
    {
      id: 'crit-2',
      type: 'critical',
      title: 'Immediate Intervention Required',
      detail: `Severity level: ${result.severity}. Activate emergency volunteer mobilization protocol.`,
      time: 'Just now',
      color: 'var(--red-500)',
      bg: 'var(--red-50)',
      border: 'rgba(224,31,51,0.2)',
    },
  ] : [];

  const allAlerts = [...crisisAlerts, ...STATIC_ALERTS];

  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--gray-200)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid var(--gray-100)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: '50%',
          background: crisisAlerts.length > 0 ? 'var(--red-500)' : 'var(--green-400)',
          animation: crisisAlerts.length > 0 ? 'pulse-ring 1.5s ease infinite' : 'none',
        }}/>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: 13,
          color: 'var(--navy-900)',
        }}>Risk Alert Panel</span>
        {crisisAlerts.length > 0 && (
          <span style={{
            marginLeft: 'auto',
            padding: '2px 8px',
            background: 'var(--red-500)',
            color: 'white',
            fontSize: 10, fontWeight: 700,
            borderRadius: 99,
            fontFamily: 'var(--font-mono)',
          }}>{crisisAlerts.length} CRITICAL</span>
        )}
      </div>

      {/* Alerts list */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {allAlerts.map((alert, i) => (
          <div
            key={alert.id}
            style={{
              padding: '12px 14px',
              background: alert.bg,
              border: `1px solid ${alert.border}`,
              borderRadius: 'var(--radius-md)',
              borderLeft: `3px solid ${alert.color}`,
              animation: i < crisisAlerts.length ? `fadeUp 0.4s ease ${i * 80}ms both` : 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: alert.color, flexShrink: 0,
                marginTop: 4,
                animation: alert.pulse ? 'pulse-ring 1.5s ease infinite' : 'none',
              }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontWeight: 600,
                  color: 'var(--navy-800)',
                  marginBottom: 3,
                  fontFamily: 'var(--font-display)',
                }}>{alert.title}</div>
                <div style={{
                  fontSize: 11, color: 'var(--gray-500)',
                  lineHeight: 1.5,
                }}>{alert.detail}</div>
                <div style={{
                  fontSize: 10, color: 'var(--gray-400)',
                  marginTop: 4,
                  fontFamily: 'var(--font-mono)',
                }}>{alert.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
