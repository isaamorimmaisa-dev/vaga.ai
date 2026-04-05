'use client'
import { useState } from 'react'

export default function PrecosPage() {
  const [loading, setLoading] = useState(false)

  async function assinarPro() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'pro' })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('Erro ao processar. Tente novamente.')
    }
    setLoading(false)
  }

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0F', color: '#F0EEE8', fontFamily: 'system-ui, sans-serif' }}>
      <nav style={{ padding: '1.25rem 3rem', borderBottom: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ fontWeight: 800, fontSize: '1.5rem', textDecoration: 'none', color: '#F0EEE8' }}>Vaga<span style={{ color: '#C8FA5F' }}>.ai</span></a>
      </nav>
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8FA5F', marginBottom: '1rem' }}>Precos</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem' }}>Simples. Transparente.</h1>
        <p style={{ color: '#7A7A8A', marginBottom: '4rem', fontSize: '1.1rem' }}>Comece gratis. Upgrade quando precisar.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '20px', padding: '2rem', textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#7A7A8A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Gratis</div>
            <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.25rem' }}>R$0</div>
            <div style={{ color: '#7A7A8A', fontSize: '0.85rem', marginBottom: '2rem' }}>para sempre</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {['1 curriculo', 'Chat IA basico', '5 mensagens/dia', 'PDF para baixar'].map(f => (
                <div key={f} style={{ fontSize: '0.875rem', color: '#7A7A8A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#C8FA5F', fontWeight: 700 }}>v</span> {f}
                </div>
              ))}
            </div>
            <a href="/curriculo" style={{ display: 'block', textAlign: 'center', padding: '0.7rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', border: '1px solid #1E1E2E', color: '#7A7A8A' }}>Comecar gratis</a>
          </div>
          <div style={{ background: 'rgba(200,250,95,0.04)', border: '1px solid rgba(200,250,95,0.3)', borderRadius: '20px', padding: '2rem', textAlign: 'left', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: '#C8FA5F', color: '#0A0A0F', fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.3rem 0.9rem', borderRadius: '100px' }}>Mais popular</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#C8FA5F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Pro</div>
            <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.25rem', color: '#C8FA5F' }}>R$15</div>
            <div style={{ color: '#7A7A8A', fontSize: '0.85rem', marginBottom: '2rem' }}>/mes - cancele quando quiser</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
              {['Curriculos ilimitados', 'Chat IA sem limites', 'Cartas de apresentacao', 'Prep de entrevistas', 'Traducao de documentos', 'Otimizacao ATS'].map(f => (
                <div key={f} style={{ fontSize: '0.875rem', color: '#F0EEE8', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#C8FA5F', fontWeight: 700 }}>v</span> {f}
                </div>
              ))}
            </div>
            <button onClick={assinarPro} disabled={loading} style={{ display: 'block', width: '100%', textAlign: 'center', padding: '0.7rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.875rem', background: '#C8FA5F', color: '#0A0A0F', border: 'none', cursor: 'pointer' }}>
              {loading ? 'Aguarde...' : 'Assinar Pro'}
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
