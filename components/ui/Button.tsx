import React from 'react'
import Link from 'next/link'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, children, className = '', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary:
        'bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-500 dark:hover:bg-primary-600',
      secondary:
        'bg-secondary-500 text-white hover:bg-secondary-600 dark:bg-secondary-500 dark:hover:bg-secondary-600',
      outline:
        'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 dark:border-primary-500 dark:text-primary-400 dark:hover:bg-primary-900/20',
      ghost:
        'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    if (href) {
      return (
        <Link href={href} className={classes} aria-label={typeof children === 'string' ? children : undefined}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'