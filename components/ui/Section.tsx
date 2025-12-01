import React from 'react'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
  as?: 'section' | 'div'
  ariaLabel?: string
  ariaLabelledBy?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  id,
  className = '',
  as: Component = 'section',
  ariaLabel,
  ariaLabelledBy,
}) => {
  return (
    <Component
      id={id}
      className={`py-20 md:py-32 ${className}`}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </Component>
  )
}

