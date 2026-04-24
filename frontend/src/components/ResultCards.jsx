import React from 'react';

function getSeverityStyle(sev = '') {
  const s = sev.toLowerCase();
  if (s === 'critical') return { bg: 'var(--red-50)', border: 'rgba(224,31,51,0.25)', text: 'var(--red-500)', dot: '#e01f33' };
  if (s === 'high')     return { bg: 'var(--amber-50)', border: 'rgba(245,158,11,0.25)', text: 'var(--amber-500)', dot: '#f59e0b' };
  return                       { bg: 'var(--green-50)', border: 'rgba(16,185,129,0.25)', text: 'var(--green-500)', dot: '#10b981' };
}

function MetricCard({ label, value, sub, accent, delay = 0, large = false }) {
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid var(--gray-200)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 20px',
        boxShadow: 'var(--shadow-sm)',
        borderTop: `3px solid ${accent}`,
        animation: `fadeUp 0.4s ease ${delay}ms both`,
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
        fontSize: 10, fontWeight: 600,
        color: 'var(--gray-400)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)',
        marginBottom: 8,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: large ? 32 : 26,
        color: 'var(--navy-900)',
        lineHeight: 1.1,
        letterSpacing: '-0.5px',
      }}>{value}</div>
      {sub && (
        <div style={{
          fontSize: 11, color: 'var(--gray-400)',
          marginTop: 5, lineHeight: 1.4,
        }}>{sub}</div>
      )}
    </div>
  );
}

export default function ResultCards({ result }) {
  if (!result) return null;
  const sevStyle = getSeverityStyle(result.severity);
  const shortage = result.shortage || 0;
  const predicted = result.predicted_volunteers || 0;
  const available = Math.max(0, predicted - shortage);
  const shortPct = predicted > 0 ? Math.round((shortage / predicted) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Top metric grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        <MetricCard
          label="Volunteers Needed"
          value={predicted.toLocaleString()}
          sub="AI-computed allocation target"
          accent="var(--navy-400)"
          delay={0}
        />
        <MetricCard
          label="Volunteer Shortage"
          value={shortage.toLocaleString()}
          sub={`${shortPct}% capacity gap`}
          accent={shortage > 0 ? 'var(--red-500)' : 'var(--green-500)'}
          delay={60}
        />
        <MetricCard
          label="People at Risk"
          value={(result.impact || 0).toLocaleString()}
          sub="Estimated individuals affected"
          accent="var(--amber-400)"
          delay={120}
        />
        <div
          style={{
            background: sevStyle.bg,
            border: `1px solid ${sevStyle.border}`,
            borderRadius: 'var(--radius-lg)',
            padding: '18px 20px',
            borderTop: `3px solid ${sevStyle.dot}`,
            animation: 'fadeUp 0.4s ease 180ms both',
            transition: 'box-shadow 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{
            fontSize: 10, fontWeight: 600,
            color: 'var(--gray-400)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            marginBottom: 8,
          }}>Severity Level</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: sevStyle.dot,
              animation: result.severity?.toLowerCase() === 'critical' ? 'pulse-ring 1.5s ease infinite' : 'none',
            }}/>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700, fontSize: 22,
              color: sevStyle.text,
            }}>{result.severity}</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>Crisis threat assessment</div>
        </div>
      </div>

      {/* Bar chart card */}
      <VolunteerBarChart predicted={predicted} available={available} shortage={shortage} />

      {/* AI Recommendation */}
      <div style={{
        background: 'var(--white)',
        border: '1px solid var(--gray-200)',
        borderRadius: 'var(--radius-lg)',
        padding: '18px 20px',
        boxShadow: 'var(--shadow-sm)',
        animation: 'fadeUp 0.4s ease 300ms both',
        borderLeft: '3px solid var(--navy-400)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
        }}>
          <div style={{
            width: 28, height: 28,
            background: 'var(--navy-50)',
            border: '1px solid var(--navy-100)',
            borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1C3.69 1 1 3.69 1 7C1 10.31 3.69 13 7 13C10.31 13 13 10.31 13 7C13 3.69 10.31 1 7 1Z" stroke="var(--navy-400)" strokeWidth="1.3"/>
              <path d="M7 6V10M7 4V4.5" stroke="var(--navy-400)" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{
            fontSize: 11, fontWeight: 600,
            color: 'var(--navy-600)',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
          }}>AI Recommendation</div>
        </div>
        <p style={{
          fontSize: 13, color: 'var(--gray-600)',
          lineHeight: 1.7,
        }}>{result.recommendation}</p>
      </div>
    </div>
  );
}

function VolunteerBarChart({ predicted, available, shortage }) {
  const max = Math.max(predicted, available) * 1.15 || 1;
  const bars = [
    { label: 'Needed', value: predicted, color: 'var(--navy-500)', lightColor: 'var(--navy-50)' },
    { label: 'Available', value: available, color: 'var(--green-500)', lightColor: 'var(--green-50)' },
    { label: 'Shortage', value: shortage, color: 'var(--red-500)', lightColor: 'var(--red-50)' },
  ];

  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--gray-200)',
      borderRadius: 'var(--radius-lg)',
      padding: '18px 20px',
      boxShadow: 'var(--shadow-sm)',
      animation: 'fadeUp 0.4s ease 240ms both',
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600,
        color: 'var(--gray-400)',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)',
        marginBottom: 16,
      }}>Volunteer Capacity Overview</div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 120 }}>
        {bars.map((bar, i) => {
          const heightPct = (bar.value / max) * 100;
          return (
            <div key={bar.label} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
              <span style={{
                fontSize: 12, fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                color: bar.color,
              }}>{bar.value.toLocaleString()}</span>
              <div style={{
                width: '100%',
                height: `${Math.max(4, heightPct)}%`,
                background: `linear-gradient(to top, ${bar.color}, ${bar.lightColor === 'var(--navy-50)' ? '#6278c4' : bar.lightColor === 'var(--green-50)' ? '#6ee7b7' : '#f9a0ab'})`,
                borderRadius: '6px 6px 2px 2px',
                transformOrigin: 'bottom',
                animation: `barGrow 0.6s ease ${i * 100 + 200}ms both`,
                transition: 'height 0.4s ease',
              }}/>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
        {bars.map(bar => (
          <div key={bar.label} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: bar.color }}/>
              <span style={{
                fontSize: 10, color: 'var(--gray-400)',
                fontFamily: 'var(--font-mono)',
              }}>{bar.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
