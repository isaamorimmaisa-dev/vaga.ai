export default function ObrigadoPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0F', color: '#F0EEE8', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>Compra confirmada!</h1>
        <p style={{ color: '#7A7A8A', fontSize: '1.1rem', marginBottom: '0.5rem', maxWidth: '500px' }}>Bem-vindo ao Vaga.ai! Seu acesso foi liberado.</p>
        <p style={{ color: '#7A7A8A', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '500px' }}>Clique abaixo para começar a criar seu curriculo profissional com IA agora mesmo.</p>
        <a href="/curriculo" style={{ background: '#C8FA5F', color: '#0A0A0F', padding: '1rem 2.5rem', borderRadius: '100px', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', display: 'inline-block', marginBottom: '1rem' }}>
          Criar meu curriculo agora →
        </a>
        <br />
        <a href="/chat" style={{ color: '#7A7A8A', fontSize: '0.875rem', textDecoration: 'none' }}>
          Ou conversar com a Vaga AI →
        </a>
      </div>
    </main>
  )
}
