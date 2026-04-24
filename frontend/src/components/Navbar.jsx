import React from 'react';

export default function Navbar() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 'var(--navbar-h)',
      background: 'var(--navy-900)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      gap: 12,
    }}>
      {/* Logo mark */}
      <div style={{
        width: 32, height: 32,
        background: 'linear-gradient(135deg, var(--red-500), var(--red-600))',
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(224,31,51,0.4)',
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" fill="none"/>
          <circle cx="8" cy="8" r="2.5" fill="white"/>
        </svg>
      </div>

      {/* Brand */}
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700, fontSize: 17,
          color: 'var(--white)',
          letterSpacing: '-0.3px',
          lineHeight: 1.1,
        }}>
          ReliefIQ
        </div>
        <div style={{
          fontSize: 10, color: 'rgba(168,180,232,0.6)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
        }}>
          AI Crisis Resource Orchestrator
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Status pill */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 7,
        padding: '5px 12px',
        background: 'rgba(16,185,129,0.12)',
        border: '1px solid rgba(16,185,129,0.25)',
        borderRadius: 99,
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--green-400)',
          animation: 'pulse-ring 2s ease infinite',
        }} />
        <span style={{
          fontSize: 11, color: 'var(--green-400)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 500, letterSpacing: '0.5px',
        }}>Systems Operational</span>
      </div>

      {/* User avatar */}
      <div style={{
        width: 34, height: 34,
        background: 'var(--navy-600)',
        border: '2px solid rgba(255,255,255,0.1)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 700, fontSize: 12, color: 'var(--navy-100)',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
      }}>
        OP
      </div>
    </header>
  );
}
