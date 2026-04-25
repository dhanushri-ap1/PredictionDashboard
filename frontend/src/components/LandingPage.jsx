import React from 'react';
import { HeartHandshake, Building2, Users, ArrowRight, Sparkles, Shield, MapPin } from 'lucide-react';

export default function LandingPage({ onSelectRole }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px',
    }}>
      {/* Logo */}
      <div className="animate-fadeup" style={{
        display: 'inline-flex', alignItems: 'center', gap: '12px',
        background: 'var(--brand-blue-50)', padding: '12px 24px',
        borderRadius: 'var(--radius-full)', marginBottom: '32px',
        color: 'var(--brand-blue-600)', fontWeight: 600
      }}>
        <HeartHandshake size={24} />
        <span style={{ fontSize: '20px', letterSpacing: '-0.5px' }}>ReliefIQ</span>
      </div>

      {/* Headline */}
      <div className="animate-fadeup delay-100" style={{ textAlign: 'center', marginBottom: '56px' }}>
        <h1 style={{ fontSize: '48px', letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.1 }}>
          Connecting those who need help<br />with those who give it
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto' }}>
          Whether you're seeking support or coordinating relief — ReliefIQ brings the right resources to the right people.
        </p>
      </div>

      {/* Two Role Cards */}
      <div className="animate-fadeup delay-200" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        width: '100%',
        maxWidth: '720px',
        marginBottom: '48px'
      }}>
        {/* Service Receiver Card */}
        <RoleCard
          icon={<Users size={28} color="var(--brand-teal-600)" />}
          iconBg="var(--brand-teal-50)"
          title="I Need Help"
          subtitle="Service Receiver"
          description="Find nearby NGOs, relief camps, and emergency support based on your location and needs."
          features={['Find nearby NGOs', 'Filter by service type', 'Get directions & contacts']}
          buttonLabel="Continue as Service Receiver"
          buttonBg="var(--brand-teal-600)"
          buttonHover="var(--brand-teal-500)"
          onClick={() => onSelectRole('receiver')}
        />

        {/* NGO / Organization Card */}
        <RoleCard
          icon={<Building2 size={28} color="var(--brand-blue-600)" />}
          iconBg="var(--brand-blue-50)"
          title="I Provide Help"
          subtitle="NGO / Organization"
          description="Manage volunteer resources, predict shortages, and coordinate crisis response operations."
          features={['AI volunteer prediction', 'Shortage alerts', 'Resource orchestration']}
          buttonLabel="Continue as Organization"
          buttonBg="var(--brand-blue-600)"
          buttonHover="var(--brand-blue-500)"
          onClick={() => onSelectRole('ngo')}
        />
      </div>

      {/* Trust Badges */}
      <div className="animate-fadeup delay-300" style={{
        display: 'flex', gap: '32px', color: 'var(--text-tertiary)', fontSize: '14px'
      }}>
        {[
          { icon: <Shield size={14} />, label: 'Secure & Private' },
          { icon: <Sparkles size={14} />, label: 'AI-Powered' },
          { icon: <MapPin size={14} />, label: 'Location-aware' },
        ].map(({ icon, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoleCard({ icon, iconBg, title, subtitle, description, features, buttonLabel, buttonBg, buttonHover, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  const [btnHover, setBtnHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px',
        border: '1px solid var(--border-color)',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'var(--shadow-md)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        cursor: 'default'
      }}
    >
      {/* Icon + Titles */}
      <div>
        <div style={{
          width: '56px', height: '56px', borderRadius: 'var(--radius-lg)',
          background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '16px'
        }}>
          {icon}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
          {subtitle}
        </div>
        <h2 style={{ fontSize: '24px', letterSpacing: '-0.5px' }}>{title}</h2>
      </div>

      {/* Description */}
      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        {description}
      </p>

      {/* Features */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {features.map(f => (
          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: buttonBg, flexShrink: 0 }} />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onClick}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        style={{
          marginTop: 'auto',
          padding: '14px 20px',
          background: btnHover ? buttonHover : buttonBg,
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          fontSize: '15px',
          fontWeight: 600,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s',
          transform: btnHover ? 'translateY(-1px)' : 'translateY(0)',
          boxShadow: btnHover ? 'var(--shadow-md)' : 'var(--shadow-sm)'
        }}
      >
        {buttonLabel}
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
