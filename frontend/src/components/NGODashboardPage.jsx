import React, { useState } from 'react';
import {
  HeartHandshake, Users, AlertCircle, Shield,
  MapPin, Sparkles, UserPlus, Activity, ArrowLeft,
  Building2
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

export default function NGODashboardPage({ onBack }) {
  const [formData, setFormData] = useState({
    taskType: '',
    requests: '',
    urgency: 'high',
    availableVolunteers: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const chartData = [
    { name: 'Volunteers Needed', count: formData.requests ? Math.floor(parseInt(formData.requests) * 1.5) : 150 },
    { name: 'Available Now', count: formData.availableVolunteers ? parseInt(formData.availableVolunteers) : 85 }
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!formData.taskType || !formData.requests || !formData.availableVolunteers) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Back button + Header */}
      <div className="animate-fadeup" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
        <button onClick={onBack} style={{
          background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)', padding: '10px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', color: 'var(--text-secondary)'
        }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <Building2 size={18} color="var(--brand-blue-600)" />
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-blue-600)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              NGO / Organization Portal
            </span>
          </div>
          <h1 style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>AI Resource Orchestration</h1>
        </div>
      </div>

      {/* Welcoming Hero Header */}
      <header className="animate-fadeup delay-100" style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '12px',
          background: 'var(--brand-blue-50)', padding: '12px 24px',
          borderRadius: 'var(--radius-full)', marginBottom: '20px',
          color: 'var(--brand-blue-600)', fontWeight: 600
        }}>
          <HeartHandshake size={24} />
          <span style={{ fontSize: '18px', letterSpacing: '-0.5px' }}>ReliefIQ Dashboard</span>
        </div>

        <h2 style={{ fontSize: '36px', color: 'var(--text-primary)', marginBottom: '12px', letterSpacing: '-0.8px' }}>
          AI-powered crisis resource orchestration<br />for humanitarian response
        </h2>

        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontWeight: 400 }}>
          Helping NGOs allocate the right help where it matters most.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>

        {/* LEFT: Input Panel */}
        <div className="animate-fadeup delay-100" style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)',
          padding: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)'
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '22px', marginBottom: '8px' }}>Response Parameters</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Enter the details of the current situation to generate an intelligent support plan.
            </p>
          </div>

          <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={labelStyle}>Emergency Support Required (Task Type)</label>
              <input
                type="text"
                placeholder="e.g. Medical assistance, Flood evacuation, Food distribution"
                style={inputStyle}
                value={formData.taskType}
                onChange={(e) => setFormData({ ...formData, taskType: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Number of Requests</label>
                <input
                  type="number"
                  placeholder="e.g. 500"
                  style={inputStyle}
                  value={formData.requests}
                  onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Available Volunteers</label>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  style={inputStyle}
                  value={formData.availableVolunteers}
                  onChange={(e) => setFormData({ ...formData, availableVolunteers: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Urgency Level</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {['Critical', 'High', 'Moderate'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFormData({ ...formData, urgency: level.toLowerCase() })}
                    style={{
                      flex: 1, padding: '12px', borderRadius: 'var(--radius-md)',
                      border: formData.urgency === level.toLowerCase() ? '2px solid var(--brand-blue-500)' : '1px solid var(--border-color)',
                      background: formData.urgency === level.toLowerCase() ? 'var(--brand-blue-50)' : 'var(--bg-secondary)',
                      color: formData.urgency === level.toLowerCase() ? 'var(--brand-blue-600)' : 'var(--text-secondary)',
                      fontWeight: formData.urgency === level.toLowerCase() ? 600 : 400,
                      cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit'
                    }}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              style={{
                marginTop: '12px', padding: '16px',
                background: 'var(--brand-blue-600)', color: 'white',
                border: 'none', borderRadius: 'var(--radius-lg)',
                fontSize: '16px', fontWeight: 600,
                cursor: isGenerating ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s', opacity: isGenerating ? 0.8 : 1,
                boxShadow: 'var(--shadow-sm)', fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => { if (!isGenerating) e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { if (!isGenerating) e.currentTarget.style.transform = 'translateY(0)' }}
            >
              {isGenerating ? <>Processing Data...</> : <><Sparkles size={18} />Generate AI Response Plan</>}
            </button>
          </form>
        </div>

        {/* RIGHT: Results */}
        {showResults ? (
          <div className="animate-fadein" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Emergency Alert */}
            <div style={{
              background: 'var(--alert-red-50)', border: '1px solid var(--alert-red-100)',
              borderRadius: 'var(--radius-lg)', padding: '20px 24px',
              display: 'flex', alignItems: 'flex-start', gap: '16px',
              color: 'var(--alert-red-600)', boxShadow: 'var(--shadow-alert)'
            }}>
              <AlertCircle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '4px', color: 'var(--alert-red-600)' }}>
                  Critical volunteer shortage detected
                </h3>
                <p style={{ fontSize: '15px', opacity: 0.9 }}>
                  Immediate response needed to protect affected communities in the highly impacted zones.
                </p>
              </div>
            </div>

            {/* AI Insight */}
            <div style={{
              background: 'var(--brand-blue-50)', border: '1px solid var(--brand-blue-100)',
              borderRadius: 'var(--radius-lg)', padding: '20px 24px',
              display: 'flex', alignItems: 'flex-start', gap: '16px',
            }}>
              <div style={{
                background: 'var(--bg-secondary)', padding: '8px',
                borderRadius: 'var(--radius-full)', color: 'var(--brand-blue-600)'
              }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '6px', color: 'var(--brand-blue-600)' }}>
                  AI Insight Summary
                </h3>
                <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Current volunteer availability may not meet urgent community needs. Immediate reallocation from non-critical areas or emergency recruitment is recommended to ensure everyone receives care.
                </p>
              </div>
            </div>

            {/* Insight Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <InsightCard icon={<UserPlus size={20} color="var(--brand-blue-600)" />} title="Volunteers Required" value={chartData[0].count} bg="var(--brand-blue-50)" />
              <InsightCard icon={<Activity size={20} color="var(--alert-red-600)" />} title="Resource Deficit" value={`${chartData[0].count - chartData[1].count} people`} bg="var(--alert-red-50)" />
              <InsightCard icon={<Shield size={20} color="var(--brand-teal-600)" />} title="Crisis Severity" value="High Risk" bg="var(--brand-teal-50)" />
              <InsightCard icon={<MapPin size={20} color="var(--amber-500)" />} title="Population at Risk" value={formData.requests ? `${parseInt(formData.requests) * 3} approx.` : "1,500 approx."} bg="var(--amber-50)" />
            </div>

            {/* Chart */}
            <div style={{
              background: 'var(--bg-secondary)', padding: '24px',
              borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h3 style={{ fontSize: '16px', marginBottom: '20px', color: 'var(--text-primary)' }}>
                Capacity vs. Requirement
              </h3>
              <div style={{ height: '200px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={140} axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 14 }} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: 'var(--radius-md)', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? 'var(--brand-blue-500)' : 'var(--brand-teal-500)'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fadeup delay-200" style={{
            height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '40px', textAlign: 'center', color: 'var(--text-tertiary)',
            border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-subtle)'
          }}>
            <Shield size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p style={{ fontSize: '18px', fontWeight: 500, marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Awaiting Input Parameters
            </p>
            <p style={{ fontSize: '15px', maxWidth: '300px' }}>
              Fill out the details on the left to generate an AI-driven compassion plan.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InsightCard({ icon, title, value, bg }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)', padding: '20px',
      borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column',
      gap: '12px', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default'
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
    >
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: '14px', fontWeight: 500,
  color: 'var(--text-primary)', marginBottom: '8px'
};

const inputStyle = {
  width: '100%', padding: '14px 16px',
  background: 'var(--bg-subtle)', border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-md)', fontSize: '15px', color: 'var(--text-primary)',
  transition: 'border-color 0.2s', fontFamily: 'inherit'
};
