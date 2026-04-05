'use client'
import { useState, useEffect } from 'react'

export default function VagasPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [query, setQuery] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)

  async function searchJobs(q: string) {
    setLoading(true)
    setJobs([])
    try {
      const res = await fetch(`/api/jobs?q=${encodeURIComponent(q)}&t=${Date.now()}`)
      const data = await res.json()
      setJobs(data.jobs || [])
    } catch {
      setJobs([])
    }
    setLoading(false)
  }

  useEffect(() => { searchJobs('developer') }, [])

  function handleSearch() {
    if (!inputValue.trim()) return
    setQuery(inputValue)
    searchJobs(inputValue)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0F' }}>
      <nav style={{ padding: '1rem 2rem', borderBottom: '1px solid #1E1E2E', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="/" style={{ color: '#C8FA5F', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none' }}>Vaga.ai</a>
        <span style={{ color: '#7A7A8A', fontSize: '0.875rem' }}>/ Vagas</span>
      </nav>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: '#F0EEE8' }}>Buscar Vagas</h1>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Ex: React developer, Product Manager, Designer..."
            style={{ flex: 1, background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '100px', padding: '0.75rem 1.25rem', color: '#F0EEE8', fontSize: '0.925rem', outline: 'none' }}
          />
          <button onClick={handleSearch} disabled={loading} style={{ background: '#C8FA5F', color: '#0A0A0F', border: 'none', borderRadius: '100px', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {jobs.map((job, i) => (
            <div key={i} style={{ background: '#13131A', border: '1px solid #1E1E2E', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F0EEE8', marginBottom: '0.25rem' }}>{job.title}</h3>
                  <p style={{ color: '#C8FA5F', fontSize: '0.875rem', fontWeight: 600 }}>{job.company}</p>
                </div>
                {job.logo && <img src={job.logo} alt={job.company} style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'contain', background: '#fff', padding: '4px' }} />}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                {job.location && <span style={{ background: 'rgba(200,250,95,0.08)', border: '1px solid rgba(200,250,95,0.15)', color: '#C8FA5F', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.75rem' }}>{job.location}</span>}
                {job.type && <span style={{ background: '#1E1E2E', color: '#7A7A8A', padding: '0.2rem 0.6rem', borderRadius: '100px', fontSize: '0.75rem' }}>{job.type}</span>}
              </div>
              <p style={{ color: '#7A7A8A', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1rem' }}>{job.description}</p>
              <a href={job.url} target="_blank" rel="noopener noreferrer" style={{ background: '#C8FA5F', color: '#0A0A0F', padding: '0.5rem 1.25rem', borderRadius: '100px', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none', display: 'inline-block' }}>
                Ver vaga →
              </a>
            </div>
          ))}
          {!loading && jobs.length === 0 && (
            <p style={{ color: '#7A7A8A', textAlign: 'center', padding: '3rem' }}>Nenhuma vaga encontrada. Tente outra busca!</p>
          )}
          {loading && (
            <p style={{ color: '#7A7A8A', textAlign: 'center', padding: '3rem' }}>Buscando vagas...</p>
          )}
        </div>
      </div>
    </div>
  )
}
