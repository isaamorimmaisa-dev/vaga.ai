import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!
})

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    max_tokens: 1024,
    messages: [
      {
        role: 'system',
        content: `Você é a Vaga AI, assistente de carreira especializada no mercado brasileiro. Você ajuda candidatos a encontrar vagas, melhorar currículos e se preparar para entrevistas. Seja direto, amigável e sempre em português brasileiro.`
      },
      ...messages
    ]
  })

  const text = response.choices[0]?.message?.content || ''
  return NextResponse.json({ message: text })
}
