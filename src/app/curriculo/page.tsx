'use client'
import { useState } from 'react'

export default function CurriculoPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [resume, setResume] = useState<any>(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '',
    title: '', summary: '', experience: '', education: '', skills: ''
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function generateResume() {
    setLoading(true)
    try {
      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userData: form })
      })
      const data = await res.json()
      setResume(data.resume)
      setStep(3)
    } catch {
      alert('Erro ao gerar currículo. Tente novamente.')
    }
    setLoading(false)
  }

  const inputStyle = { width: '100%', background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '8px', padding: '0.75rem 1rem', color: '#F0EEE8', fontSize: '0.925rem', outline: 'none', marginBottom: '1rem' }
  const labelStyle = { display: 'block', color: '#7A7A8A', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F' }}>
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="/" style={{ color: '#C8FA5F', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none' }}>Vaga.ai</a>
        <span style={{ color: '#7A7A8A', fontSize: '0.875rem' }}>/ Currículo</span>
      </nav>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '2rem' }}>
        {step === 1 && (
          <>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Criar Currículo com IA</h1>
            <p style={{ color: '#7A7A8A', marginBottom: '2rem' }}>Preencha seus dados e a IA gera um currículo profissional em segundos.</p>

            <label style={labelStyle}>Nome completo</label>
            <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ex: João Silva" />

            <label style={labelStyle}>Email</label>
            <input style={inputStyle} value={form.email} onChange={e => update('email', e.target.value)} placeholder="joao@email.com" />

            <label style={labelStyle}>Telefone</label>
            <input style={inputStyle} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="(11) 99999-9999" />

            <label style={labelStyle}>Cidade / Estado</label>
            <input style={inputStyle} value={form.location} onChange={e => update('location', e.target.value)} placeholder="São Paulo, SP" />

            <label style={labelStyle}>Cargo desejado</label>
            <input style={inputStyle} value={form.title} onChange={e => update('title', e.target.value)} placeholder="Ex: Desenvolvedor React Senior" />

            <button onClick={() => setStep(2)} style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
              Próximo →
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Experiência e Habilidades</h1>
            <p style={{ color: '#7A7A8A', marginBottom: '2rem' }}>Descreva com suas palavras — a IA vai formatar tudo profissionalmente.</p>

            <label style={labelStyle}>Experiência profissional</label>
            <textarea style={{ ...inputStyle, height: '120px', resize: 'vertical' }} value={form.experience} onChange={e => update('experience', e.target.value)} placeholder="Ex: Trabalhei 3 anos na empresa X como desenvolvedor, fiz projetos de..." />

            <label style={labelStyle}>Formação acadêmica</label>
            <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }} value={form.education} onChange={e => update('education', e.target.value)} placeholder="Ex: Graduação em Ciência da Computação na USP (2018-2022)" />

            <label style={labelStyle}>Habilidades principais</label>
            <input style={inputStyle} value={form.skills} onChange={e => update('skills', e.target.value)} placeholder="Ex: React, Node.js, Python, SQL, inglês avançado" />

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', color: '#7A7A8A', border: '1px solid #1E1E2E', borderRadius: '100px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
                ← Voltar
              </button>
              <button onClick={generateResume} disabled={loading} style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.75rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                {loading ? 'Gerando com IA...' : 'Gerar Currículo ✨'}
              </button>
            </div>
          </>
        )}

        {step === 3 && resume && (
          <div style={{ background: '#fff', borderRadius: '12px', padding: '2.5rem', color: '#111' }}>
            <div style={{ borderBottom: '3px solid #C8FA5F', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0A0A0F' }}>{resume.name}</h1>
              <p style={{ color: '#444', fontWeight: 600, marginBottom: '0.5rem' }}>{resume.title}</p>
              <p style={{ color: '#666', fontSize: '0.875rem' }}>{resume.email} · {resume.phone} · {resume.location}</p>
            </div>

            <p style={{ color: '#333', marginBottom: '1.5rem', lineHeight: '1.7' }}>{resume.summary}</p>

            {resume.experience?.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontWeight: 800, borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#0A0A0F' }}>Experiência</h2>
                {resume.experience.map((exp: any, i: number) => (
                  <div key={i} style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{exp.role}</strong>
                      <span style={{ color: '#666', fontSize: '0.875rem' }}>{exp.period}</span>
                    </div>
                    <p style={{ color: '#444', fontSize: '0.875rem', fontWeight: 600 }}>{exp.company}</p>
                    <p style={{ color: '#555', fontSize: '0.875rem', marginTop: '0.25rem' }}>{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {resume.skills?.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontWeight: 800, borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#0A0A0F' }}>Habilidades</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {resume.skills.map((skill: string, i: number) => (
                    <span key={i} style={{ background: '#f0f0f0', padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.875rem' }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button onClick={() => window.print()} style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
                Imprimir / Salvar PDF
              </button>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', color: '#666', border: '1px solid #ddd', borderRadius: '100px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
                Novo currículo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
