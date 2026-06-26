import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import ExpenseTracker from './ExpenseTracker.jsx';

const ACCENT = '#138A4A';

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = still checking

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div style={center}>
        <div style={{ color: '#6B7280', fontFamily: 'system-ui' }}>Loading…</div>
      </div>
    );
  }
  if (!session) return <Login />;
  // key forces a fresh load of the tracker per user, so data never bleeds across accounts
  return <ExpenseTracker onSignOut={() => supabase.auth.signOut()} key={session.user.id} />;
}

function Login() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState(null); // { ok, text }
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    if (e) e.preventDefault();
    if (!email || !pw) { setMsg({ ok: false, text: 'Enter your email and a password.' }); return; }
    setBusy(true); setMsg(null);
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password: pw });
        if (error) throw error;
        if (!data.session) {
          setMsg({ ok: true, text: 'Account made! If sign-in does not start automatically, just press Sign in.' });
          setMode('signin');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: pw });
        if (error) throw error;
      }
    } catch (err) {
      setMsg({ ok: false, text: err.message || 'Something went wrong.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div style={center}>
      <form onSubmit={submit} style={card}>
        <div style={{ fontSize: 40, textAlign: 'center', marginBottom: 4 }}>🪙</div>
        <h1 style={{ margin: 0, textAlign: 'center', fontSize: 22, fontWeight: 700, color: '#16271C' }}>
          Kuekadoodledoo
        </h1>
        <p style={{ marginTop: 6, marginBottom: 18, textAlign: 'center', fontSize: 13, color: '#6B7280' }}>
          {mode === 'signin' ? 'Welcome back — sign in to your tracker.' : 'Create an account to start tracking.'}
        </p>

        <label style={lbl}>Email</label>
        <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com" style={input} />

        <label style={lbl}>Password</label>
        <input type="password" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
          value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" style={input} />

        {msg && (
          <div style={{ fontSize: 12.5, marginTop: 4, marginBottom: 4, color: msg.ok ? ACCENT : '#DC2626' }}>
            {msg.text}
          </div>
        )}

        <button type="submit" disabled={busy} style={{ ...primary, opacity: busy ? 0.6 : 1 }}>
          {busy ? 'Please wait…' : (mode === 'signin' ? 'Sign in' : 'Create account')}
        </button>

        <button type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMsg(null); }}
          style={linkBtn}>
          {mode === 'signin' ? "New here? Create an account" : 'Already have an account? Sign in'}
        </button>
      </form>
    </div>
  );
}

const center = { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#EDF4ED', padding: 20, fontFamily: 'system-ui, -apple-system, sans-serif' };
const card = { width: '100%', maxWidth: 360, background: '#fff', borderRadius: 22, padding: 24, boxShadow: '0 12px 40px rgba(0,0,0,0.10)' };
const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#6B7280', margin: '10px 0 5px' };
const input = { width: '100%', boxSizing: 'border-box', padding: '11px 13px', borderRadius: 12, border: '1px solid #E5E7EB', outline: 'none', fontSize: 15, background: '#F9FAFB' };
const primary = { width: '100%', marginTop: 16, padding: '12px', borderRadius: 12, border: 'none', background: ACCENT, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' };
const linkBtn = { width: '100%', marginTop: 12, padding: 6, border: 'none', background: 'transparent', color: ACCENT, fontSize: 13, fontWeight: 600, cursor: 'pointer' };
