import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'neutral'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full'

  const variants = {
    primary:
      'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
    secondary:
      'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/30 dark:text-secondary-300',
    success:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    warning:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    neutral:
      'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
  }

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return <span className={classes}>{children}</span>
}