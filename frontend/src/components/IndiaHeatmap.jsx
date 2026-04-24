import React, { useState } from 'react';

// Simplified India zone map using SVG paths
// Each zone represents a region of India
const ZONES = [
  {
    id: 'north',
    label: 'North India',
    states: 'J&K, Punjab, UP, Delhi',
    cx: 220, cy: 130,
    r: 52,
    volunteers: 42,
    needed: 60,
    type: 'Medical',
    severity: 'Critical',
    incidents: 14,
  },
  {
    id: 'west',
    label: 'West India',
    states: 'Gujarat, Rajasthan, Maharashtra',
    cx: 140, cy: 240,
    r: 48,
    volunteers: 80,
    needed: 75,
    type: 'Shelter',
    severity: 'Stable',
    incidents: 5,
  },
  {
    id: 'central',
    label: 'Central India',
    states: 'MP, Chhattisgarh',
    cx: 240, cy: 250,
    r: 44,
    volunteers: 28,
    needed: 50,
    type: 'Food',
    severity: 'High',
    incidents: 9,
  },
  {
    id: 'east',
    label: 'East India',
    states: 'WB, Odisha, Bihar, Jharkhand',
    cx: 330, cy: 220,
    r: 46,
    volunteers: 55,
    needed: 55,
    type: 'Education',
    severity: 'Stable',
    incidents: 3,
  },
  {
    id: 'south',
    label: 'South India',
    states: 'TN, Kerala, Karnataka, AP',
    cx: 230, cy: 360,
    r: 50,
    volunteers: 61,
    needed: 70,
    type: 'Medical',
    severity: 'Moderate',
    incidents: 7,
  },
  {
    id: 'northeast',
    label: 'North East',
    states: 'Assam, Meghalaya, Manipur',
    cx: 380, cy: 155,
    r: 36,
    volunteers: 18,
    needed: 30,
    type: 'Food',
    severity: 'High',
    incidents: 6,
  },
];

const SEV_COLORS = {
  Critical: { fill: '#e01f33', stroke: '#c0192c', glow: 'rgba(224,31,51,0.35)', text: '#e01f33' },
  High:     { fill: '#f59e0b', stroke: '#d97706', glow: 'rgba(245,158,11,0.3)',  text: '#d97706' },
  Moderate: { fill: '#3b82f6', stroke: '#2563eb', glow: 'rgba(59,130,246,0.3)',  text: '#2563eb' },
  Stable:   { fill: '#10b981', stroke: '#059669', glow: 'rgba(16,185,129,0.25)', text: '#059669' },
};

export default function IndiaHeatmap({ externalResult }) {
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);

  // If external prediction result targets a specific severity, highlight accordingly
  const getZoneSeverity = (zone) => {
    if (externalResult && zone.id === 'north') return externalResult.severity || zone.severity;
    return zone.severity;
  };

  const activeZone = selected || hovered;
  const zoneData = activeZone ? ZONES.find(z => z.id === activeZone) : null;

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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'var(--navy-900)' }}>
            Crisis Zone Heatmap — India
          </span>
        </div>
        {/* Legend */}
        <div style={{ display: 'flex', gap: 10 }}>
          {Object.entries(SEV_COLORS).map(([sev, cfg]) => (
            <div key={sev} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: cfg.fill }}/>
              <span style={{ fontSize: 9, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)' }}>{sev}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 0 }}>
        {/* SVG Map */}
        <div style={{ flex: 1, padding: '10px 0 10px 10px', position: 'relative' }}>
          <svg
            viewBox="0 0 480 470"
            style={{ width: '100%', maxHeight: 320, display: 'block' }}
          >
            {/* India rough outline (simplified decorative) */}
            <path
              d="M160,60 L290,55 L360,80 L400,130 L410,160 L390,180 L380,210 L360,230 L350,260 L340,290 L300,320 L270,370 L250,420 L230,440 L210,420 L190,370 L170,320 L130,280 L100,240 L90,200 L100,160 L120,120 L140,90 Z"
              fill="rgba(248,250,252,0.6)"
              stroke="var(--gray-200)"
              strokeWidth="1.5"
            />

            {/* Grid lines (subtle) */}
            {[100, 160, 220, 280, 340, 400].map(x => (
              <line key={x} x1={x} y1="50" x2={x} y2="450" stroke="var(--gray-100)" strokeWidth="0.5"/>
            ))}
            {[80, 140, 200, 260, 320, 380, 440].map(y => (
              <line key={y} x1="60" y1={y} x2="440" y2={y} stroke="var(--gray-100)" strokeWidth="0.5"/>
            ))}

            {/* Zones */}
            {ZONES.map(zone => {
              const sev = getZoneSeverity(zone);
              const cfg = SEV_COLORS[sev] || SEV_COLORS.Stable;
              const isActive = activeZone === zone.id;
              const fillPct = zone.volunteers / zone.needed;

              return (
                <g key={zone.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelected(selected === zone.id ? null : zone.id)}
                  onMouseEnter={() => setHovered(zone.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Glow ring */}
                  {isActive && (
                    <circle
                      cx={zone.cx} cy={zone.cy}
                      r={zone.r + 10}
                      fill={cfg.glow}
                      style={{ animation: 'pulse-ring 1.5s ease infinite' }}
                    />
                  )}

                  {/* Outer pulse ring for critical */}
                  {sev === 'Critical' && (
                    <circle
                      cx={zone.cx} cy={zone.cy}
                      r={zone.r + 6}
                      fill="none"
                      stroke={cfg.stroke}
                      strokeWidth="1"
                      opacity="0.4"
                      style={{ animation: 'pulse-ring 2s ease infinite' }}
                    />
                  )}

                  {/* Main circle */}
                  <circle
                    cx={zone.cx} cy={zone.cy} r={zone.r}
                    fill={cfg.fill + (isActive ? 'dd' : '22')}
                    stroke={cfg.stroke}
                    strokeWidth={isActive ? 2 : 1.5}
                    style={{ transition: 'all 0.2s' }}
                  />

                  {/* Fill level arc */}
                  <circle
                    cx={zone.cx} cy={zone.cy} r={zone.r - 8}
                    fill="none"
                    stroke={cfg.fill}
                    strokeWidth="3"
                    strokeDasharray={`${Math.PI * 2 * (zone.r - 8) * Math.min(1, fillPct)} ${Math.PI * 2 * (zone.r - 8)}`}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${zone.cx} ${zone.cy})`}
                    opacity="0.7"
                  />

                  {/* Label */}
                  <text
                    x={zone.cx} y={zone.cy - 6}
                    textAnchor="middle"
                    style={{
                      fontSize: 10, fontWeight: 700,
                      fill: isActive ? 'white' : cfg.stroke,
                      fontFamily: 'var(--font-display)',
                      pointerEvents: 'none',
                    }}
                  >
                    {zone.label.split(' ')[0]}
                  </text>
                  <text
                    x={zone.cx} y={zone.cy + 8}
                    textAnchor="middle"
                    style={{
                      fontSize: 9,
                      fill: isActive ? 'rgba(255,255,255,0.8)' : 'rgba(71,85,105,0.7)',
                      fontFamily: 'var(--font-mono)',
                      pointerEvents: 'none',
                    }}
                  >
                    {zone.volunteers}/{zone.needed}
                  </text>
                  <text
                    x={zone.cx} y={zone.cy + 20}
                    textAnchor="middle"
                    style={{
                      fontSize: 8,
                      fill: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(71,85,105,0.5)',
                      fontFamily: 'var(--font-mono)',
                      pointerEvents: 'none',
                    }}
                  >
                    {sev}
                  </text>
                </g>
              );
            })}

            {/* Compass rose */}
            <g transform="translate(440, 80)">
              <text x="0" y="-14" textAnchor="middle" style={{ fontSize: 9, fill: 'var(--gray-300)', fontFamily: 'var(--font-mono)' }}>N</text>
              <line x1="0" y1="-10" x2="0" y2="10" stroke="var(--gray-200)" strokeWidth="1"/>
              <line x1="-10" y1="0" x2="10" y2="0" stroke="var(--gray-200)" strokeWidth="1"/>
              <circle cx="0" cy="0" r="2" fill="var(--gray-300)"/>
            </g>
          </svg>
        </div>

        {/* Zone detail panel */}
        <div style={{
          width: 180, borderLeft: '1px solid var(--gray-100)',
          padding: '14px 14px',
          display: 'flex', flexDirection: 'column', gap: 10,
          background: 'var(--gray-50)',
        }}>
          {zoneData ? (
            <ZoneDetail zone={zoneData} sev={getZoneSeverity(zoneData)} />
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 20 }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🗺️</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)', lineHeight: 1.5 }}>
                Click or hover a zone to see details
              </div>
            </div>
          )}

          {/* Mini legend — all zones */}
          <div style={{ marginTop: 'auto' }}>
            <div style={{
              fontSize: 9, fontWeight: 600, color: 'var(--gray-400)',
              letterSpacing: '1px', textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)', marginBottom: 7,
            }}>ALL ZONES</div>
            {ZONES.map(z => {
              const sev = getZoneSeverity(z);
              const cfg = SEV_COLORS[sev] || SEV_COLORS.Stable;
              return (
                <div key={z.id} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '4px 6px',
                  borderRadius: 5,
                  background: activeZone === z.id ? cfg.fill + '15' : 'transparent',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onClick={() => setSelected(selected === z.id ? null : z.id)}
                >
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: cfg.fill, flexShrink: 0 }}/>
                  <span style={{ fontSize: 10, color: 'var(--navy-700)', flex: 1 }}>{z.label.split(' ')[0]}</span>
                  <span style={{ fontSize: 9, color: cfg.text, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    {z.volunteers}/{z.needed}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ZoneDetail({ zone, sev }) {
  const cfg = SEV_COLORS[sev] || SEV_COLORS.Stable;
  const pct = Math.round((zone.volunteers / zone.needed) * 100);

  return (
    <div style={{ animation: 'fadeUp 0.2s ease both' }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13,
          color: 'var(--navy-900)', marginBottom: 2,
        }}>{zone.label}</div>
        <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>{zone.states}</div>
      </div>

      <span style={{
        display: 'inline-block',
        padding: '2px 8px', borderRadius: 99,
        fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-mono)',
        background: cfg.fill + '20', border: `1px solid ${cfg.fill}40`,
        color: cfg.text, marginBottom: 12,
      }}>{sev.toUpperCase()}</span>

      {[
        { label: 'Mission Type', value: zone.type },
        { label: 'Volunteers', value: `${zone.volunteers} / ${zone.needed}` },
        { label: 'Active Incidents', value: String(zone.incidents) },
      ].map(item => (
        <div key={item.label} style={{ marginBottom: 8 }}>
          <div style={{
            fontSize: 9, fontWeight: 600, color: 'var(--gray-400)',
            letterSpacing: '0.8px', textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)', marginBottom: 3,
          }}>{item.label}</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy-800)', fontFamily: 'var(--font-mono)' }}>
            {item.value}
          </div>
        </div>
      ))}

      {/* Volunteer bar */}
      <div style={{ marginTop: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 9, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)' }}>COVERAGE</span>
          <span style={{
            fontSize: 9, fontWeight: 700, fontFamily: 'var(--font-mono)',
            color: pct >= 100 ? '#10b981' : pct >= 70 ? '#f59e0b' : '#e01f33',
          }}>{pct}%</span>
        </div>
        <div style={{ height: 4, background: 'var(--gray-200)', borderRadius: 99 }}>
          <div style={{
            height: '100%', borderRadius: 99,
            width: `${Math.min(100, pct)}%`,
            background: pct >= 100 ? '#10b981' : pct >= 70 ? '#f59e0b' : '#e01f33',
            transition: 'width 0.5s ease',
          }}/>
        </div>
      </div>
    </div>
  );
}
