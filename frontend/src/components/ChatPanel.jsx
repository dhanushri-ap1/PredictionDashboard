import React, { useState, useRef, useEffect } from 'react';

const SYSTEM_PROMPT = `You are ReliefIQ's AI Crisis Coordinator — an expert assistant for NGO humanitarian operations. You help field coordinators make fast, smart decisions during crises.

You have access to the current prediction context provided in each message. Give sharp, actionable advice in 2-4 sentences max. Use bullet points only when listing steps. Be direct — lives depend on speed. Never say "I'm an AI" or add disclaimers. Sign off with a confidence score like [Confidence: 92%].`;

const STARTERS = [
  'What should I do first?',
  'How do I redeploy volunteers?',
  'Is this shortage critical?',
  'What zones need help most?',
];

export default function ChatPanel({ result }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // When a new prediction comes in, reset and show a context message
  useEffect(() => {
    if (result) {
      setMessages([{
        role: 'assistant',
        text: `📊 I've analyzed the latest prediction for **${result.task_type || 'this mission'}**. Severity is **${result.severity}** with a shortage of **${result.shortage?.toLocaleString()}** volunteers and **${result.impact?.toLocaleString()}** people at risk. Ask me anything.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
  }, [result]);

  const buildContext = () => {
    if (!result) return 'No prediction has been run yet.';
    return `Current prediction context:
- Task Type: ${result.task_type || 'Unknown'}
- Predicted Volunteers Needed: ${result.predicted_volunteers}
- Volunteer Shortage: ${result.shortage}
- Severity: ${result.severity}
- People at Risk: ${result.impact}
- Recommendation: ${result.recommendation}`;
  };

  const send = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput('');

    const userMsg = {
      role: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setLoading(true);

    // Build API messages: inject context into first user message
    const apiMessages = newMessages.map((m, i) => ({
      role: m.role,
      content: i === newMessages.length - 1 && m.role === 'user'
        ? `${buildContext()}\n\nQuestion: ${m.text}`
        : m.text,
    }));

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Unable to get response. Check your API key.';
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Network error. Make sure the API is reachable.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }
    setLoading(false);
  };

  const renderText = (text) => {
    // Bold **text**, preserve line breaks
    return text.split('\n').map((line, i) => {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <span key={i}>
          {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 200,
          width: 52, height: 52, borderRadius: '50%',
          background: open ? 'var(--navy-700)' : 'linear-gradient(135deg, var(--navy-600), var(--navy-800))',
          border: '2px solid rgba(255,255,255,0.12)',
          boxShadow: '0 6px 24px rgba(5,9,26,0.35)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        title="AI Crisis Coordinator"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M4 4L14 14M14 4L4 14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M17 11.5C17 14.5376 14.0899 17 10.5 17C9.20381 17 7.99613 16.6564 7 16.0587L3 17L4.07069 13.3368C3.39441 12.4056 3 11.2963 3 10.1C3 7.06243 5.91015 4.6 9.5 4.6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="14" cy="5" r="3" fill="#e01f33"/>
            <path d="M13 5H15M14 4V6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        )}
        {/* unread dot */}
        {!open && result && messages.length === 0 && (
          <div style={{
            position: 'absolute', top: 4, right: 4,
            width: 10, height: 10, borderRadius: '50%',
            background: '#e01f33',
            border: '2px solid var(--gray-100)',
          }}/>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 92, right: 28, zIndex: 199,
          width: 360,
          background: 'var(--white)',
          border: '1px solid var(--gray-200)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 20px 60px rgba(5,9,26,0.2)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          animation: 'fadeUp 0.25s ease both',
          maxHeight: '70vh',
        }}>
          {/* Header */}
          <div style={{
            padding: '13px 16px',
            background: 'linear-gradient(135deg, var(--navy-950), var(--navy-900))',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: 'rgba(224,31,51,0.2)',
              border: '1px solid rgba(224,31,51,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#e01f33" strokeWidth="1.4"/>
                <path d="M5 6C5 4.9 5.9 4 7 4C8.1 4 9 4.9 9 6C9 7 8 7.5 7 8V9" stroke="#e01f33" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="7" cy="10.5" r="0.6" fill="#e01f33"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: 'white' }}>
                AI Crisis Coordinator
              </div>
              <div style={{ fontSize: 10, color: 'rgba(168,180,232,0.5)', fontFamily: 'var(--font-mono)' }}>
                Powered by Claude · Context-aware
              </div>
            </div>
            <div style={{
              marginLeft: 'auto', width: 7, height: 7, borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 0 2px rgba(16,185,129,0.25)',
            }}/>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: 'auto',
            padding: '14px 14px 8px',
            display: 'flex', flexDirection: 'column', gap: 10,
            minHeight: 200,
          }}>
            {messages.length === 0 && (
              <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>🤖</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy-800)', marginBottom: 4, fontFamily: 'var(--font-display)' }}>
                  AI Coordinator Ready
                </div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)', lineHeight: 1.5 }}>
                  Run a prediction first, then ask me anything about the crisis response.
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
                gap: 8, alignItems: 'flex-end',
                animation: 'fadeUp 0.25s ease both',
              }}>
                {m.role === 'assistant' && (
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--navy-700), var(--navy-900))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11,
                  }}>🤖</div>
                )}
                <div style={{
                  maxWidth: '78%',
                  padding: '9px 12px',
                  background: m.role === 'user'
                    ? 'linear-gradient(135deg, var(--navy-700), var(--navy-800))'
                    : 'var(--gray-50)',
                  border: m.role === 'user'
                    ? '1px solid var(--navy-600)'
                    : '1px solid var(--gray-200)',
                  borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  <div style={{
                    fontSize: 12, lineHeight: 1.6,
                    color: m.role === 'user' ? 'white' : 'var(--navy-800)',
                  }}>
                    {renderText(m.text)}
                  </div>
                  <div style={{
                    fontSize: 9, color: m.role === 'user' ? 'rgba(255,255,255,0.4)' : 'var(--gray-300)',
                    marginTop: 4, textAlign: 'right',
                    fontFamily: 'var(--font-mono)',
                  }}>{m.time}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--navy-700), var(--navy-900))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                }}>🤖</div>
                <div style={{
                  padding: '10px 14px',
                  background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
                  borderRadius: '14px 14px 14px 4px',
                  display: 'flex', gap: 4, alignItems: 'center',
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 6, height: 6, borderRadius: '50%',
                      background: 'var(--gray-300)',
                      animation: `bounce 1.2s ease ${i * 0.2}s infinite`,
                    }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Quick starters */}
          {messages.length <= 1 && result && (
            <div style={{ padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {STARTERS.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  padding: '5px 10px',
                  background: 'var(--navy-50)', border: '1px solid var(--navy-100)',
                  borderRadius: 99, fontSize: 10, fontWeight: 500,
                  color: 'var(--navy-600)', cursor: 'pointer',
                  fontFamily: 'var(--font-body)',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy-900)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy-50)'; e.currentTarget.style.color = 'var(--navy-600)'; }}
                >{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '10px 12px',
            borderTop: '1px solid var(--gray-100)',
            display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={result ? 'Ask about this crisis...' : 'Run a prediction first...'}
              disabled={!result || loading}
              style={{
                flex: 1, padding: '8px 12px',
                background: 'var(--gray-50)', border: '1px solid var(--gray-200)',
                borderRadius: 99, outline: 'none',
                fontSize: 12, color: 'var(--navy-800)',
                fontFamily: 'var(--font-body)',
                opacity: !result ? 0.5 : 1,
              }}
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || !result || loading}
              style={{
                width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                background: input.trim() && result ? 'var(--navy-900)' : 'var(--gray-100)',
                border: 'none', cursor: input.trim() && result ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7L2 2L5 7L2 12L12 7Z" fill={input.trim() && result ? 'white' : 'var(--gray-300)'} strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
