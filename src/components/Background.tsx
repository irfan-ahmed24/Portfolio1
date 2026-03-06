import { motion } from 'framer-motion'

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.55]" />
      <div className="absolute inset-0 bg-linear-to-b from-zinc-950 via-zinc-950 to-black" />

      <motion.div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-44 top-24 h-[520px] w-[520px] rounded-full bg-fuchsia-500/15 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/3 -bottom-64 h-[560px] w-[560px] rounded-full bg-sky-500/15 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

