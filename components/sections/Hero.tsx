'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BriefcaseBusiness, Layers, PartyPopper, User, Mail } from 'lucide-react'

// Base path for GitHub Pages - matches next.config.js
// Next.js should handle basePath automatically, but with static export it may not work
// So we include it explicitly to ensure it works on GitHub Pages
const BASE_PATH = '/portfolio'

const navigationButtons = [
  { name: 'Projects', href: '/projects', color: '#2563eb', icon: BriefcaseBusiness },
  { name: 'Skills', href: '/skills', color: '#3b82f6', icon: Layers },
  { name: 'Fun', href: '/fun', color: '#6b21a8', icon: PartyPopper },
  { name: 'About', href: '/about', color: '#1d4ed8', icon: User },
  { name: 'Contact', href: '/contact', color: '#7e22ce', icon: Mail },
]

export const Hero: React.FC = () => {
  const [chatInput, setChatInput] = useState('')

  const handleChatSubmit = (e: FormEvent) => {
    e.preventDefault()
    setChatInput('')
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-16 pb-12 overflow-hidden z-[2]"
      style={{ background: 'transparent' }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary-500/10 dark:bg-primary-500/20 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent-500/10 dark:bg-accent-500/20 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        className="relative max-w-2xl mx-auto text-center z-[3] w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mb-3 font-medium"
          variants={itemVariants}
        >
          Hey, I&apos;m Jaqueline Gonzaga!
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight"
          variants={itemVariants}
        >
          <span className="text-neutral-900 dark:text-white">
            Portfolio
          </span>
        </motion.h1>

        <motion.div
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-neutral-200 dark:border-neutral-700 shadow-2xl dark:shadow-primary-500/20 overflow-hidden">
            <Image
              src={`${BASE_PATH}/styles/me.png`}
              alt="gonzagajaque"
              width={192}
              height={192}
              className="w-full h-full object-cover object-[center_80%] rounded-full"
              priority
            />
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleChatSubmit}
          className="mb-4 flex items-center gap-3 max-w-lg mx-auto w-full"
          variants={itemVariants}
        >
          <div className="flex items-center rounded-full border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:hover:border-neutral-500 w-full">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask me anything…"
              className="w-full border-none bg-transparent text-base text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none"
              aria-label="Campo de entrada do chat"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="flex items-center justify-center rounded-full bg-primary-600 p-2.5 text-white transition-colors hover:bg-primary-700 disabled:opacity-70 dark:bg-primary-600 dark:hover:bg-primary-500"
              aria-label="Enviar mensagem"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>
        </motion.form>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 w-full max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {navigationButtons.map((button) => {
            const Icon = button.icon
            return (
              <Link
                key={button.name}
                href={button.href}
                className="cursor-pointer rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white/30 dark:bg-neutral-800/50 w-32 h-32 shadow-none backdrop-blur-lg hover:bg-neutral-200/30 dark:hover:bg-neutral-700/50 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 text-gray-700 dark:text-gray-200"
              >
                <Icon size={24} strokeWidth={2} color={button.color} />
                <span className="text-xs font-medium">{button.name}</span>
              </Link>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}

