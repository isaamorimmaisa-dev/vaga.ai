'use client'
import { useState } from 'react'

export default function CurriculoPage() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [resume, setResume] = useState<any>(null)
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', location: '', linkedin: '', github: '',
    title: '', experience: '', education: '', skills: '', achievements: ''
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
      if (data.resume) { setResume(data.resume); setStep(3) }
      else alert(data.message || 'Erro ao gerar currículo.')
    } catch { alert('Erro ao gerar currículo.') }
    setLoading(false)
  }

  async function editWithAI() {
    if (!chatInput.trim()) return
    setChatLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{
            role: 'user',
            content: `Tenho esse currículo em JSON: ${JSON.stringify(resume)}. 
Instrução: ${chatInput}
Retorne APENAS o JSON atualizado do currículo, sem explicações.`
          }]
        })
      })
      const data = await res.json()
      const clean = data.message.replace(/\`\`\`json|\`\`\`/g, '').trim()
      const updated = JSON.parse(clean)
      setResume(updated)
      setChatInput('')
    } catch { alert('Erro ao editar. Tente novamente.') }
    setChatLoading(false)
  }

  const inputStyle: React.CSSProperties = { width: '100%', background: '#0A0A0F', border: '1px solid #1E1E2E', borderRadius: '8px', padding: '0.75rem 1rem', color: '#F0EEE8', fontSize: '0.875rem', outline: 'none', marginBottom: '1rem', fontFamily: 'system-ui', resize: 'vertical' as const }
  const labelStyle: React.CSSProperties = { display: 'block', color: '#7A7A8A', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.05em' }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F', color: '#F0EEE8', fontFamily: 'system-ui' }}>
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0A0A0F', position: 'sticky', top: 0, zIndex: 10 }}>
        <a href="/" style={{ color: '#C8FA5F', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none' }}>Vaga.ai</a>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {step === 3 && <button onClick={() => window.print()} style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.5rem 1.25rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'system-ui' }}>⬇ Exportar PDF</button>}
          <span style={{ color: '#7A7A8A', fontSize: '0.875rem' }}>Currículo com IA</span>
        </div>
      </nav>

      {step === 1 && (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Informações pessoais</h1>
          <p style={{ color: '#7A7A8A', marginBottom: '2rem' }}>Passo 1 de 2</p>

          <label style={labelStyle}>Nome completo</label>
          <input style={inputStyle} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Ex: João Silva" />

          <label style={labelStyle}>Cargo desejado</label>
          <input style={inputStyle} value={form.title} onChange={e => update('title', e.target.value)} placeholder="Ex: Desenvolvedor React Senior" />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Email</label>
              <input style={{ ...inputStyle, marginBottom: 0 }} value={form.email} onChange={e => update('email', e.target.value)} placeholder="seu@email.com" />
            </div>
            <div>
              <label style={labelStyle}>Telefone</label>
              <input style={{ ...inputStyle, marginBottom: 0 }} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="(11) 99999-9999" />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>LinkedIn</label>
              <input style={{ ...inputStyle, marginBottom: 0 }} value={form.linkedin} onChange={e => update('linkedin', e.target.value)} placeholder="linkedin.com/in/joao" />
            </div>
            <div>
              <label style={labelStyle}>GitHub (opcional)</label>
              <input style={{ ...inputStyle, marginBottom: 0 }} value={form.github} onChange={e => update('github', e.target.value)} placeholder="github.com/joao" />
            </div>
          </div>
          <div style={{ marginBottom: '1rem' }} />

          <label style={labelStyle}>Cidade / Estado</label>
          <input style={inputStyle} value={form.location} onChange={e => update('location', e.target.value)} placeholder="São Paulo, SP" />

          <button onClick={() => setStep(2)} style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.85rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', fontFamily: 'system-ui' }}>
            Próximo →
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '3rem 2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Experiência e habilidades</h1>
          <p style={{ color: '#7A7A8A', marginBottom: '2rem' }}>Passo 2 de 2 — Escreva do jeito que vier, a IA formata tudo!</p>

          <label style={labelStyle}>Experiência profissional</label>
          <textarea style={{ ...inputStyle, height: '120px' }} value={form.experience} onChange={e => update('experience', e.target.value)} placeholder="Ex: Trabalhei 3 anos na empresa X como dev React, fiz projetos de e-commerce..." />

          <label style={labelStyle}>Formação acadêmica</label>
          <textarea style={{ ...inputStyle, height: '80px' }} value={form.education} onChange={e => update('education', e.target.value)} placeholder="Ex: Graduação em Ciência da Computação na USP (2018-2022)" />

          <label style={labelStyle}>Habilidades e tecnologias</label>
          <input style={inputStyle} value={form.skills} onChange={e => update('skills', e.target.value)} placeholder="Ex: React, Node.js, Python, SQL, inglês avançado" />

          <label style={labelStyle}>Conquistas e projetos (opcional)</label>
          <textarea style={{ ...inputStyle, height: '80px' }} value={form.achievements} onChange={e => update('achievements', e.target.value)} placeholder="Ex: Hackathon vencedor 2023, projeto open source com 500 stars..." />

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => setStep(1)} style={{ background: 'transparent', color: '#7A7A8A', border: '1px solid #1E1E2E', borderRadius: '100px', padding: '0.85rem 1.5rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui' }}>← Voltar</button>
            <button onClick={generateResume} disabled={loading} style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.85rem 2rem', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', fontFamily: 'system-ui', flex: 1 }}>
              {loading ? 'Gerando com IA...' : 'Gerar Currículo ✨'}
            </button>
          </div>
        </div>
      )}

      {step === 3 && resume && (
        <div style={{ display: 'flex', height: 'calc(100vh - 57px)' }}>

          {/* PREVIEW DO CURRÍCULO */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', background: '#1A1A1A', display: 'flex', justifyContent: 'center' }}>
            <div id="resume-print" style={{ background: '#fff', width: '210mm', minHeight: '297mm', padding: '12mm 14mm', color: '#111', fontFamily: 'Georgia, serif', fontSize: '10pt', lineHeight: '1.4', boxShadow: '0 4px 40px rgba(0,0,0,0.4)' }}>
              
              {/* HEADER */}
              <div style={{ textAlign: 'center', marginBottom: '8mm', borderBottom: '2px solid #111', paddingBottom: '4mm' }}>
                <h1 style={{ fontSize: '22pt', fontWeight: 700, margin: '0 0 2mm', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.5px' }}>{resume.name}</h1>
                <p style={{ fontSize: '11pt', color: '#444', margin: '0 0 3mm', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>{resume.title}</p>
                <div style={{ fontSize: '8.5pt', color: '#555', fontFamily: 'Arial, sans-serif', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  {resume.location && <span>📍 {resume.location}</span>}
                  {resume.email && <span>✉ {resume.email}</span>}
                  {resume.phone && <span>📞 {resume.phone}</span>}
                  {resume.linkedin && <span>in {resume.linkedin}</span>}
                  {resume.github && <span>⌥ {resume.github}</span>}
                </div>
              </div>

              {/* RESUMO */}
              {resume.summary && (
                <div style={{ marginBottom: '6mm' }}>
                  <h2 style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '1mm', marginBottom: '3mm', fontFamily: 'Arial, sans-serif' }}>Resumo</h2>
                  <p style={{ margin: 0, color: '#333', textAlign: 'justify' }}>{resume.summary}</p>
                </div>
              )}

              {/* EXPERIÊNCIA */}
              {resume.experience?.length > 0 && (
                <div style={{ marginBottom: '6mm' }}>
                  <h2 style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '1mm', marginBottom: '3mm', fontFamily: 'Arial, sans-serif' }}>Experiência Profissional</h2>
                  {resume.experience.map((exp: any, i: number) => (
                    <div key={i} style={{ marginBottom: '4mm' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <strong style={{ fontFamily: 'Arial, sans-serif', fontSize: '10pt' }}>{exp.role}</strong>
                        <span style={{ color: '#666', fontSize: '8.5pt', fontFamily: 'Arial, sans-serif' }}>{exp.period}</span>
                      </div>
                      <p style={{ margin: '1mm 0', color: '#444', fontSize: '9pt', fontFamily: 'Arial, sans-serif', fontStyle: 'italic' }}>{exp.company}</p>
                      <p style={{ margin: 0, color: '#333', fontSize: '9pt' }}>{exp.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* EDUCAÇÃO */}
              {resume.education?.length > 0 && (
                <div style={{ marginBottom: '6mm' }}>
                  <h2 style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '1mm', marginBottom: '3mm', fontFamily: 'Arial, sans-serif' }}>Formação Acadêmica</h2>
                  {resume.education.map((edu: any, i: number) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2mm' }}>
                      <div>
                        <strong style={{ fontFamily: 'Arial, sans-serif', fontSize: '10pt' }}>{edu.degree}</strong>
                        <p style={{ margin: '1mm 0 0', color: '#444', fontSize: '9pt', fontFamily: 'Arial, sans-serif' }}>{edu.institution}</p>
                      </div>
                      <span style={{ color: '#666', fontSize: '8.5pt', fontFamily: 'Arial, sans-serif' }}>{edu.period}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* HABILIDADES */}
              {resume.skills?.length > 0 && (
                <div style={{ marginBottom: '6mm' }}>
                  <h2 style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '1mm', marginBottom: '3mm', fontFamily: 'Arial, sans-serif' }}>Habilidades</h2>
                  <p style={{ margin: 0, color: '#333' }}>{resume.skills.join(' • ')}</p>
                </div>
              )}

              {/* IDIOMAS */}
              {resume.languages?.length > 0 && (
                <div>
                  <h2 style={{ fontSize: '10pt', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #ccc', paddingBottom: '1mm', marginBottom: '3mm', fontFamily: 'Arial, sans-serif' }}>Idiomas</h2>
                  <p style={{ margin: 0, color: '#333' }}>{resume.languages.join(' • ')}</p>
                </div>
              )}
            </div>
          </div>

         <div id="ai-panel" style={{ width: '320px', background: '#13131A'...
          id="ai-panel"=style={{ width: '320px', background: '#13131A', borderLeft: '1px solid #1E1E2E', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #1E1E2E' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', background: 'rgba(200,250,95,0.15)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>✨</div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', margin: 0 }}>Assistente de IA</p>
                  <p style={{ color: '#7A7A8A', fontSize: '0.75rem', margin: 0 }}>Edite seu currículo com IA</p>
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
              <p style={{ color: '#7A7A8A', fontSize: '0.8rem', marginBottom: '1rem' }}>Experimente:</p>
              {[
                'Torne o resumo mais impactante',
                'Adicione mais palavras-chave para ATS',
                'Deixe a experiência mais concisa',
                'Traduza para inglês',
              ].map((sugg, i) => (
                <button key={i} onClick={() => setChatInput(sugg)} style={{ display: 'block', width: '100%', textAlign: 'left', background: '#0A0A0F', border: '1px solid #1E1E2E', borderRadius: '8px', padding: '0.6rem 0.75rem', color: '#7A7A8A', fontSize: '0.8rem', cursor: 'pointer', marginBottom: '0.5rem', fontFamily: 'system-ui', transition: 'border-color 0.2s' }}>
                  {sugg}
                </button>
              ))}
            </div>

            <div style={{ padding: '1rem', borderTop: '1px solid #1E1E2E' }}>
              <textarea
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Peça à IA para editar..."
                style={{ width: '100%', background: '#0A0A0F', border: '1px solid #1E1E2E', borderRadius: '8px', padding: '0.75rem', color: '#F0EEE8', fontSize: '0.8rem', outline: 'none', fontFamily: 'system-ui', resize: 'none', height: '80px', marginBottom: '0.75rem' }}
              />
              <button onClick={editWithAI} disabled={chatLoading} style={{ width: '100%', background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.7rem', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'system-ui' }}>
                {chatLoading ? 'Editando...' : 'Aplicar edição ✨'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media print {
  nav, .no-print, #ai-panel { display: none !important; }
  body { background: white !important; margin: 0 !important; }
  #resume-print { box-shadow: none !important; width: 100% !important; margin: 0 !important; }
  * { -webkit-print-color-adjust: exact; }
}
          nav, .no-print { display: none !important; }
          body { background: white !important; }
          #resume-print { box-shadow: none !important; width: 100% !important; }
        }
      `}</style>
    </div>
  )
}