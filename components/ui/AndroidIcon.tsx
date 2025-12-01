import React from 'react'

interface AndroidIconProps {
  size?: number
  className?: string
}

export const AndroidIcon: React.FC<AndroidIconProps> = ({
  size = 20,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor">
        <rect x={6} y={9} width={12} height={8} rx={2} />
        <rect x={7.5} y={5} width={9} height={4} rx={2} />
        <circle cx={10} cy={7} r={0.7} fill="#ffffff" />
        <circle cx={14} cy={7} r={0.7} fill="#ffffff" />
        <path d="M9 4.2 7.9 2.8a0.5 0.5 0 0 1 .8-0.6L9.8 3.6 9 4.2z" />
        <path d="M15 4.2 14.2 3.6l1.1-1.4a0.5 0.5 0 1 1 .8 0.6L15 4.2z" />
        <rect x={8} y={17} width={2} height={3} rx={1} />
        <rect x={14} y={17} width={2} height={3} rx={1} />
      </g>
    </svg>
  )
}
