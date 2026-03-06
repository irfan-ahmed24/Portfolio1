import type { PropsWithChildren } from 'react'
import { motion, type MotionProps } from 'framer-motion'

type RevealProps = PropsWithChildren<
  MotionProps & {
    className?: string
    delay?: number
  }
>

export function Reveal({ className, delay = 0, children, ...motionProps }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98], delay }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

