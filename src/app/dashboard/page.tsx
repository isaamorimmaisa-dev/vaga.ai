'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [stats, setStats] = useState({ curriculos: 0, mensagens: 0 })
  const [loading, setLoading] = useState(true)

  const supabase = createClient()

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { window.location.href = '/login'; return }
      setUser(user)

      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(profile)

      const { count: curriculos } = await supabase.from('resumes').select('*', { count: 'exact' }).eq('user_id', user.id)
      const { count: mensagens } = await supabase.from('messages').select('*', { count: 'exact' })
        .eq('role', 'user')

      setStats({ curriculos: curriculos || 0, mensagens: mensagens || 0 })
      setLoading(false)
    }
    load()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return (
    <main style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#7A7A8A' }}>Carregando...</p>
    </main>
  )

  const isPro = profile?.plan === 'pro'

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0F', color: '#F0EEE8', fontFamily: 'system-ui' }}>
      <nav style={{ padding: '1.25rem 3rem', borderBottom: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontWeight: 800, fontSize: '1.5rem', textDecoration: 'none', color: '#F0EEE8' }}>Vaga<span style={{ color: '#C8FA5F' }}>.ai</span></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: '#7A7A8A', fontSize: '0.875rem' }}>{user?.email}</span>
          <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid #1E1E2E', borderRadius: '100px', padding: '0.4rem 1rem', color: '#7A7A8A', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'system-ui' }}>Sair</button>
        </div>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>Olá, {profile?.name || 'usuário'}! 👋</h1>
            <p style={{ color: '#7A7A8A' }}>Bem-vindo ao seu painel</p>
          </div>
          <div style={{ background: isPro ? 'rgba(200,250,95,0.1)' : '#13131A', border: `1px solid ${isPro ? 'rgba(200,250,95,0.3)' : '#1E1E2E'}`, borderRadius: '100px', padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 700, color: isPro ? '#C8FA5F' : '#7A7A8A' }}>
            {isPro ? '✦ Pro' : 'Plano Grátis'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Currículos gerados', value: stats.curriculos, limit: isPro ? '∞' : '1' },
            { label: 'Mensagens hoje', value: stats.mensagens, limit: isPro ? '∞' : '5' },
            { label: 'Plano atual', value: isPro ? 'Pro' : 'Grátis', limit: null },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '12px', padding: '1.5rem' }}>
              <p style={{ color: '#7A7A8A', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</p>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: '#C8FA5F', lineHeight: 1 }}>{stat.value}</p>
              {stat.limit && <p style={{ color: '#7A7A8A', fontSize: '0.75rem', marginTop: '0.25rem' }}>de {stat.limit}</p>}
            </div>
          ))}
        </div>

        {!isPro && (
          <div style={{ background: 'rgba(200,250,95,0.05)', border: '1px solid rgba(200,250,95,0.2)', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: '0.25rem' }}>Upgrade para Pro</h3>
              <p style={{ color: '#7A7A8A', fontSize: '0.875rem' }}>Currículos ilimitados, chat sem limites e muito mais</p>
            </div>
            <a href="/precos" style={{ background: '#C8FA5F', color: '#0A0A0F', padding: '0.7rem 1.5rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>Ver planos →</a>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <a href="/curriculo" style={{ background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '16px', padding: '2rem', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#F0EEE8', marginBottom: '0.5rem' }}>Criar currículo</h3>
            <p style={{ color: '#7A7A8A', fontSize: '0.875rem' }}>Gere um currículo profissional com IA em 45 segundos</p>
          </a>
          <a href="/chat" style={{ background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '16px', padding: '2rem', textDecoration: 'none', display: 'block' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🤖</div>
            <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#F0EEE8', marginBottom: '0.5rem' }}>Chat com IA</h3>
            <p style={{ color: '#7A7A8A', fontSize: '0.875rem' }}>Converse com a Vaga AI sobre sua carreira</p>
          </a>
        </div>
      </div>
    </main>
  )
}
