import React from 'react';

/* ── Shared page shell ── */
function PageShell({ title, subtitle, children }) {
  return (
    <div>
      <div style={{ marginBottom: 24, animation: 'fadeUp 0.3s ease both' }}>
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
        }}>{title}</h1>
        <p style={{ color: 'var(--gray-500)', fontSize: 13, marginTop: 3 }}>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function EmptyCard({ icon, label, desc }) {
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--gray-200)',
      borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)',
      padding: '60px 40px', textAlign: 'center',
      animation: 'fadeUp 0.4s ease both',
    }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18,
        color: 'var(--navy-900)', marginBottom: 8,
      }}>{label}</div>
      <div style={{ fontSize: 13, color: 'var(--gray-400)', maxWidth: 320, margin: '0 auto' }}>{desc}</div>
    </div>
  );
}

/* ── Stat chip ── */
function Chip({ label, value, color }) {
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--gray-200)',
      borderRadius: 'var(--radius-lg)', padding: '16px 20px',
      boxShadow: 'var(--shadow-sm)', borderTop: `3px solid ${color}`,
      animation: 'fadeUp 0.4s ease both',
    }}>
      <div style={{
        fontSize: 9, fontWeight: 600, color: 'var(--gray-400)',
        letterSpacing: '1px', textTransform: 'uppercase',
        fontFamily: 'var(--font-mono)', marginBottom: 6,
      }}>{label}</div>
      <div style={{
        fontFamily: 'var(--font-display)', fontWeight: 800,
        fontSize: 22, color: 'var(--navy-900)',
      }}>{value}</div>
    </div>
  );
}

/* ══════════════════════════════════════
   PREDICTIONS PAGE
══════════════════════════════════════ */
export function PredictionsPage() {
  const history = [
    { date: 'Apr 23', zone: 'Zone A', type: 'Medical',   predicted: 120, actual: 113, severity: 'High' },
    { date: 'Apr 22', zone: 'Zone C', type: 'Food',      predicted: 85,  actual: 90,  severity: 'Moderate' },
    { date: 'Apr 21', zone: 'Zone B', type: 'Shelter',   predicted: 200, actual: 195, severity: 'Critical' },
    { date: 'Apr 20', zone: 'Zone D', type: 'Education', predicted: 60,  actual: 58,  severity: 'Low' },
    { date: 'Apr 19', zone: 'Zone A', type: 'Medical',   predicted: 145, actual: 140, severity: 'High' },
    { date: 'Apr 18', zone: 'Zone E', type: 'Food',      predicted: 95,  actual: 102, severity: 'Moderate' },
  ];

  const sevColor = s => s === 'Critical' ? '#e01f33' : s === 'High' ? '#f59e0b' : s === 'Moderate' ? '#3b82f6' : '#10b981';

  return (
    <PageShell title="Prediction History" subtitle="Review past AI forecasts and their accuracy against actual field data.">
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        <Chip label="Total Predictions" value="248"     color="var(--navy-400)" />
        <Chip label="Avg Accuracy"      value="91.4%"   color="var(--green-400)" />
        <Chip label="Avg Error Rate"    value="±4.2%"   color="var(--amber-400)" />
        <Chip label="Critical Calls"    value="34"      color="var(--red-500)" />
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--white)', border: '1px solid var(--gray-200)',
        borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)',
        overflow: 'hidden', animation: 'fadeUp 0.4s ease 100ms both',
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--gray-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--navy-900)' }}>
            Recent Prediction Logs
          </span>
          <span style={{
            fontSize: 10, color: 'var(--gray-400)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.5px',
          }}>Showing last 6 entries</span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)' }}>
              {['Date','Zone','Type','Predicted','Actual','Accuracy','Severity'].map(h => (
                <th key={h} style={{
                  padding: '10px 16px', textAlign: 'left',
                  fontSize: 9, fontWeight: 600, color: 'var(--gray-400)',
                  letterSpacing: '1px', textTransform: 'uppercase',
                  fontFamily: 'var(--font-mono)',
                  borderBottom: '1px solid var(--gray-100)',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((r, i) => {
              const acc = Math.round((1 - Math.abs(r.predicted - r.actual) / r.predicted) * 100);
              return (
                <tr key={i} style={{ borderBottom: '1px solid var(--gray-100)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '12px 16px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--gray-500)' }}>{r.date}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 500, color: 'var(--navy-800)' }}>{r.zone}</td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--gray-600)' }}>{r.type}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--navy-700)' }}>{r.predicted}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--navy-700)' }}>{r.actual}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)',
                      color: acc >= 95 ? 'var(--green-500)' : acc >= 88 ? 'var(--amber-500)' : 'var(--red-500)',
                    }}>{acc}%</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 99,
                      fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-mono)',
                      background: sevColor(r.severity) + '18',
                      border: `1px solid ${sevColor(r.severity)}33`,
                      color: sevColor(r.severity),
                    }}>{r.severity}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </PageShell>
  );
}

/* ══════════════════════════════════════
   RESOURCE ALLOCATION PAGE
══════════════════════════════════════ */
export function AllocationPage() {
  const zones = [
    { zone: 'Zone A — North', type: 'Medical',   volunteers: 42, needed: 60,  supplies: 68, status: 'Critical' },
    { zone: 'Zone B — South', type: 'Shelter',   volunteers: 80, needed: 75,  supplies: 90, status: 'Stable'   },
    { zone: 'Zone C — East',  type: 'Food',      volunteers: 28, needed: 50,  supplies: 45, status: 'High'     },
    { zone: 'Zone D — West',  type: 'Education', volunteers: 55, needed: 55,  supplies: 100,status: 'Stable'   },
    { zone: 'Zone E — Central',type:'Medical',   volunteers: 61, needed: 70,  supplies: 80, status: 'Moderate' },
  ];

  const statusColor = s => s === 'Critical' ? '#e01f33' : s === 'High' ? '#f59e0b' : s === 'Moderate' ? '#3b82f6' : '#10b981';

  return (
    <PageShell title="Resource Allocation" subtitle="Live view of volunteer deployment and supply distribution across all active zones.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        <Chip label="Total Volunteers"  value="266"   color="var(--navy-400)" />
        <Chip label="Zones Active"      value="5"     color="var(--green-400)" />
        <Chip label="Under-staffed"     value="2"     color="var(--red-500)" />
        <Chip label="Supply Coverage"   value="76.6%" color="var(--amber-400)" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {zones.map((z, i) => {
          const fillPct = Math.min(100, Math.round((z.volunteers / z.needed) * 100));
          const col = statusColor(z.status);
          return (
            <div key={i} style={{
              background: 'var(--white)', border: '1px solid var(--gray-200)',
              borderRadius: 'var(--radius-lg)', padding: '18px 20px',
              boxShadow: 'var(--shadow-sm)',
              animation: `fadeUp 0.4s ease ${i * 60}ms both`,
              borderLeft: `3px solid ${col}`,
              transition: 'box-shadow 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateX(3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; e.currentTarget.style.transform = 'translateX(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--navy-900)' }}>{z.zone}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 2 }}>{z.type} operations</div>
                </div>
                <span style={{
                  padding: '3px 10px', borderRadius: 99,
                  fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-mono)',
                  background: col + '15', border: `1px solid ${col}30`, color: col,
                }}>{z.status}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {/* Volunteer bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)' }}>VOLUNTEERS</span>
                    <span style={{ fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-mono)', color: fillPct >= 100 ? '#10b981' : fillPct >= 70 ? '#f59e0b' : '#e01f33' }}>
                      {z.volunteers}/{z.needed}
                    </span>
                  </div>
                  <div style={{ height: 6, background: 'var(--gray-100)', borderRadius: 99 }}>
                    <div style={{
                      height: '100%', borderRadius: 99,
                      width: `${fillPct}%`,
                      background: fillPct >= 100 ? '#10b981' : fillPct >= 70 ? '#f59e0b' : '#e01f33',
                      transition: 'width 0.6s ease',
                    }}/>
                  </div>
                </div>
                {/* Supply bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)' }}>SUPPLIES</span>
                    <span style={{ fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-mono)', color: z.supplies >= 80 ? '#10b981' : z.supplies >= 50 ? '#f59e0b' : '#e01f33' }}>
                      {z.supplies}%
                    </span>
                  </div>
                  <div style={{ height: 6, background: 'var(--gray-100)', borderRadius: 99 }}>
                    <div style={{
                      height: '100%', borderRadius: 99,
                      width: `${z.supplies}%`,
                      background: z.supplies >= 80 ? '#10b981' : z.supplies >= 50 ? '#f59e0b' : '#e01f33',
                      transition: 'width 0.6s ease',
                    }}/>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}

/* ══════════════════════════════════════
   ALERTS PAGE
══════════════════════════════════════ */
export function AlertsPage() {
  const alerts = [
    { id: 1, type: 'critical', title: 'Critical Shortage — Zone A',       detail: 'Medical volunteer count dropped to 42 vs 60 required. Immediate mobilization needed.',           time: '5 min ago',   read: false },
    { id: 2, type: 'critical', title: 'Supply Chain Disruption — Zone C', detail: 'Food supply routes blocked due to flooding. Estimated 3-day delay on resupply.',                  time: '22 min ago',  read: false },
    { id: 3, type: 'warning',  title: 'High Demand Surge — Zone E',       detail: 'Medical requests up 34% in the past 6 hours. Predictive model recommends pre-deployment.',        time: '1 hr ago',    read: true  },
    { id: 4, type: 'warning',  title: 'Zone B Supply Below 30%',          detail: 'Shelter supply inventory approaching critical threshold. Reorder initiated.',                      time: '2 hr ago',    read: true  },
    { id: 5, type: 'info',     title: 'Model Retrained Successfully',      detail: 'Crisis prediction model updated with 3,400 new data points. Accuracy improved to 91.4%.',        time: '3 hr ago',    read: true  },
    { id: 6, type: 'info',     title: 'New Zone F Added to Watch List',    detail: 'Satellite imagery detected displacement activity. Monitoring initiated for Zone F.',             time: '5 hr ago',    read: true  },
    { id: 7, type: 'success',  title: 'Zone D Fully Staffed',             detail: 'Education mission in Zone D reached 100% volunteer coverage. Operations normalized.',             time: '6 hr ago',    read: true  },
  ];

  const typeConfig = {
    critical: { color: '#e01f33', bg: '#fef0f2', border: 'rgba(224,31,51,0.2)', label: 'CRITICAL' },
    warning:  { color: '#d97706', bg: '#fffbeb', border: 'rgba(217,119,6,0.2)',  label: 'WARNING'  },
    info:     { color: '#2a3f8f', bg: '#e8ebf8', border: 'rgba(42,63,143,0.2)', label: 'INFO'     },
    success:  { color: '#059669', bg: '#ecfdf5', border: 'rgba(5,150,105,0.2)', label: 'OK'       },
  };

  const unread = alerts.filter(a => !a.read).length;

  return (
    <PageShell title="Alerts & Notifications" subtitle="Real-time crisis alerts, warnings, and system notifications from all active zones.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        <Chip label="Unread Alerts"   value={String(unread)} color="var(--red-500)" />
        <Chip label="Critical"        value="2"   color="#e01f33" />
        <Chip label="Warnings"        value="2"   color="#d97706" />
        <Chip label="Resolved Today"  value="5"   color="var(--green-400)" />
      </div>

      <div style={{
        background: 'var(--white)', border: '1px solid var(--gray-200)',
        borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)',
        overflow: 'hidden', animation: 'fadeUp 0.4s ease 100ms both',
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--gray-100)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--navy-900)' }}>
            All Alerts
          </span>
          {unread > 0 && (
            <span style={{
              padding: '2px 8px', borderRadius: 99, fontSize: 10, fontWeight: 700,
              background: 'var(--red-500)', color: 'white', fontFamily: 'var(--font-mono)',
            }}>{unread} NEW</span>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {alerts.map((a, i) => {
            const cfg = typeConfig[a.type];
            return (
              <div key={a.id} style={{
                display: 'flex', gap: 14, padding: '16px 20px',
                borderBottom: i < alerts.length - 1 ? '1px solid var(--gray-100)' : 'none',
                background: !a.read ? 'rgba(248,250,252,0.8)' : 'transparent',
                transition: 'background 0.15s',
                animation: `fadeUp 0.4s ease ${i * 50}ms both`,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
              onMouseLeave={e => e.currentTarget.style.background = !a.read ? 'rgba(248,250,252,0.8)' : 'transparent'}
              >
                {/* Type badge */}
                <div style={{
                  padding: '3px 8px', borderRadius: 6, height: 'fit-content', marginTop: 2, flexShrink: 0,
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                  fontSize: 9, fontWeight: 700, color: cfg.color,
                  fontFamily: 'var(--font-mono)', letterSpacing: '0.5px',
                }}>{cfg.label}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontSize: 13, fontWeight: 600, color: 'var(--navy-800)',
                      fontFamily: 'var(--font-display)',
                    }}>{a.title}</span>
                    {!a.read && (
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red-500)', flexShrink: 0 }}/>
                    )}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--gray-500)', lineHeight: 1.5 }}>{a.detail}</div>
                  <div style={{ fontSize: 10, color: 'var(--gray-300)', marginTop: 5, fontFamily: 'var(--font-mono)' }}>{a.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}

/* ══════════════════════════════════════
   REPORTS PAGE
══════════════════════════════════════ */
export function ReportsPage() {
  const reports = [
    { name: 'April 2026 — Monthly Crisis Summary',  date: 'Apr 24, 2026', type: 'Monthly',  size: '2.4 MB', status: 'Ready'      },
    { name: 'Zone A Medical Response Report',        date: 'Apr 22, 2026', type: 'Zone',     size: '1.1 MB', status: 'Ready'      },
    { name: 'Q1 2026 Volunteer Performance Report',  date: 'Apr 01, 2026', type: 'Quarterly',size: '5.8 MB', status: 'Ready'      },
    { name: 'Food Distribution Analysis — March',   date: 'Mar 31, 2026', type: 'Monthly',  size: '3.2 MB', status: 'Ready'      },
    { name: 'April Week 3 — Field Operations Log',  date: 'Apr 21, 2026', type: 'Weekly',   size: '0.9 MB', status: 'Ready'      },
    { name: 'May 2026 Forecast Report',             date: 'Generating…',  type: 'Monthly',  size: '—',      status: 'Processing' },
  ];

  const typeColor = { Monthly: '#2a3f8f', Zone: '#059669', Quarterly: '#d97706', Weekly: '#7c3aed' };

  return (
    <PageShell title="Reports" subtitle="Download, generate, and review mission reports and field analytics.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 24 }}>
        <Chip label="Total Reports"    value="48"  color="var(--navy-400)" />
        <Chip label="This Month"       value="9"   color="var(--green-400)" />
        <Chip label="Processing"       value="1"   color="var(--amber-400)" />
        <Chip label="Storage Used"     value="32 MB" color="var(--red-500)" />
      </div>

      <div style={{
        background: 'var(--white)', border: '1px solid var(--gray-200)',
        borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-md)',
        overflow: 'hidden', animation: 'fadeUp 0.4s ease 100ms both',
      }}>
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid var(--gray-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'var(--navy-900)' }}>
            Report Library
          </span>
          <button style={{
            padding: '6px 14px',
            background: 'var(--navy-900)', border: '1px solid var(--navy-700)',
            borderRadius: 'var(--radius-md)', color: 'white',
            fontSize: 11, fontFamily: 'var(--font-display)', fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
          }}>
            + Generate New Report
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {reports.map((r, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 20px',
              borderBottom: i < reports.length - 1 ? '1px solid var(--gray-100)' : 'none',
              transition: 'background 0.15s',
              animation: `fadeUp 0.4s ease ${i * 50}ms both`,
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gray-50)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Doc icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: (typeColor[r.type] || '#64748b') + '15',
                border: `1px solid ${(typeColor[r.type] || '#64748b')}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16,
              }}>📄</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy-800)', marginBottom: 3, fontFamily: 'var(--font-display)' }}>
                  {r.name}
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '1px 6px', borderRadius: 4,
                    background: (typeColor[r.type] || '#64748b') + '15',
                    color: typeColor[r.type] || '#64748b',
                    fontFamily: 'var(--font-mono)',
                  }}>{r.type.toUpperCase()}</span>
                  <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)' }}>{r.date}</span>
                  <span style={{ fontSize: 10, color: 'var(--gray-400)', fontFamily: 'var(--font-mono)' }}>{r.size}</span>
                </div>
              </div>

              {r.status === 'Processing' ? (
                <span style={{
                  padding: '3px 10px', borderRadius: 99,
                  fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-mono)',
                  background: '#fffbeb', border: '1px solid rgba(217,119,6,0.2)', color: '#d97706',
                }}>Processing…</span>
              ) : (
                <button style={{
                  padding: '5px 12px', borderRadius: 8,
                  background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
                  fontSize: 11, fontWeight: 600, color: 'var(--navy-700)',
                  fontFamily: 'var(--font-display)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 5,
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy-900)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--navy-700)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.color = 'var(--navy-700)'; e.currentTarget.style.borderColor = 'var(--gray-200)'; }}
                >
                  ↓ Download
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
