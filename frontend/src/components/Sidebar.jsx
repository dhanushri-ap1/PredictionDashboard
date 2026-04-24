import React from 'react';

const NAV_ITEMS = [
  {
    id: 'dashboard', label: 'Dashboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    )
  },
  {
    id: 'predictions', label: 'Predictions',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M2 12L5.5 8L8.5 10L12 5L14 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="14" cy="4" r="1.5" fill="currentColor"/>
      </svg>
    )
  },
  {
    id: 'allocation', label: 'Resource Allocation',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 2V4M8 12V14M2 8H4M12 8H14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: 'alerts', label: 'Alerts',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1L10.5 6H13.5L11 9.5L12 14L8 11.5L4 14L5 9.5L2.5 6H5.5L8 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      </svg>
    ),
    badge: 2
  },
  {
    id: 'reports', label: 'Reports',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="2" y="1" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 5H11M5 8H11M5 11H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    )
  },
];

export default function Sidebar({ active, onNav }) {
  return (
    <aside style={{
      position: 'fixed',
      top: 'var(--navbar-h)',
      left: 0,
      bottom: 0,
      width: 'var(--sidebar-w)',
      background: 'var(--navy-900)',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 12px',
      overflowY: 'auto',
    }}>
      <div style={{
        fontSize: 9, fontWeight: 600,
        color: 'rgba(168,180,232,0.35)',
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)',
        padding: '0 10px',
        marginBottom: 8,
      }}>
        Navigation
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(item => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px',
                borderRadius: 8,
                border: 'none',
                background: isActive
                  ? 'linear-gradient(90deg, rgba(224,31,51,0.15), rgba(224,31,51,0.05))'
                  : 'transparent',
                borderLeft: isActive ? '2px solid var(--red-500)' : '2px solid transparent',
                color: isActive ? 'var(--white)' : 'rgba(168,180,232,0.55)',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left',
                transition: 'all 0.18s ease',
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                fontWeight: isActive ? 500 : 400,
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = 'rgba(168,180,232,0.85)';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'rgba(168,180,232,0.55)';
                }
              }}
            >
              <span style={{ opacity: isActive ? 1 : 0.7 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  background: 'var(--red-500)',
                  color: 'white',
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: 99,
                  fontFamily: 'var(--font-mono)',
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom info */}
      <div style={{ marginTop: 'auto', padding: '16px 10px 0' }}>
        <div style={{
          padding: '12px',
          background: 'rgba(224,31,51,0.08)',
          border: '1px solid rgba(224,31,51,0.15)',
          borderRadius: 10,
        }}>
          <div style={{
            fontSize: 11, fontWeight: 600,
            color: 'var(--red-400)', marginBottom: 4,
            fontFamily: 'var(--font-display)',
          }}>
            AI Model v2.1
          </div>
          <div style={{
            fontSize: 10, color: 'rgba(168,180,232,0.45)',
            lineHeight: 1.5,
          }}>
            Crisis prediction engine active. Last trained 3 days ago.
          </div>
        </div>
      </div>
    </aside>
  );
}
