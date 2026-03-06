import type { PropsWithChildren } from 'react'

type SectionProps = PropsWithChildren<{
  id?: string
  eyebrow?: string
  title: string
  subtitle?: string
  className?: string
}>

export function Section({ id, eyebrow, title, subtitle, className, children }: SectionProps) {
  return (
    <section id={id} className={['py-16 sm:py-20', className].join(' ')}>
      {(eyebrow ?? title ?? subtitle) && (
        <div className="mb-8 sm:mb-10">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] text-zinc-400">
              {eyebrow.toUpperCase()}
            </p>
          )}
          <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
            {title}
          </h2>
          {subtitle && <p className="mt-3 max-w-2xl text-zinc-300">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  )
}

