export default function SucessoPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0F', color: '#F0EEE8', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Pagamento confirmado!</h1>
        <p style={{ color: '#7A7A8A', fontSize: '1.1rem', marginBottom: '2rem' }}>Bem-vindo ao Vaga.ai Pro! Aproveite todos os recursos.</p>
        <a href="/curriculo" style={{ background: '#C8FA5F', color: '#0A0A0F', padding: '0.9rem 2rem', borderRadius: '100px', fontWeight: 700, fontSize: '1rem', textDecoration: 'none' }}>
          Criar meu curriculo
        </a>
      </div>
    </main>
  )
}
