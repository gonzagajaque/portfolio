'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { BriefcaseBusiness, Layers, Download, User, Mail } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export const Hero: React.FC = () => {
  const { t } = useLanguage()
  const [chatInput, setChatInput] = useState('')
  const [showResumeConfirm, setShowResumeConfirm] = useState(false)
  
  const basePath = process.env.NODE_ENV === 'development' ? '' : '/portfolio'

  const navigationButtons = [
    { nameKey: 'common.nav.projects', href: '/projects', icon: BriefcaseBusiness },
    { nameKey: 'common.nav.skills', href: '/skills', icon: Layers },
    { nameKey: 'common.nav.resume', href: '/resume', icon: Download },
    { nameKey: 'common.nav.about', href: '/about', icon: User },
    { nameKey: 'common.nav.contact', href: '/contact', icon: Mail },
  ]

  const handleChatSubmit = (e: FormEvent) => {
    e.preventDefault()
    setChatInput('')
  }

  const handleResumeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowResumeConfirm(true)
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = `${basePath}/curriculo_jaqueline_gonzaga.pdf`
    link.download = 'curriculo_jaqueline_gonzaga.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowResumeConfirm(false)
  }

  const handleCancelDownload = () => {
    setShowResumeConfirm(false)
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
          {t('hero.greeting')}
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight"
          variants={itemVariants}
        >
          <span className="text-neutral-900 dark:text-white">
            {t('hero.title')}
          </span>
        </motion.h1>

        <motion.div
          className="mb-8 flex justify-center"
          variants={itemVariants}
        >
          <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-neutral-200 dark:border-neutral-700 shadow-2xl dark:shadow-primary-500/20 overflow-hidden">
            <Image
              src={`${basePath}/styles/me.png`}
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
          <div className="flex items-center rounded-full border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 py-2.5 pr-2 pl-6 backdrop-blur-lg transition-all hover:border-neutral-300 dark:hover:border-neutral-500 w-full">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={t('hero.chatPlaceholder')}
              className="w-full border-none bg-transparent text-base text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none"
              aria-label={t('hero.chatInputLabel')}
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="flex items-center justify-center rounded-full bg-primary-500 p-2.5 text-white transition-colors hover:bg-primary-600 disabled:opacity-70 dark:bg-primary-600 dark:hover:bg-primary-500"
              aria-label={t('hero.chatSubmit')}
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
            const isResume = button.nameKey === 'common.nav.resume'
            
            if (isResume) {
              return (
                <button
                  key={button.nameKey}
                  onClick={handleResumeClick}
                  className="cursor-pointer rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 w-32 h-32 shadow-none backdrop-blur-lg hover:bg-white/60 dark:hover:bg-neutral-700/50 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 text-gray-700 dark:text-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  <Icon size={24} strokeWidth={2} className="text-primary-600 dark:text-primary-400" />
                  <span className="text-xs font-medium">{t(button.nameKey)}</span>
                </button>
              )
            }
            
            return (
              <Link
                key={button.nameKey}
                href={button.href}
                className="cursor-pointer rounded-xl border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 w-32 h-32 shadow-none backdrop-blur-lg hover:bg-white/60 dark:hover:bg-neutral-700/50 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 text-gray-700 dark:text-gray-200"
              >
                <Icon size={24} strokeWidth={2} className="text-primary-600 dark:text-primary-400" />
                <span className="text-xs font-medium">{t(button.nameKey)}</span>
              </Link>
            )
          })}
        </motion.div>
      </motion.div>

      {/* Dialog de confirmação para download do currículo */}
      {showResumeConfirm && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCancelDownload}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="rounded-2xl border border-neutral-200 dark:border-neutral-600 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-lg p-6 md:p-8 max-w-md w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-900 dark:text-white">
              {t('resume.downloadConfirm') || 'Baixar Currículo?'}
            </h3>
            <p className="text-base text-neutral-600 dark:text-neutral-300 mb-6">
              {t('resume.downloadMessage') || 'Deseja baixar o currículo em PDF?'}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelDownload}
                className="px-4 py-2 rounded-lg border border-neutral-200 dark:border-neutral-600 bg-white/50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors text-neutral-700 dark:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                {t('common.buttons.cancel') || 'Cancelar'}
              </button>
              <button
                onClick={handleDownloadResume}
                className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                {t('common.buttons.download') || 'Baixar'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}

