import React, { useState } from 'react';
import {
  HeartHandshake, MapPin, Search, Phone, Globe, ChevronRight,
  ArrowLeft, Filter, Star, Clock, Users, Heart, Stethoscope,
  Home, Droplets, ShoppingBag, BookOpen, AlertCircle, Navigation,
  CheckCircle, Loader
} from 'lucide-react';

// ─── Static NGO Data (replace with real API/backend later) ───────────────────
const NGO_DATA = [
  {
    id: 1,
    name: 'CRY – Child Rights and You',
    category: 'Child Welfare',
    icon: '🧒',
    distance: '1.2 km',
    address: 'Gandhipuram, Coimbatore',
    phone: '+91 44 2345 6789',
    website: 'cry.org',
    services: ['Food', 'Education', 'Medical'],
    rating: 4.8,
    open: true,
    hours: '9am – 6pm',
    volunteers: 42,
    description: 'Works to ensure every child has access to education, health, and protection from exploitation.'
  },
  {
    id: 2,
    name: 'HelpAge India',
    category: 'Elderly Care',
    icon: '👴',
    distance: '2.5 km',
    address: 'RS Puram, Coimbatore',
    phone: '+91 422 234 5678',
    website: 'helpageindia.org',
    services: ['Medical', 'Shelter', 'Food'],
    rating: 4.6,
    open: true,
    hours: '8am – 8pm',
    volunteers: 31,
    description: 'Dedicated to improving the quality of life of disadvantaged elderly across India.'
  },
  {
    id: 3,
    name: 'GiveIndia Foundation',
    category: 'General Relief',
    icon: '🤝',
    distance: '3.1 km',
    address: 'Peelamedu, Coimbatore',
    phone: '+91 422 345 6780',
    website: 'giveindia.org',
    services: ['Food', 'Disaster Relief', 'Education'],
    rating: 4.9,
    open: false,
    hours: '10am – 5pm',
    volunteers: 58,
    description: 'India\'s most trusted giving platform, channeling donations to verified nonprofits.'
  },
  {
    id: 4,
    name: 'Akshaya Patra Foundation',
    category: 'Food & Nutrition',
    icon: '🍱',
    distance: '0.9 km',
    address: 'Saibaba Colony, Coimbatore',
    phone: '+91 422 456 7890',
    website: 'akshayapatra.org',
    services: ['Food', 'Nutrition', 'Child Welfare'],
    rating: 5.0,
    open: true,
    hours: '7am – 3pm',
    volunteers: 120,
    description: 'One of the world\'s largest NGO mid-day meal programs — feeding millions every day.'
  },
  {
    id: 5,
    name: 'Habitat for Humanity India',
    category: 'Shelter & Housing',
    icon: '🏠',
    distance: '4.3 km',
    address: 'Singanallur, Coimbatore',
    phone: '+91 422 567 8901',
    website: 'habitatindia.org',
    services: ['Shelter', 'Disaster Relief', 'Water'],
    rating: 4.7,
    open: true,
    hours: '9am – 5pm',
    volunteers: 27,
    description: 'Builds affordable homes and communities to help families break the cycle of poverty.'
  },
  {
    id: 6,
    name: 'iCall Mental Health',
    category: 'Mental Health',
    icon: '🧠',
    distance: '2.8 km',
    address: 'Race Course, Coimbatore',
    phone: '+91 9152987821',
    website: 'icallhelpline.org',
    services: ['Mental Health', 'Counselling', 'Medical'],
    rating: 4.5,
    open: true,
    hours: '8am – 10pm',
    volunteers: 15,
    description: 'Psychosocial helpline and counselling services for those in emotional distress.'
  },
];

const SERVICE_CATEGORIES = [
  { id: 'all', label: 'All Services', icon: <Heart size={14} /> },
  { id: 'Food', label: 'Food', icon: <ShoppingBag size={14} /> },
  { id: 'Medical', label: 'Medical', icon: <Stethoscope size={14} /> },
  { id: 'Shelter', label: 'Shelter', icon: <Home size={14} /> },
  { id: 'Water', label: 'Water', icon: <Droplets size={14} /> },
  { id: 'Education', label: 'Education', icon: <BookOpen size={14} /> },
  { id: 'Disaster Relief', label: 'Disaster Relief', icon: <AlertCircle size={14} /> },
];

export default function ServiceReceiverPage({ onBack }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationSet, setLocationSet] = useState(true); // default: Coimbatore

  const filtered = NGO_DATA.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(search.toLowerCase()) ||
      ngo.category.toLowerCase().includes(search.toLowerCase()) ||
      ngo.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'all' || ngo.services.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  const handleLocate = () => {
    setLocating(true);
    setTimeout(() => {
      setLocating(false);
      setLocationSet(true);
    }, 1800);
  };

  if (selectedNGO) {
    return <NGODetailPage ngo={selectedNGO} onBack={() => setSelectedNGO(null)} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '32px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div className="animate-fadeup" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
          <button onClick={onBack} style={{
            background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)', padding: '10px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)'
          }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <HeartHandshake size={18} color="var(--brand-teal-600)" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-teal-600)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Service Receiver Portal
              </span>
            </div>
            <h1 style={{ fontSize: '28px', letterSpacing: '-0.5px' }}>Find Help Near You</h1>
          </div>
        </div>

        {/* Location Banner */}
        <div className="animate-fadeup delay-100" style={{
          background: locationSet ? 'var(--brand-teal-50)' : 'var(--amber-50)',
          border: `1px solid ${locationSet ? 'var(--brand-teal-100)' : '#fde68a'}`,
          borderRadius: 'var(--radius-lg)', padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <MapPin size={18} color={locationSet ? 'var(--brand-teal-600)' : 'var(--amber-500)'} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {locationSet ? 'Coimbatore, Tamil Nadu' : 'Location not set'}
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                {locationSet ? 'Showing NGOs within 5 km radius' : 'Enable location for nearby results'}
              </div>
            </div>
          </div>
          <button
            onClick={handleLocate}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 16px', borderRadius: 'var(--radius-md)',
              background: locationSet ? 'var(--brand-teal-600)' : 'var(--amber-500)',
              color: 'white', border: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: 600
            }}
          >
            {locating ? <Loader size={14} className="spin" /> : <Navigation size={14} />}
            {locating ? 'Locating...' : 'Update Location'}
          </button>
        </div>

        {/* Search + Filter */}
        <div className="animate-fadeup delay-100" style={{ marginBottom: '20px' }}>
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={16} style={{
              position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)'
            }} />
            <input
              type="text"
              placeholder="Search by NGO name, service type, or keyword..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '14px 16px 14px 44px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)', fontSize: '15px', color: 'var(--text-primary)',
                fontFamily: 'inherit', outline: 'none', boxShadow: 'var(--shadow-sm)'
              }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {SERVICE_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: 'var(--radius-full)',
                  border: activeCategory === cat.id ? '2px solid var(--brand-teal-500)' : '1px solid var(--border-color)',
                  background: activeCategory === cat.id ? 'var(--brand-teal-50)' : 'var(--bg-secondary)',
                  color: activeCategory === cat.id ? 'var(--brand-teal-600)' : 'var(--text-secondary)',
                  fontWeight: activeCategory === cat.id ? 600 : 400,
                  fontSize: '13px', cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: 'inherit'
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Showing <strong style={{ color: 'var(--text-primary)' }}>{filtered.length}</strong> organizations near you
        </div>

        {/* NGO Cards */}
        <div className="animate-fadeup delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 20px',
              background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)', color: 'var(--text-tertiary)'
            }}>
              <Search size={40} style={{ marginBottom: '12px', opacity: 0.4 }} />
              <p style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-secondary)' }}>No NGOs found</p>
              <p style={{ fontSize: '14px', marginTop: '6px' }}>Try a different search or category filter</p>
            </div>
          ) : (
            filtered.map((ngo, i) => (
              <NGOCard key={ngo.id} ngo={ngo} delay={i * 50} onClick={() => setSelectedNGO(ngo)} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function NGOCard({ ngo, delay, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px',
        border: '1px solid var(--border-color)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'pointer',
        display: 'flex',
        gap: '20px',
        alignItems: 'flex-start'
      }}
    >
      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-subtle)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '24px', flexShrink: 0
      }}>
        {ngo.icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '2px' }}>{ngo.name}</h3>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>{ngo.category}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={12} fill="var(--amber-500)" color="var(--amber-500)" />
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{ngo.rating}</span>
            </div>
            <span style={{
              fontSize: '12px', padding: '2px 10px', borderRadius: 'var(--radius-full)',
              background: ngo.open ? 'var(--brand-teal-50)' : 'var(--alert-red-50)',
              color: ngo.open ? 'var(--brand-teal-600)' : 'var(--alert-red-600)',
              fontWeight: 600
            }}>
              {ngo.open ? '● Open' : '● Closed'}
            </span>
          </div>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.5 }}>
          {ngo.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          {/* Meta */}
          <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'var(--text-tertiary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} /> {ngo.distance}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} /> {ngo.hours}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Users size={12} /> {ngo.volunteers} volunteers
            </span>
          </div>

          {/* Service Tags */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {ngo.services.slice(0, 3).map(s => (
              <span key={s} style={{
                padding: '3px 10px', fontSize: '12px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--brand-blue-50)', color: 'var(--brand-blue-600)', fontWeight: 500
              }}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight size={18} color="var(--text-tertiary)" style={{ flexShrink: 0, marginTop: '2px' }} />
    </div>
  );
}

function NGODetailPage({ ngo, onBack }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', padding: '32px 24px' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>

        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500,
          marginBottom: '24px', padding: '0', fontFamily: 'inherit'
        }}>
          <ArrowLeft size={16} /> Back to results
        </button>

        <div className="animate-fadein" style={{
          background: 'var(--bg-secondary)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)', overflow: 'hidden',
          boxShadow: 'var(--shadow-md)'
        }}>
          {/* Hero */}
          <div style={{
            background: 'linear-gradient(135deg, var(--brand-teal-50), var(--brand-blue-50))',
            padding: '32px', borderBottom: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '72px', height: '72px', borderRadius: 'var(--radius-xl)',
                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '32px', boxShadow: 'var(--shadow-md)'
              }}>
                {ngo.icon}
              </div>
              <div>
                <h1 style={{ fontSize: '26px', letterSpacing: '-0.5px', marginBottom: '4px' }}>{ngo.name}</h1>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>{ngo.category}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={13} fill="var(--amber-500)" color="var(--amber-500)" />
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{ngo.rating}</span>
                  </div>
                  <span style={{
                    padding: '2px 12px', borderRadius: 'var(--radius-full)', fontSize: '13px',
                    background: ngo.open ? 'var(--brand-teal-100)' : 'var(--alert-red-100)',
                    color: ngo.open ? 'var(--brand-teal-600)' : 'var(--alert-red-600)', fontWeight: 600
                  }}>
                    {ngo.open ? 'Open Now' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Description */}
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {ngo.description}
            </p>

            {/* Info Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: <MapPin size={16} />, label: 'Address', value: ngo.address },
                { icon: <Clock size={16} />, label: 'Hours', value: ngo.hours },
                { icon: <Users size={16} />, label: 'Active Volunteers', value: `${ngo.volunteers} volunteers` },
                { icon: <Navigation size={16} />, label: 'Distance', value: ngo.distance },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{
                  padding: '16px', background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-lg)', display: 'flex', gap: '12px', alignItems: 'flex-start'
                }}>
                  <div style={{ color: 'var(--brand-teal-600)', marginTop: '1px' }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Services */}
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>Services Provided</h3>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {ngo.services.map(s => (
                  <span key={s} style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 14px', borderRadius: 'var(--radius-full)',
                    background: 'var(--brand-blue-50)', color: 'var(--brand-blue-600)',
                    fontSize: '14px', fontWeight: 500
                  }}>
                    <CheckCircle size={13} /> {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <a
                href={`tel:${ngo.phone}`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '14px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--brand-teal-600)', color: 'white',
                  fontSize: '15px', fontWeight: 600, textDecoration: 'none',
                  transition: 'all 0.2s', boxShadow: 'var(--shadow-teal)'
                }}
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`https://${ngo.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '14px', borderRadius: 'var(--radius-lg)',
                  background: 'var(--bg-subtle)', color: 'var(--text-primary)',
                  fontSize: '15px', fontWeight: 600, textDecoration: 'none',
                  border: '1px solid var(--border-color)', transition: 'all 0.2s'
                }}
              >
                <Globe size={16} /> Visit Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
