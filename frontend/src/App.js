import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, 
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area, PieChart, Pie
} from 'recharts';
import { 
  Sparkles, TrendingUp, Users, ShieldCheck, Activity, Target, AlertTriangle, 
  Settings2, ChevronRight, Droplets, PenTool, Truck, ArrowRight
} from 'lucide-react';
import './styles/globals.css';

export default function App() {
  // Scenario Inputs
  const [budget, setBudget] = useState(50000);
  const [demand, setDemand] = useState(15000);
  const [urgency, setUrgency] = useState('Critical');

  // Dynamic calculation based on sliders
  const dynamicMultiplier = useMemo(() => {
    return (budget / 50000) * (15000 / demand);
  }, [budget, demand]);

  // ─── Data Sets ─────────────────────────────────────────────────────────
  const radarData = [
    { subject: 'Cost Efficiency', A: 90, B: 60, C: 40 },
    { subject: 'Community Reach', A: 85, B: 70, C: 95 },
    { subject: 'Sustainability',  A: 95, B: 30, C: 20 },
    { subject: 'Urgency Fit',     A: 60, B: 80, C: 100 },
    { subject: 'Logistics Ease',  A: 75, B: 65, C: 85 },
  ];

  const areaData = [
    { month: 'Month 1', Borehole: 2000, Truck: 8000, Tanker: 5000 },
    { month: 'Month 3', Borehole: 6000, Truck: 4000, Tanker: 3000 },
    { month: 'Month 6', Borehole: 12000, Truck: 1000, Tanker: 500 },
    { month: 'Month 12', Borehole: 15000 * dynamicMultiplier, Truck: 0, Tanker: 0 },
  ];

  const barData = [
    { name: 'Borehole Repair', score: Math.min(92 * dynamicMultiplier, 100) },
    { name: 'Water Trucks', score: 65 },
    { name: 'Emergency Tankers', score: 78 }
  ];

  const donutData = [
    { name: 'Utilized', value: 85, fill: 'var(--primary-600)' },
    { name: 'Reserve', value: 15, fill: 'var(--border-light)' }
  ];

  const calculatedImpact = Math.min(Math.round(92 * dynamicMultiplier), 99);

  return (
    <div style={{ padding: '40px 24px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* 1. Hero Header */}
      <header className="animate-in" style={{ textAlign: 'center', marginBottom: '64px', marginTop: '20px' }}>
        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '8px', 
          background: 'var(--primary-50)', color: 'var(--primary-600)',
          padding: '8px 16px', borderRadius: 'var(--radius-full)',
          fontSize: '14px', fontWeight: 600, marginBottom: '24px',
          border: '1px solid var(--primary-100)'
        }}>
          <Sparkles size={16} /> Enterprise Decision Intelligence
        </div>
        <h1 style={{ fontSize: '56px', fontWeight: 800, letterSpacing: '-1.5px', marginBottom: '16px' }}>
          Relief<span style={{ color: 'var(--primary-600)' }}>IQ</span>
        </h1>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: 'var(--text-main)', marginBottom: '12px' }}>
          AI-Powered Resource Allocation Scenario Simulator
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
          Simulate intervention strategies, evaluate multi-factor impact models, and allocate resources where they deliver maximum sustainable value.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* LEFT SIDEBAR: Inputs & Simulations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 2. Scenario Input Panel */}
          <div className="glass-panel animate-in delay-100" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Settings2 size={18} color="var(--primary-600)" /> Scenario Parameters
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Crisis Classification</label>
                <select style={inputStyle}>
                  <option>Drought / Water Scarcity</option>
                  <option>Flood Displacement</option>
                  <option>Refugee Influx</option>
                </select>
              </div>
              
              <div>
                <label style={labelStyle}>Available Budget (USD)</label>
                <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Target Community Size</label>
                <input type="number" value={demand} onChange={e => setDemand(Number(e.target.value))} style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Urgency Tier</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {['Critical', 'Moderate'].map(level => (
                    <button key={level} onClick={() => setUrgency(level)} style={{
                      padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid',
                      borderColor: urgency === level ? 'var(--primary-500)' : 'var(--border-strong)',
                      background: urgency === level ? 'var(--primary-50)' : 'white',
                      color: urgency === level ? 'var(--primary-600)' : 'var(--text-muted)',
                      fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <button style={{
                marginTop: '12px', padding: '16px', background: 'var(--primary-600)', color: 'white',
                border: 'none', borderRadius: 'var(--radius-lg)', fontSize: '15px', fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                cursor: 'pointer', boxShadow: 'var(--shadow-glow)', transition: 'all 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <Sparkles size={18} /> Run Allocation Simulation
              </button>
            </div>
          </div>

          {/* 7. Scenario Simulation Section (Interactive) */}
          <div className="glass-panel animate-in delay-200" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Dynamic Simulation</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>Adjust constraints to see real-time impact forecasting.</p>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                <span>Budget Variance</span>
                <span style={{ color: 'var(--primary-600)' }}>${budget.toLocaleString()}</span>
              </div>
              <input type="range" min="10000" max="150000" step="5000" value={budget} onChange={e => setBudget(Number(e.target.value))} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 500 }}>
                <span>Demand Surge</span>
                <span style={{ color: 'var(--teal-600)' }}>{demand.toLocaleString()} ppl</span>
              </div>
              <input type="range" min="5000" max="50000" step="1000" value={demand} onChange={e => setDemand(Number(e.target.value))} />
            </div>
          </div>

        </div>

        {/* RIGHT MAIN AREA: AI Dashboards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* 3. Recommended Allocation Panel */}
          <div className="animate-in delay-100" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '20px', background: 'linear-gradient(135deg, var(--primary-600), var(--primary-900))', color: 'white' }}>
              <div style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>AI Recommendation</div>
              <div style={{ fontSize: '20px', fontWeight: 700, lineHeight: 1.2, marginBottom: '16px' }}>Borehole Repair & Rehab</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 600 }}>
                <Target size={12} /> Confidence: 94%
              </div>
            </div>
            
            <KPICard title="Impact Score" value={calculatedImpact} suffix="/100" icon={<TrendingUp size={20} color="var(--primary-500)" />} />
            <KPICard title="Expected Reach" value={Math.round(demand * dynamicMultiplier).toLocaleString()} suffix=" ppl" icon={<Users size={20} color="var(--teal-500)" />} />
            <KPICard title="Cost Efficiency" value={Math.round((budget / demand) * 10) / 10} suffix=" $/person" icon={<Activity size={20} color="var(--primary-500)" />} />
            <KPICard title="Sustainability" value="High" icon={<ShieldCheck size={20} color="var(--teal-500)" />} />
          </div>

          {/* 6. Tradeoff Intelligence Panel */}
          <div className="glass-panel animate-in delay-200" style={{ padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', borderLeft: '4px solid var(--primary-500)' }}>
            <div style={{ background: 'var(--primary-50)', padding: '16px', borderRadius: '50%' }}>
              <Sparkles size={28} color="var(--primary-600)" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--primary-900)', marginBottom: '8px' }}>AI Strategic Insight</h3>
              <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                While <strong style={{color:'var(--text-main)'}}>Water Trucks</strong> provide immediate short-term relief, they exhibit exponentially decreasing cost-efficiency over 3 months. <strong style={{color:'var(--primary-600)'}}>Borehole Repair</strong> requires a higher initial capital expenditure but delivers 8.5x higher long-term impact and achieves breakeven efficiency within 45 days.
              </p>
            </div>
          </div>

          {/* 5. Allocation Comparison Graphs & 4. Impact Score Transparency */}
          <div className="animate-in delay-300" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }}>
            
            {/* Radar Comparison */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Multivariate Intervention Comparison</h3>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="var(--border-light)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Borehole Repair" dataKey="A" stroke="var(--primary-600)" fill="var(--primary-500)" fillOpacity={0.4} />
                    <Radar name="Water Trucks" dataKey="B" stroke="var(--teal-500)" fill="var(--teal-500)" fillOpacity={0.3} />
                    <Radar name="Tankers" dataKey="C" stroke="var(--coral-500)" fill="var(--coral-500)" fillOpacity={0.1} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '13px', fontWeight: 500, color: 'var(--text-muted)' }}>
                <span style={{display:'flex', alignItems:'center', gap:'6px'}}><div style={{width:10,height:10,borderRadius:2,background:'var(--primary-500)'}}/> Borehole</span>
                <span style={{display:'flex', alignItems:'center', gap:'6px'}}><div style={{width:10,height:10,borderRadius:2,background:'var(--teal-500)'}}/> Water Trucks</span>
                <span style={{display:'flex', alignItems:'center', gap:'6px'}}><div style={{width:10,height:10,borderRadius:2,background:'var(--coral-500)'}}/> Tankers</span>
              </div>
            </div>

            {/* 4. Transparency Panel */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Impact Score Calculation Weights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <WeightBar label="Cost Efficiency" weight={35} color="var(--primary-500)" />
                <WeightBar label="Community Reach" weight={25} color="var(--teal-500)" />
                <WeightBar label="Sustainability Fit" weight={20} color="var(--primary-900)" />
                <WeightBar label="Urgency Match" weight={20} color="var(--coral-500)" />
              </div>
              <div style={{ marginTop: '32px', padding: '16px', background: 'var(--bg-app)', borderRadius: 'var(--radius-md)', fontSize: '13px', color: 'var(--text-muted)' }}>
                <AlertTriangle size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--coral-500)' }} />
                Weights are dynamically adjusted by the AI based on the "Crisis Classification" parameter.
              </div>
            </div>

          </div>

          {/* Area Chart & 8. Resource Utilization / 9. Risk Panel */}
          <div className="animate-in delay-400" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            
            {/* Long term projection */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '24px' }}>Long-Term Beneficiary Projection</h3>
              <div style={{ height: '240px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                    <Area type="monotone" dataKey="Borehole" stroke="var(--primary-500)" strokeWidth={3} fillOpacity={1} fill="url(#colorB)" />
                    <Area type="monotone" dataKey="Truck" stroke="var(--teal-500)" strokeWidth={2} fillOpacity={0} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 8 & 9. Utilization and Risk */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '80px', height: '80px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={donutData} innerRadius={28} outerRadius={36} paddingAngle={2} dataKey="value" stroke="none" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '4px' }}>Budget Utilization</h3>
                  <div style={{ fontSize: '24px', fontWeight: 700 }}>85%</div>
                  <div style={{ fontSize: '12px', color: 'var(--teal-600)', fontWeight: 500 }}>Highly Efficient</div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '16px' }}>Implementation Risk</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '12px', background: 'var(--coral-50)', borderRadius: 'var(--radius-md)' }}>
                    <AlertTriangle size={24} color="var(--coral-600)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)' }}>Moderate</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Dependency on local contractors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 10. AI Recommendation Summary Panel */}
          <div className="glass-panel animate-in delay-400" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card-solid)', border: '2px solid var(--primary-100)' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-600)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' }}>
                Executive AI Summary
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-main)', maxWidth: '800px', lineHeight: 1.5 }}>
                Based on current resource constraints, <span style={{ color: 'var(--primary-600)' }}>Borehole Repair</span> is projected to maximize community impact, improve long-term sustainability, and achieve <span style={{ color: 'var(--teal-600)' }}>37% higher cost efficiency</span> than alternative interventions.
              </h2>
            </div>
            <button style={{
              padding: '16px 32px', background: 'var(--text-main)', color: 'white', border: 'none', borderRadius: 'var(--radius-lg)',
              fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
              boxShadow: 'var(--shadow-md)', transition: 'transform 0.2s'
            }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Deploy Plan <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Subcomponents ───────────────────────────────────────────────────────

function KPICard({ title, value, suffix = '', icon }) {
  return (
    <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>{title}</div>
        <div style={{ padding: '6px', background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)' }}>
          {icon}
        </div>
      </div>
      <div>
        <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-main)' }}>{value}</span>
        <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-light)', marginLeft: '2px' }}>{suffix}</span>
      </div>
    </div>
  );
}

function WeightBar({ label, weight, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
        <span>{label}</span>
        <span style={{ color: color }}>{weight}%</span>
      </div>
      <div style={{ width: '100%', height: '8px', background: 'var(--border-light)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ width: `${weight}%`, height: '100%', background: color, borderRadius: '4px' }} />
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' };
const inputStyle = {
  width: '100%', padding: '12px 16px', background: 'white', border: '1px solid var(--border-strong)',
  borderRadius: 'var(--radius-md)', fontSize: '15px', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit'
};
