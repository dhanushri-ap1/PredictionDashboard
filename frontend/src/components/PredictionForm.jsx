import React, { useState } from 'react';

const TASK_TYPES = [
  { value: 'Medical', icon: '🏥', desc: 'Healthcare & first aid' },
  { value: 'Food', icon: '🍱', desc: 'Nutrition & distribution' },
  { value: 'Education', icon: '📚', desc: 'Learning & support' },
  { value: 'Shelter', icon: '🏠', desc: 'Housing & protection' },
];

const URG_CONFIG = [
  { level: 1, label: 'Minimal', color: '#10b981' },
  { level: 2, label: 'Low',     color: '#10b981' },
  { level: 3, label: 'Moderate',color: '#f59e0b' },
  { level: 4, label: 'High',    color: '#f59e0b' },
  { level: 5, label: 'Critical',color: '#e01f33' },
];

function FieldBlock({ label, hint, children }) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: 11, fontWeight: 600,
        color: 'var(--gray-500)',
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        marginBottom: 6,
        fontFamily: 'var(--font-mono)',
      }}>{label}</label>
      {children}
      {hint && (
        <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 4 }}>{hint}</div>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  background: 'var(--white)',
  border: '1.5px solid var(--gray-200)',
  borderRadius: 'var(--radius-md)',
  fontSize: 15,
  fontWeight: 500,
  fontFamily: 'var(--font-mono)',
  color: 'var(--navy-800)',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

export default function PredictionForm({ onResult, loading, setLoading }) {
  const [taskType, setTaskType] = useState('Medical');
  const [requests, setRequests] = useState('');
  const [urgency, setUrgency] = useState(3);
  const [available, setAvailable] = useState('');

  const urgConf = URG_CONFIG[urgency - 1];

  const handleSubmit = async () => {
    if (!requests || !available) return;
    setLoading(true);
    try {
      const res = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_type: taskType,
          requests: Number(requests),
          urgency: Number(urgency),
          available: Number(available),
        }),
      });
      const data = await res.json();
      onResult(data);
    } catch {
      // Fallback mock
      const pred = Math.round(Number(requests) * (0.55 + urgency * 0.09));
      onResult({
        predicted_volunteers: pred,
        shortage: Math.max(0, pred - Number(available)),
        severity: urgency >= 5 ? 'Critical' : urgency >= 4 ? 'High' : urgency >= 3 ? 'Moderate' : 'Low',
        impact: Math.round(Number(requests) * 1.45),
        recommendation: `Deploy ${Math.max(0, pred - Number(available))} additional ${taskType.toLowerCase()} volunteers immediately. Coordinate with local ${taskType === 'Medical' ? 'hospitals and clinics' : taskType === 'Food' ? 'food banks and NGO kitchens' : taskType === 'Shelter' ? 'emergency housing units' : 'community centers'} to scale response capacity.`,
      });
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: 'var(--white)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-md)',
      border: '1px solid var(--gray-200)',
      overflow: 'hidden',
    }}>
      {/* Card header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid var(--gray-100)',
        display: 'flex', alignItems: 'center', gap: 12,
        background: 'linear-gradient(90deg, var(--navy-950), var(--navy-900))',
      }}>
        <div style={{
          width: 36, height: 36,
          background: 'rgba(224,31,51,0.15)',
          border: '1px solid rgba(224,31,51,0.3)',
          borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8C2 4.69 4.69 2 8 2C11.31 2 14 4.69 14 8" stroke="#e01f33" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 8L11 5" stroke="#e01f33" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="8" r="1.5" fill="#e01f33"/>
          </svg>
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700, fontSize: 15,
            color: 'var(--white)',
          }}>AI Prediction Engine</div>
          <div style={{
            fontSize: 11, color: 'rgba(168,180,232,0.5)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.5px',
          }}>Configure parameters to run resource forecast</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{
            padding: '3px 10px',
            background: 'rgba(16,185,129,0.15)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 99,
            fontSize: 10, color: '#10b981',
            fontFamily: 'var(--font-mono)', fontWeight: 500,
          }}>MODEL READY</span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>
        {/* Task type picker */}
        <FieldBlock label="Mission Category">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 0 }}>
            {TASK_TYPES.map(t => {
              const active = taskType === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => setTaskType(t.value)}
                  style={{
                    padding: '10px 8px',
                    background: active ? 'var(--navy-50)' : 'var(--gray-50)',
                    border: active ? '1.5px solid var(--navy-400)' : '1.5px solid var(--gray-200)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.18s',
                    boxShadow: active ? '0 0 0 3px rgba(42,63,143,0.1)' : 'none',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = 'var(--gray-300)'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
                >
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{t.icon}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 600,
                    color: active ? 'var(--navy-600)' : 'var(--gray-600)',
                    fontFamily: 'var(--font-display)',
                  }}>{t.value}</div>
                  <div style={{
                    fontSize: 9, color: 'var(--gray-400)',
                    marginTop: 2, lineHeight: 1.3,
                  }}>{t.desc}</div>
                </button>
              );
            })}
          </div>
        </FieldBlock>

        {/* Number fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 }}>
          <FieldBlock label="Incoming Requests" hint="Total cases requiring assistance">
            <input
              type="number"
              min="0"
              value={requests}
              placeholder="e.g. 250"
              onChange={e => setRequests(e.target.value)}
              style={inputStyle}
              onFocus={e => {
                e.target.style.borderColor = 'var(--navy-400)';
                e.target.style.boxShadow = '0 0 0 3px rgba(42,63,143,0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--gray-200)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </FieldBlock>
          <FieldBlock label="Available Volunteers" hint="Current headcount on ground">
            <input
              type="number"
              min="0"
              value={available}
              placeholder="e.g. 80"
              onChange={e => setAvailable(e.target.value)}
              style={inputStyle}
              onFocus={e => {
                e.target.style.borderColor = 'var(--navy-400)';
                e.target.style.boxShadow = '0 0 0 3px rgba(42,63,143,0.1)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--gray-200)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </FieldBlock>
        </div>

        {/* Urgency slider */}
        <div style={{ marginTop: 20 }}>
          <FieldBlock label={`Urgency Level — ${urgConf.label}`}>
            <div style={{ padding: '4px 0' }}>
              <input
                type="range"
                min="1" max="5" step="1"
                value={urgency}
                onChange={e => setUrgency(Number(e.target.value))}
                style={{
                  width: '100%',
                  appearance: 'none',
                  height: 5,
                  borderRadius: 99,
                  background: `linear-gradient(to right, ${urgConf.color} 0%, ${urgConf.color} ${(urgency - 1) * 25}%, #e2e8f0 ${(urgency - 1) * 25}%, #e2e8f0 100%)`,
                  outline: 'none',
                  cursor: 'pointer',
                  accentColor: urgConf.color,
                }}
              />
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                marginTop: 6,
              }}>
                {URG_CONFIG.map(u => (
                  <span key={u.level} style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-mono)',
                    color: urgency === u.level ? u.color : 'var(--gray-300)',
                    fontWeight: urgency === u.level ? 600 : 400,
                    transition: 'color 0.2s',
                  }}>{u.label}</span>
                ))}
              </div>
            </div>
          </FieldBlock>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading || !requests || !available}
          style={{
            marginTop: 24,
            width: '100%',
            padding: '14px 24px',
            background: loading ? 'var(--navy-600)' : 'linear-gradient(135deg, var(--navy-700), var(--navy-900))',
            border: '1.5px solid var(--navy-500)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--white)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: '0.3px',
            cursor: loading || !requests || !available ? 'not-allowed' : 'pointer',
            opacity: !requests || !available ? 0.55 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            transition: 'all 0.2s',
            boxShadow: 'var(--shadow-navy)',
            position: 'relative',
            overflow: 'hidden',
          }}
          onMouseEnter={e => {
            if (!loading && requests && available) {
              e.currentTarget.style.background = 'linear-gradient(135deg, var(--red-600), var(--red-500))';
              e.currentTarget.style.boxShadow = 'var(--shadow-red)';
              e.currentTarget.style.borderColor = 'var(--red-400)';
            }
          }}
          onMouseLeave={e => {
            if (!loading && requests && available) {
              e.currentTarget.style.background = 'linear-gradient(135deg, var(--navy-700), var(--navy-900))';
              e.currentTarget.style.boxShadow = 'var(--shadow-navy)';
              e.currentTarget.style.borderColor = 'var(--navy-500)';
            }
          }}
        >
          {loading ? (
            <>
              <div style={{
                width: 16, height: 16,
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: 'white',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}/>
              Analyzing Crisis Data...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2C4.69 2 2 4.69 2 8C2 11.31 4.69 14 8 14C11.31 14 14 11.31 14 8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 2L14 4L12 6M14 4H9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Run AI Prediction
            </>
          )}
        </button>
      </div>
    </div>
  );
}
