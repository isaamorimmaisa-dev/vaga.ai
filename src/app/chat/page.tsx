'use client'
import { useState } from 'react'

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: 'Olá! Sou a Vaga AI 👋 Como posso ajudar sua carreira hoje? Posso buscar vagas, melhorar seu currículo ou te preparar para entrevistas!' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

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
        body: JSON.stringify({ messages: newMessages.filter(m => m.role !== 'assistant' || newMessages.indexOf(m) > 0) })
      })
      const data = await res.json()
      setMessages([...newMessages, { role: 'assistant', content: data.message }])
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Erro ao conectar. Tente novamente!' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="/" style={{ color: '#C8FA5F', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none' }}>Vaga.ai</a>
        <span style={{ color: '#7A7A8A', fontSize: '0.875rem' }}>/ Chat</span>
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
            style={{ flex: 1, background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '100px', padding: '0.75rem 1.25rem', color: '#F0EEE8', fontSize: '0.925rem', outline: 'none' }}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.925rem' }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
