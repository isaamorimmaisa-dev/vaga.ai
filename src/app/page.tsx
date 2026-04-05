'use client'
import { useState, useEffect, useRef } from 'react'

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, inView }
}

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  )
}

const steps = [
  { num: '01', title: 'Conta o que voce fez', desc: 'Nao fique olhando para uma pagina em branco. So fala para a IA sua experiencia com suas proprias palavras.', tag: 'IA PROCESSANDO', preview: '"Trabalhei 3 anos como dev React, fiz projetos de e-commerce..."' },
  { num: '02', title: 'A IA formata tudo', desc: 'Nossa IA transforma suas palavras em bullet points profissionais e otimiza para ATS automaticamente.', tag: 'FORMATANDO', preview: 'Desenvolveu 8 projetos de e-commerce com React, aumentando conversao em 40%' },
  { num: '03', title: 'Baixa e aplica', desc: 'Exporte em PDF com um clique. Seu curriculo esta otimizado para ATS e pronto para conquistar a vaga.', tag: 'PDF PRONTO', preview: 'Curriculo gerado · ATS otimizado · Pronto para enviar' },
]

const faqs = [
  { q: 'O Vaga.ai e gratuito?', a: 'Sim! O plano gratuito inclui geracao de curriculo com IA e acesso ao chat de carreira. O plano Pro desbloqueia recursos ilimitados.' },
  { q: 'O curriculo gerado passa em sistemas ATS?', a: 'Sim! Nossa IA foi treinada para criar curriculos otimizados para sistemas ATS, aumentando suas chances de chegar ate a entrevista.' },
  { q: 'Preciso saber escrever bem para usar?', a: 'Nao! Voce so precisa descrever sua experiencia com suas palavras. A IA transforma em linguagem profissional.' },
  { q: 'Em quanto tempo o curriculo fica pronto?', a: 'Em menos de 45 segundos. Voce preenche o formulario, clica em gerar e o curriculo profissional aparece na tela.' },
  { q: 'Posso gerar varios curriculos diferentes?', a: 'No plano gratuito voce pode gerar 1 curriculo. No plano Pro voce gera curriculos ilimitados.' },
]

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [activeStep, setActiveStep] = useState(0)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)
    const interval = setInterval(() => setActiveStep(s => (s + 1) % 3), 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0F', color: '#F0EEE8', fontFamily: "'Space Grotesk', system-ui, sans-serif", overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #C8FA5F; border-radius: 2px; }
      `}</style>

      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 3rem', borderBottom: '1px solid #1E1E2E', position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(20px)' }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>Vaga<span style={{ color: '#C8FA5F' }}>.ai</span></div>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#como-funciona" style={{ color: '#7A7A8A', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Como funciona</a>
          <a href="#faq" style={{ color: '#7A7A8A', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>FAQ</a>
          <a href="/chat" style={{ color: '#7A7A8A', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Chat IA</a>
          <a href="/curriculo" style={{ background: '#C8FA5F', color: '#0A0A0F', padding: '0.55rem 1.4rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', boxShadow: '0 0 20px rgba(200,250,95,0.2)' }}>Criar curriculo</a>
        </div>
      </nav>

      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '7rem 3rem 5rem', position: 'relative' }}>
        <div style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(200,250,95,0.08)', border: '1px solid rgba(200,250,95,0.2)', color: '#C8FA5F', padding: '0.35rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '2rem', letterSpacing: '0.05em' }}>
            Beta — Acesso antecipado aberto
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            Seu curriculo<br />
            <span style={{ color: '#C8FA5F' }}>em 45 segundos.</span><br />
            <span style={{ WebkitTextStroke: '1px rgba(240,238,232,0.25)', color: 'transparent' }}>Com IA.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#7A7A8A', maxWidth: '520px', marginBottom: '2.5rem', lineHeight: '1.7' }}>
            Descreve sua experiencia do jeito que vier. Nossa IA transforma em curriculo profissional, otimizado para ATS, pronto para baixar.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            <a href="/curriculo" style={{ background: '#C8FA5F', color: '#0A0A0F', padding: '0.9rem 2rem', borderRadius: '100px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 0 40px rgba(200,250,95,0.25)', animation: 'float 3s ease-in-out infinite' }}>
              Criar curriculo gratis
            </a>
            <a href="/chat" style={{ color: '#7A7A8A', padding: '0.9rem 2rem', borderRadius: '100px', fontWeight: 600, fontSize: '1rem', textDecoration: 'none', border: '1px solid #1E1E2E' }}>
              Conversar com IA
            </a>
          </div>
          <div style={{ display: 'flex', gap: '3rem', paddingTop: '3rem', borderTop: '1px solid #1E1E2E', flexWrap: 'wrap' }}>
            {[['10k+', 'Curriculos gerados'], ['98%', 'Taxa de satisfacao'], ['45s', 'Tempo medio'], ['3x', 'Mais entrevistas']].map(([num, label]) => (
              <div key={label}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.5rem', fontWeight: 800, color: '#C8FA5F', display: 'block', lineHeight: 1 }}>{num}</span>
                <div style={{ color: '#7A7A8A', fontSize: '0.875rem', marginTop: '0.25rem' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ overflow: 'hidden', borderTop: '1px solid #1E1E2E', borderBottom: '1px solid #1E1E2E', padding: '1rem 0', background: '#13131A' }}>
        <div style={{ display: 'flex', gap: '4rem', animation: 'marquee 20s linear infinite', whiteSpace: 'nowrap' }}>
          {['Curriculo com IA', 'ATS Otimizado', 'Chat de Carreira', 'PDF em 1 clique', 'Sem experiencia necessaria', 'Curriculo com IA', 'ATS Otimizado', 'Chat de Carreira', 'PDF em 1 clique', 'Sem experiencia necessaria'].map((item, i) => (
            <span key={i} style={{ color: '#7A7A8A', fontSize: '0.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ width: 4, height: 4, background: '#C8FA5F', borderRadius: '50%', display: 'inline-block' }} />{item}
            </span>
          ))}
        </div>
      </div>

      <section id="como-funciona" style={{ padding: '7rem 3rem', maxWidth: '1100px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8FA5F', marginBottom: '1rem' }}>Como funciona</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1 }}>Do zero ao curriculo.<br /><span style={{ color: '#C8FA5F' }}>Em 3 passos.</span></h2>
          </div>
        </AnimatedSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', background: '#1E1E2E', borderRadius: '20px', overflow: 'hidden', border: '1px solid #1E1E2E' }}>
          {steps.map((step, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div style={{ background: activeStep === i ? '#16161F' : '#13131A', padding: '2.5rem', cursor: 'pointer', transition: 'background 0.3s', borderLeft: activeStep === i ? '3px solid #C8FA5F' : '3px solid transparent' }} onClick={() => setActiveStep(i)}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '3rem', fontWeight: 800, color: activeStep === i ? '#C8FA5F' : '#2A2A35', lineHeight: 1, flexShrink: 0, transition: 'color 0.3s' }}>{step.num}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'inline-block', background: 'rgba(200,250,95,0.08)', border: '1px solid rgba(200,250,95,0.15)', color: '#C8FA5F', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{step.tag}</div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{step.title}</h3>
                    <p style={{ color: '#7A7A8A', lineHeight: '1.7', marginBottom: activeStep === i ? '1.5rem' : 0, maxHeight: activeStep === i ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.4s ease, margin 0.3s' }}>{step.desc}</p>
                    {activeStep === i && (
                      <div style={{ background: '#0A0A0F', border: '1px solid #1E1E2E', borderRadius: '12px', padding: '1rem 1.25rem', fontFamily: 'monospace', fontSize: '0.875rem', color: '#C8FA5F', lineHeight: '1.6' }}>
                        <span style={{ color: '#7A7A8A', fontSize: '0.75rem', display: 'block', marginBottom: '0.5rem' }}>{step.tag}</span>
                        {step.preview}{i === 0 && <span style={{ animation: 'blink 1s infinite' }}>|</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section style={{ background: '#13131A', borderTop: '1px solid #1E1E2E', borderBottom: '1px solid #1E1E2E', padding: '7rem 3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <AnimatedSection>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8FA5F', marginBottom: '1rem' }}>Funcionalidades</p>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Tudo que voce precisa.</h2>
            </div>
          </AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: '🤖', title: 'Vaga AI', desc: 'Chat inteligente que entende seu perfil e da conselhos personalizados de carreira 24/7.', href: '/chat' },
              { icon: '📄', title: 'Curriculo com IA', desc: 'Descreve com suas palavras. A IA formata e gera um PDF profissional em menos de 1 minuto.', href: '/curriculo' },
              { icon: '✍️', title: 'Editor com IA', desc: 'Edite seu curriculo em tempo real com sugestoes da IA. Clique e aplique melhorias instantaneamente.', href: '/curriculo' },
              { icon: '🎯', title: 'Prep de Entrevistas', desc: 'Simule entrevistas com a IA e receba feedback detalhado nas suas respostas.', href: '/chat' },
              { icon: '🌍', title: 'Traducao', desc: 'Traduza seu curriculo para ingles ou qualquer idioma mantendo o formato profissional.', href: '/chat' },
              { icon: '⚡', title: 'Otimizacao ATS', desc: 'A IA ajusta seu curriculo para maximizar sua pontuacao nos sistemas de triagem automatica.', href: '/curriculo' },
            ].map((f, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <a href={f.href} style={{ background: '#0A0A0F', border: '1px solid #1E1E2E', borderRadius: '16px', padding: '2rem', textDecoration: 'none', display: 'block', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,250,95,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E2E'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{f.icon}</div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', color: '#F0EEE8' }}>{f.title}</h3>
                  <p style={{ color: '#7A7A8A', fontSize: '0.875rem', lineHeight: '1.6' }}>{f.desc}</p>
                </a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" style={{ padding: '7rem 3rem', maxWidth: '800px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8FA5F', marginBottom: '1rem' }}>FAQ</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.03em' }}>Perguntas frequentes.</h2>
          </div>
        </AnimatedSection>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: '#1E1E2E', borderRadius: '16px', overflow: 'hidden' }}>
          {faqs.map((faq, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div style={{ background: '#13131A' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: '100%', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', color: '#F0EEE8', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', textAlign: 'left', fontFamily: "'Space Grotesk', sans-serif" }}>
                  {faq.q}
                  <span style={{ color: '#C8FA5F', fontSize: '1.5rem', lineHeight: 1, transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s', flexShrink: 0, marginLeft: '1rem' }}>+</span>
                </button>
                <div style={{ maxHeight: openFaq === i ? '200px' : 0, overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                  <p style={{ padding: '0 2rem 1.5rem', color: '#7A7A8A', lineHeight: '1.7', fontSize: '0.925rem' }}>{faq.a}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <section style={{ padding: '7rem 3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '300px', background: 'radial-gradient(ellipse, rgba(200,250,95,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <AnimatedSection>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1.5rem' }}>
            Pronto para<br /><span style={{ color: '#C8FA5F' }}>conquistar</span> a vaga?
          </h2>
          <p style={{ color: '#7A7A8A', fontSize: '1.1rem', marginBottom: '2.5rem' }}>Junte-se a milhares de profissionais que ja usam IA para se destacar.</p>
          <a href="/curriculo" style={{ background: '#C8FA5F', color: '#0A0A0F', padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', display: 'inline-block', boxShadow: '0 0 60px rgba(200,250,95,0.3)', animation: 'float 3s ease-in-out infinite' }}>
            Criar meu curriculo gratis
          </a>
        </AnimatedSection>
      </section>

      <footer style={{ borderTop: '1px solid #1E1E2E', padding: '2rem 3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem' }}>Vaga<span style={{ color: '#C8FA5F' }}>.ai</span></div>
          <p style={{ color: '#7A7A8A', fontSize: '0.8rem' }}>2026 Vaga.ai</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/chat" style={{ color: '#7A7A8A', textDecoration: 'none', fontSize: '0.8rem' }}>Chat IA</a>
            <a href="/login" style={{ color: '#7A7A8A', textDecoration: 'none', fontSize: '0.8rem' }}>Login</a>
          </div>
        </div>
      </footer>
    </main>
  )
}