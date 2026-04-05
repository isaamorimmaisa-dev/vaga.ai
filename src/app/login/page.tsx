'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClient()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email ou senha incorretos.')
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    })
  }

  const input = { width: '100%', background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '8px', padding: '0.75rem 1rem', color: '#F0EEE8', fontSize: '0.925rem', outline: 'none', marginBottom: '1rem', fontFamily: 'system-ui' }

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0F', color: '#F0EEE8', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
        <a href="/" style={{ fontWeight: 800, fontSize: '1.5rem', textDecoration: 'none', color: '#F0EEE8', display: 'block', marginBottom: '2rem' }}>Vaga<span style={{ color: '#C8FA5F' }}>.ai</span></a>
        
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Entrar</h1>
        <p style={{ color: '#7A7A8A', marginBottom: '2rem' }}>Bem-vindo de volta!</p>

        {error && <div style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', color: '#ff5050', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}

        <button onClick={handleGoogle} style={{ width: '100%', background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '8px', padding: '0.75rem', color: '#F0EEE8', fontSize: '0.925rem', cursor: 'pointer', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'system-ui' }}>
          <span>G</span> Entrar com Google
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#1E1E2E' }} />
          <span style={{ color: '#7A7A8A', fontSize: '0.8rem' }}>ou</span>
          <div style={{ flex: 1, height: '1px', background: '#1E1E2E' }} />
        </div>

        <label style={{ display: 'block', color: '#7A7A8A', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</label>
        <input style={input} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" />

        <label style={{ display: 'block', color: '#7A7A8A', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Senha</label>
        <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && handleLogin()} />

        <button onClick={handleLogin} disabled={loading} style={{ width: '100%', background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.85rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem', fontFamily: 'system-ui' }}>
          {loading ? 'Entrando...' : 'Entrar →'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#7A7A8A', fontSize: '0.875rem' }}>
          Não tem conta? <a href="/cadastro" style={{ color: '#C8FA5F', textDecoration: 'none', fontWeight: 600 }}>Criar conta grátis</a>
        </p>
      </div>
    </main>
  )
}
