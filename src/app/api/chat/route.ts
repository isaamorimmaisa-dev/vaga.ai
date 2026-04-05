import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const client = new Groq({ apiKey: process.env.GROQ_API_KEY! })

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll() { return cookieStore.getAll() }, setAll() {} } }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
    
    if (profile?.plan === 'free') {
      const today = new Date().toISOString().split('T')[0]
      if (profile.last_reset !== today) {
        await supabase.from('profiles').update({ mensagens_count: 0, last_reset: today }).eq('id', user.id)
      } else if (profile.mensagens_count >= 5) {
        return NextResponse.json({ error: 'limite', message: 'Você atingiu o limite de 5 mensagens por dia. Faça upgrade para Pro!' }, { status: 403 })
      }
      await supabase.from('profiles').update({ mensagens_count: (profile.mensagens_count || 0) + 1 }).eq('id', user.id)
    }
  }

  const { messages } = await req.json()

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1024,
    messages: [
      { role: 'system', content: 'Você é a Vaga AI, assistente de carreira especializada no mercado brasileiro. Ajuda candidatos a encontrar vagas, melhorar currículos e se preparar para entrevistas. Seja direto, amigável e sempre em português brasileiro.' },
      ...messages
    ]
  })

  const text = response.choices[0]?.message?.content || ''
  return NextResponse.json({ message: text })
}
