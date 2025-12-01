'use client'

import { useState, FormEvent, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { projects, experiences, skills } from '@/lib/data'
import { processChatMessage } from '@/lib/chat-service'

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export const ChatPage: React.FC = () => {
  const { t, locale } = useLanguage()
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
    
    // Add welcome message
    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      text: t('hero.chatWelcome') || 'Olá! Sou Jaqueline Gonzaga. Pergunte-me sobre minhas experiências, projetos, tecnologias ou acessibilidade!',
      isUser: false,
      timestamp: new Date(),
    }
    setChatMessages([welcomeMsg])
  }, [t])

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const userMessage = chatInput.trim()
    if (!userMessage || isProcessing) return

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: userMessage,
      isUser: true,
      timestamp: new Date(),
    }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')
    setIsProcessing(true)

    try {
      // Build conversation history for context
      const conversationHistory = chatMessages
        .filter(msg => msg.id !== 'welcome')
        .map(msg => ({
          role: msg.isUser ? 'user' as const : 'assistant' as const,
          content: msg.text,
        }))

      let answer: string

      // Try API route first (works in dev)
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            locale,
            conversationHistory,
          }),
        })

        if (response.ok) {
          const data = await response.json()
          if (data.error) {
            throw new Error(data.message || data.error)
          }
          answer = data.answer
        } else {
          throw new Error('API route not available')
        }
      } catch (apiError) {
        // Fallback 1: Try direct OpenAI call (requires NEXT_PUBLIC_OPENAI_API_KEY for static export)
        const publicApiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
        if (publicApiKey) {
          try {
            // Use portfolio data for context
            const projectsText = projects
              .map(p => `- ${p.title} at ${p.company} (${p.period}): ${p.description}. Technologies: ${p.technologies.join(', ')}. Domain: ${p.domain}.`)
              .join('\n')
            
            const experiencesText = experiences
              .map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}. Technologies: ${e.technologies.join(', ')}. Domain: ${e.domain}.`)
              .join('\n')

            const skillsText = skills
              .map(cat => `${cat.name}: ${cat.items.join(', ')}`)
              .join('\n')

            const languageInstructions = locale === 'pt'
              ? 'Responda sempre em português brasileiro.'
              : locale === 'es'
                ? 'Responde siempre en español.'
                : 'Always respond in English.'

            const systemContext = `You are Jaqueline Gonzaga, a Senior Mobile Developer specializing in React Native, TypeScript, and Accessibility (a11y). You have extensive experience in fintech, healthcare, and accessibility engineering.

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

            const messages = [
              { role: 'system', content: systemContext },
              ...conversationHistory.slice(-10),
              { role: 'user', content: userMessage },
            ]

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${publicApiKey}`,
              },
              body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages,
                temperature: 0.7,
                max_tokens: 300,
              }),
            })

            if (response.ok) {
              const data = await response.json()
              answer = data.choices[0]?.message?.content || 'Desculpe, não consegui gerar uma resposta.'
            } else {
              // If OpenAI fails (quota, etc), fallback to local search
              throw new Error('OpenAI API failed')
            }
          } catch (openaiError) {
            // Fallback 2: Use local search service
            const localResponse = processChatMessage(userMessage, locale)
            answer = localResponse.answer
          }
        } else {
          // No API key, use local search service
          const localResponse = processChatMessage(userMessage, locale)
          answer = localResponse.answer
        }
      }

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: answer,
        isUser: false,
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, botMsg])
    } catch (error: any) {
      console.error('Chat error:', error)
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: error.message?.includes('OPENAI_API_KEY') || error.message?.includes('not configured')
          ? (locale === 'pt'
              ? 'A integração com IA não está configurada. Configure OPENAI_API_KEY ou NEXT_PUBLIC_OPENAI_API_KEY nas variáveis de ambiente.'
              : locale === 'es'
                ? 'La integración con IA no está configurada. Configure OPENAI_API_KEY o NEXT_PUBLIC_OPENAI_API_KEY en las variables de entorno.'
                : 'AI integration is not configured. Please set OPENAI_API_KEY or NEXT_PUBLIC_OPENAI_API_KEY in environment variables.')
          : (t('hero.chatError') || 'Desculpe, ocorreu um erro. Tente novamente.'),
        isUser: false,
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, errorMsg])
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClearChat = () => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      text: t('hero.chatWelcome') || 'Olá! Sou Jaqueline Gonzaga. Pergunte-me sobre minhas experiências, projetos, tecnologias ou acessibilidade!',
      isUser: false,
      timestamp: new Date(),
    }
    setChatMessages([welcomeMsg])
  }

  return (
    <Section id="chat" ariaLabel={t('hero.chatTitle') || 'Chat'}>
      <Container>
        <div className="max-w-4xl mx-auto py-4 md:py-8 px-4">
          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 backdrop-blur-lg p-4 md:p-6 lg:p-8 max-h-[85vh] md:max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 md:mb-6">
              <div className="min-w-0 flex-1">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white truncate">
                  {t('hero.chatTitle') || 'Chat'}
                </h1>
                <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5 md:mt-1 line-clamp-1">
                  {t('hero.chatSubtitle') || 'Pergunte-me sobre minha experiência profissional'}
                </p>
              </div>
              <button
                onClick={handleClearChat}
                className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-sm hover:bg-white/60 dark:hover:bg-neutral-700/50 transition-colors text-xs md:text-sm text-neutral-700 dark:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 self-start sm:self-auto"
              >
                {t('hero.clearChat') || 'Limpar'}
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto mb-3 md:mb-4 space-y-3 md:space-y-4 pr-1 md:pr-2 min-h-0">
              <AnimatePresence>
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] rounded-xl md:rounded-2xl p-3 md:p-4 ${
                        message.isUser
                          ? 'bg-primary-600 text-white'
                          : 'bg-white/50 dark:bg-neutral-700/50 backdrop-blur-sm text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-600'
                      }`}
                    >
                      <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>
                      <p className={`text-[10px] md:text-xs mt-1.5 md:mt-2 ${message.isUser ? 'text-primary-100' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        {message.timestamp.toLocaleTimeString(locale === 'pt' ? 'pt-BR' : locale === 'es' ? 'es-ES' : 'en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white/50 dark:bg-neutral-700/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-neutral-200 dark:border-neutral-600">
                    <div className="flex gap-1.5 md:gap-2">
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleChatSubmit} className="mt-auto flex-shrink-0">
              <div className="flex items-center gap-2 md:gap-3 rounded-xl md:rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 backdrop-blur-lg py-2 md:py-3 pr-2 md:pr-3 pl-4 md:pl-6 transition-all hover:border-neutral-300 dark:hover:border-neutral-500">
                <input
                  ref={inputRef}
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={t('hero.chatPlaceholder')}
                  className="flex-1 border-none bg-transparent text-sm md:text-base text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none"
                  aria-label={t('hero.chatInputLabel')}
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isProcessing}
                  className="flex items-center justify-center rounded-full bg-primary-500 p-2 md:p-2.5 text-white transition-colors hover:bg-primary-600 disabled:opacity-70 dark:bg-primary-600 dark:hover:bg-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 flex-shrink-0"
                  aria-label={t('hero.chatSubmit')}
                >
                  {isProcessing ? (
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <Send size={18} className="md:w-5 md:h-5" />
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </Section>
  )
}

