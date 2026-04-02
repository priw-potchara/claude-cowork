'use client'

import { motion } from 'framer-motion'
import { forwardRef } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
  asChild?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:opacity-90 shadow-warm',
  secondary: 'bg-secondary text-text-dark hover:opacity-90',
  ghost: 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-text-dark',
}

const sizeClasses: Record<Size, string> = {
  sm: 'text-sm px-4 py-2',
  md: 'text-base px-6 py-3',
  lg: 'text-lg px-8 py-4',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', children, className = '', disabled, ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.1 }}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        font-body font-medium rounded-button
        transition-all duration-200
        cursor-pointer select-none
        disabled:opacity-60 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  )
})

export default Button
