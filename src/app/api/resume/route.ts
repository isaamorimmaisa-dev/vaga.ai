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

    if (profile?.plan === 'free' && (profile.curriculos_count || 0) >= 1) {
      return NextResponse.json({ error: 'limite', message: 'Você atingiu o limite de 1 currículo no plano grátis. Faça upgrade para Pro!' }, { status: 403 })
    }

    if (user) {
      await supabase.from('profiles').update({ curriculos_count: (profile?.curriculos_count || 0) + 1 }).eq('id', user.id)
    }
  }

  const { userData } = await req.json()

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Crie um curriculo profissional completo em JSON para essa pessoa: ${JSON.stringify(userData)}
Retorne APENAS um JSON valido com essa estrutura:
{"name":"","title":"","email":"","phone":"","location":"","summary":"","experience":[{"company":"","role":"","period":"","description":""}],"education":[{"institution":"","degree":"","period":""}],"skills":[],"languages":[]}`
    }]
  })

  const text = response.choices[0]?.message?.content || '{}'
  const clean = text.replace(/\`\`\`json|\`\`\`/g, '').trim()

  try {
    const resume = JSON.parse(clean)
    return NextResponse.json({ resume })
  } catch {
    return NextResponse.json({ error: 'Erro ao gerar curriculo' }, { status: 500 })
  }
}
