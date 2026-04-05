'use client'
import { useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Olá! Sou a Vaga AI 👋 Como posso ajudar sua carreira hoje?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)

  async function sendMessage() {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      })
      const data = await res.json()
      
      if (res.status === 403 && data.error === 'limite') {
        setShowUpgrade(true)
        setMessages([...newMessages, { role: 'assistant', content: '⚠️ ' + data.message }])
      } else {
        setMessages([...newMessages, { role: 'assistant', content: data.message }])
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Erro ao conectar. Tente novamente!' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', flexDirection: 'column' }}>
      {showUpgrade && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#13131A', border: '1px solid rgba(200,250,95,0.3)', borderRadius: '20px', padding: '2.5rem', maxWidth: '420px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', color: '#F0EEE8' }}>Limite atingido!</h2>
            <p style={{ color: '#7A7A8A', marginBottom: '2rem', lineHeight: '1.6' }}>Você usou suas 5 mensagens diárias do plano grátis. Faça upgrade para Pro e tenha acesso ilimitado!</p>
            <a href="/precos" style={{ display: 'block', background: '#C8FA5F', color: '#0A0A0F', padding: '0.85rem', borderRadius: '100px', fontWeight: 700, textDecoration: 'none', marginBottom: '1rem' }}>Ver plano Pro — R$15/mês →</a>
            <button onClick={() => setShowUpgrade(false)} style={{ background: 'transparent', border: 'none', color: '#7A7A8A', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'system-ui' }}>Fechar</button>
          </div>
        </div>
      )}

      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ color: '#C8FA5F', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none' }}>Vaga.ai</a>
        <a href="/dashboard" style={{ color: '#7A7A8A', fontSize: '0.875rem', textDecoration: 'none' }}>Minha conta</a>
      </nav>

      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? 'rgba(200,250,95,0.12)' : '#13131A',
            border: msg.role === 'user' ? '1px solid rgba(200,250,95,0.2)' : '1px solid #1E1E2E',
            borderRadius: msg.role === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
            padding: '0.75rem 1rem',
            maxWidth: '75%',
            color: msg.role === 'user' ? '#C8FA5F' : '#F0EEE8',
            fontSize: '0.925rem',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap'
          }}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '4px 12px 12px 12px', padding: '0.75rem 1rem', color: '#7A7A8A', fontSize: '0.875rem' }}>
            Digitando...
          </div>
        )}
      </div>

      <div style={{ padding: '1rem 2rem', borderTop: '1px solid #1E1E2E', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Pergunte sobre vagas, currículo, entrevistas..."
            style={{ flex: 1, background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '100px', padding: '0.75rem 1.25rem', color: '#F0EEE8', fontSize: '0.925rem', outline: 'none', fontFamily: 'system-ui' }}
          />
          <button onClick={sendMessage} disabled={loading} style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.925rem', fontFamily: 'system-ui' }}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}