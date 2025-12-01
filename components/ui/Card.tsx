import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'article' | 'section'
  href?: string
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  as: Component = 'div',
  href,
  onClick,
}) => {
  const baseStyles =
    'bg-white dark:bg-dark-800 rounded-lg border border-neutral-200 dark:border-dark-700 p-6 transition-all duration-300 hover:border-neutral-300 dark:hover:border-dark-600'

  const interactiveStyles = href || onClick ? 'cursor-pointer focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2' : ''

  const classes = `${baseStyles} ${interactiveStyles} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Component className={classes} onClick={onClick}>
      {children}
    </Component>
  )
}

