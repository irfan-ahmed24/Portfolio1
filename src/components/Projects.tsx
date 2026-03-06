import { motion } from 'framer-motion'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { portfolio } from '../data/portfolio'

export function Projects() {
  return (
    <Container>
      <Section
        id="projects"
        eyebrow="Selected work"
        title={portfolio.projects.title}
        subtitle="A few projects that show my taste for UI, performance, and clean code."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {portfolio.projects.items.map((p, idx) => (
            <Reveal key={p.title} delay={Math.min(0.35, idx * 0.06)}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 ring-soft"
              >
                <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition group-hover:opacity-100" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-semibold text-zinc-50">{p.title}</h3>
                    <div className="flex items-center gap-2">
                      {p.github && (
                        <a
                          href={p.github}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-100 transition hover:bg-white/10"
                          aria-label={`${p.title} GitHub`}
                        >
                          <FiGithub />
                        </a>
                      )}
                      {p.href && (
                        <a
                          href={p.href}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/90 text-white transition hover:bg-indigo-500"
                          aria-label={`${p.title} Live link`}
                        >
                          <FiArrowUpRight />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{p.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-medium text-zinc-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <ul className="mt-5 space-y-2">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-zinc-300">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-indigo-300/80" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Section>
    </Container>
  )
}

