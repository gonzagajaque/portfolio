import { NextRequest, NextResponse } from 'next/server'
import { projects, experiences, skills } from '@/lib/data'
import { processChatMessage } from '@/lib/chat-service'
import type { Locale } from '@/lib/i18n'

// Helper function to create context from portfolio data
function createPortfolioContext(locale: string) {
  const projectsText = projects
    .map(
      (p) =>
        `- ${p.title} at ${p.company} (${p.period}): ${p.description}. Technologies: ${p.technologies.join(', ')}. Domain: ${p.domain}.`
    )
    .join('\n')

  const experiencesText = experiences
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.period}): ${e.description}. Technologies: ${e.technologies.join(', ')}. Domain: ${e.domain}.`
    )
    .join('\n')

  const skillsText = skills
    .map((cat) => `${cat.name}: ${cat.items.join(', ')}`)
    .join('\n')

  const languageInstructions =
    locale === 'pt'
      ? 'Responda sempre em português brasileiro.'
      : locale === 'es'
        ? 'Responde siempre en español.'
        : 'Always respond in English.'

  return `You are Jaqueline Gonzaga, a Senior Mobile Developer specializing in React Native, TypeScript, and Accessibility (a11y). You have extensive experience in fintech, healthcare, and accessibility engineering.

PORTFOLIO CONTEXT:

PROJECTS:
${projectsText}

EXPERIENCES:
${experiencesText}

SKILLS:
${skillsText}

INSTRUCTIONS:
- ${languageInstructions}
- Answer questions about projects, experiences, technologies, and skills based on the context above.
- Be conversational, friendly, and professional.
- If asked about something not in the context, politely say you don't have that information.
- Focus on technical details, achievements, and impact when relevant.
- Keep responses concise but informative (2-4 sentences typically).`
}

export async function POST(request: NextRequest) {
  // Parse request body first (can only be read once)
  let message: string
  let locale: string = 'pt'
  let conversationHistory: any[] = []

  try {
    const body = await request.json()
    message = body.message
    locale = body.locale || 'pt'
    conversationHistory = body.conversationHistory || []
  } catch (parseError) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 })
  }

  // Fallback function to use local search
  const getLocalSearchResponse = () => {
    const localResponse = processChatMessage(message, locale as Locale)
    return NextResponse.json({ answer: localResponse.answer })
  }

  try {
    // Try server-side API key first, then public key as fallback
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY

    if (!apiKey) {
      // No API key, use local search
      return getLocalSearchResponse()
    }

    const systemContext = createPortfolioContext(locale)

    // Build conversation history for context
    const messages = [
      { role: 'system', content: systemContext },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message },
    ]

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0.7,
        max_tokens: 300,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      const errorMessage = error.error?.message || 'OpenAI API error'
      
      // If quota exceeded or API error, fallback to local search
      if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('exceeded')) {
        console.warn('OpenAI API quota exceeded, falling back to local search')
        return getLocalSearchResponse()
      }
      
      // For other errors, also fallback to local search
      console.warn('OpenAI API error, falling back to local search:', errorMessage)
      return getLocalSearchResponse()
    }

    const data = await response.json()
    const answer = data.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.'

    return NextResponse.json({ answer })
  } catch (error: any) {
    console.error('Chat API error:', error)
    
    // Fallback to local search service on any error
    return getLocalSearchResponse()
  }
}

