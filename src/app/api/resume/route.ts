import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Groq({ apiKey: process.env.GROQ_API_KEY! })

export async function POST(req: NextRequest) {
  const { userData } = await req.json()

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 2048,
    messages: [{
      role: 'user',
      content: `Crie um currículo profissional completo em JSON para essa pessoa: ${JSON.stringify(userData)}
Retorne APENAS um JSON válido com essa estrutura:
{"name":"","title":"","email":"","phone":"","location":"","summary":"","experience":[{"company":"","role":"","period":"","description":""}],"education":[{"institution":"","degree":"","period":""}],"skills":[],"languages":[]}`
    }]
  })

  const text = response.choices[0]?.message?.content || '{}'
  const clean = text.replace(/\`\`\`json|\`\`\`/g, '').trim()

  try {
    const resume = JSON.parse(clean)
    return NextResponse.json({ resume })
  } catch {
    return NextResponse.json({ error: 'Erro ao gerar currículo' }, { status: 500 })
  }
}
