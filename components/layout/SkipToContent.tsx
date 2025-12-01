import React from 'react'
import Link from 'next/link'

export const SkipToContent: React.FC = () => {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      aria-label="Pular para o conteúdo principal"
    >
      Pular para o conteúdo principal
    </Link>
  )
}