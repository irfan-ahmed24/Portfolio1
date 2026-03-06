import { motion } from 'framer-motion'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { portfolio } from '../data/portfolio'

const levelStyles: Record<string, string> = {
  Advanced:
    'border-emerald-400/20 bg-emerald-400/10 text-emerald-200 shadow-[0_0_0_4px_rgba(16,185,129,0.08)]',
  Intermediate:
    'border-indigo-400/20 bg-indigo-400/10 text-indigo-200 shadow-[0_0_0_4px_rgba(99,102,241,0.08)]',
  Beginner:
    'border-zinc-400/20 bg-zinc-400/10 text-zinc-200 shadow-[0_0_0_4px_rgba(161,161,170,0.06)]',
}

export function Skills() {
  return (
    <Container>
      <Section
        id="skills"
        eyebrow="Toolkit"
        title={portfolio.skills.title}
        subtitle="A snapshot of the technologies and strengths I use to ship quality UI."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.skills.items.map((skill, idx) => (
            <Reveal key={skill.name} delay={Math.min(0.35, idx * 0.03)}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="glass group rounded-3xl p-4 ring-soft"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-zinc-50">{skill.name}</p>
                    <p className="mt-1 text-xs text-zinc-400">Comfort level</p>
                  </div>
                  <span
                    className={[
                      'rounded-full border px-2.5 py-1 text-[11px] font-semibold',
                      levelStyles[skill.level] ?? levelStyles.Intermediate,
                    ].join(' ')}
                  >
                    {skill.level}
                  </span>
                </div>

                <div className="mt-4 h-2 rounded-full bg-white/5">
                  <div
                    className="h-2 rounded-full bg-linear-to-r from-indigo-400/90 to-fuchsia-400/80"
                    style={{
                      width:
                        skill.level === 'Advanced'
                          ? '92%'
                          : skill.level === 'Intermediate'
                            ? '72%'
                            : '52%',
                    }}
                  />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>
    </Container>
  )
}

