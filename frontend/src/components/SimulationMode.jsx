import React, { useState, useEffect, useRef } from 'react';

const SCENARIOS = [
  { label: 'Flood — Zone A', taskType: 'Medical',   requests: 80,  urgency: 2, available: 60 },
  { label: 'Flood — Zone A', taskType: 'Medical',   requests: 140, urgency: 3, available: 60 },
  { label: 'Flood — Zone A', taskType: 'Medical',   requests: 210, urgency: 4, available: 60 },
  { label: 'Flood — Zone A', taskType: 'Medical',   requests: 300, urgency: 5, available: 60 },
  { label: 'Flood — Zone A', taskType: 'Shelter',   requests: 350, urgency: 5, available: 40 },
  { label: 'Multi-Zone',     taskType: 'Food',      requests: 420, urgency: 5, available: 35 },
];

const TICK_MS = 2800;

function getMockResult(step) {
  const s = SCENARIOS[Math.min(step, SCENARIOS.length - 1)];
  const pred = Math.round(s.requests * (0.55 + s.urgency * 0.09));
  const shortage = Math.max(0, pred - s.available);
  const sev = s.urgency >= 5 ? 'Critical' : s.urgency >= 4 ? 'High' : s.urgency >= 3 ? 'Moderate' : 'Low';
  return {
    ...s,
    predicted_volunteers: pred,
    shortage,
    severity: sev,
    impact: Math.round(s.requests * 1.45),
    recommendation: shortage > 0
      ? `Mobilize ${shortage} additional ${s.taskType.toLowerCase()} volunteers to ${s.label}. Escalation in progress.`
      : 'Current allocation sufficient. Continue monitoring.',
    step,
  };
}

export default function SimulationMode({ onResult, onStop }) {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [log, setLog] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const timerRef = useRef(null);
  const logRef = useRef(null);

  const start = () => {
    setRunning(true);
    setStep(0);
    setLog([]);
    setElapsed(0);

    // elapsed counter
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);

    // step ticker
    let currentStep = 0;
    const tick = () => {
      const result = getMockResult(currentStep);
      onResult(result);
      setLog(prev => [{
        time: new Date().toLocaleTimeString(),
        label: result.label,
        sev: result.severity,
        shortage: result.shortage,
        step: currentStep,
      }, ...prev].slice(0, 8));
      setStep(currentStep);
      currentStep++;
      if (currentStep >= SCENARIOS.length) {
        stop();
      }
    };
    tick(); // immediate first tick
    intervalRef.current = setInterval(tick, TICK_MS);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    clearInterval(timerRef.current);
    setRunning(false);
    if (onStop) onStop();
  };

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = 0;
  }, [log]);

  useEffect(() => () => { clearInterval(intervalRef.current); clearInterval(timerRef.current); }, []);

  const sevColor = s => s === 'Critical' ? '#e01f33' : s === 'High' ? '#f59e0b' : s === 'Moderate' ? '#3b82f6' : '#10b981';
  const progress = Math.min(100, Math.round((step / (SCENARIOS.length - 1)) * 100));

  return (
    <div style={{
      background: running
        ? 'linear-gradient(135deg, #0c0f1e, #12091a)'
        : 'linear-gradient(135deg, var(--navy-950), var(--navy-900))',
      border: running ? '1.5px solid rgba(224,31,51,0.4)' : '1px solid rgba(255,255,255,0.08)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: running ? '0 0 40px rgba(224,31,51,0.12)' : 'var(--shadow-md)',
      transition: 'all 0.4s ease',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 18px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          background: running ? '#e01f33' : '#475569',
          boxShadow: running ? '0 0 0 3px rgba(224,31,51,0.25)' : 'none',
          animation: running ? 'pulse-ring 1.2s ease infinite' : 'none',
          flexShrink: 0,
        }}/>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
          color: running ? '#fff' : 'rgba(168,180,232,0.7)',
        }}>
          Crisis Simulation Mode
        </span>
        {running && (
          <span style={{
            marginLeft: 'auto',
            fontSize: 10, fontFamily: 'var(--font-mono)',
            color: '#e01f33', fontWeight: 600,
          }}>
            ⏱ {elapsed}s LIVE
          </span>
        )}
      </div>

      <div style={{ padding: '16px 18px' }}>
        {/* Description */}
        {!running && (
          <p style={{
            fontSize: 12, color: 'rgba(168,180,232,0.5)',
            lineHeight: 1.6, marginBottom: 14,
          }}>
            Simulates a real-time worsening crisis scenario — watch the AI predict escalating resource shortages across 6 stages automatically.
          </p>
        )}

        {/* Progress bar (while running) */}
        {running && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: 'rgba(168,180,232,0.5)', fontFamily: 'var(--font-mono)' }}>
                SCENARIO STAGE {step + 1}/{SCENARIOS.length}
              </span>
              <span style={{ fontSize: 10, color: '#e01f33', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {progress}% escalated
              </span>
            </div>
            <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 99 }}>
              <div style={{
                height: '100%', borderRadius: 99,
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #3b82f6, #f59e0b, #e01f33)',
                transition: 'width 0.6s ease',
              }}/>
            </div>
          </div>
        )}

        {/* Button */}
        <button
          onClick={running ? stop : start}
          style={{
            width: '100%', padding: '11px 18px',
            background: running
              ? 'rgba(224,31,51,0.15)'
              : 'linear-gradient(135deg, #e01f33, #c0192c)',
            border: running ? '1px solid rgba(224,31,51,0.4)' : '1px solid rgba(224,31,51,0.3)',
            borderRadius: 'var(--radius-md)',
            color: running ? '#f9a0ab' : 'white',
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            transition: 'all 0.2s',
            boxShadow: running ? 'none' : '0 4px 14px rgba(224,31,51,0.3)',
          }}
          onMouseEnter={e => { if (!running) e.currentTarget.style.boxShadow = '0 4px 24px rgba(224,31,51,0.5)'; }}
          onMouseLeave={e => { if (!running) e.currentTarget.style.boxShadow = '0 4px 14px rgba(224,31,51,0.3)'; }}
        >
          {running ? (
            <>
              <div style={{
                width: 12, height: 12,
                border: '2px solid rgba(249,160,171,0.4)',
                borderTopColor: '#f9a0ab',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}/>
              Stop Simulation
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <polygon points="3,2 11,7 3,12" fill="white"/>
              </svg>
              Simulate Crisis Escalation
            </>
          )}
        </button>

        {/* Event log */}
        {log.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{
              fontSize: 9, fontWeight: 600, color: 'rgba(168,180,232,0.35)',
              letterSpacing: '1.2px', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)', marginBottom: 8,
            }}>LIVE EVENT LOG</div>
            <div ref={logRef} style={{
              display: 'flex', flexDirection: 'column', gap: 5,
              maxHeight: 160, overflowY: 'auto',
            }}>
              {log.map((entry, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px',
                  background: i === 0 ? 'rgba(255,255,255,0.05)' : 'transparent',
                  borderRadius: 6,
                  animation: i === 0 ? 'fadeUp 0.3s ease both' : 'none',
                }}>
                  <span style={{
                    fontSize: 9, color: 'rgba(168,180,232,0.35)',
                    fontFamily: 'var(--font-mono)', flexShrink: 0,
                  }}>{entry.time}</span>
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: sevColor(entry.sev), flexShrink: 0,
                  }}/>
                  <span style={{ fontSize: 11, color: 'rgba(226,232,240,0.7)', flex: 1 }}>
                    {entry.label} — shortage <strong style={{ color: sevColor(entry.sev) }}>{entry.shortage}</strong>
                  </span>
                  <span style={{
                    fontSize: 9, padding: '1px 6px', borderRadius: 4,
                    background: sevColor(entry.sev) + '20',
                    color: sevColor(entry.sev),
                    fontFamily: 'var(--font-mono)', fontWeight: 600, flexShrink: 0,
                  }}>{entry.sev}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
