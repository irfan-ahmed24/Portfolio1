import { Container } from './Container'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { portfolio } from '../data/portfolio'

export function About() {
  return (
    <Container>
      <Section
        id="about"
        eyebrow="Intro"
        title={portfolio.about.title}
        subtitle="A few lines about who I am, what I care about, and how I work."
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="grid gap-4 text-zinc-300">
              {portfolio.about.paragraphs.map((p) => (
                <Reveal key={p}>
                  <p className="text-pretty leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="glass rounded-3xl p-5 ring-soft">
                <div className="grid gap-3">
                  {portfolio.about.stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="text-sm text-zinc-300">{s.label}</span>
                      <span className="text-sm font-semibold text-zinc-50">{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-2xl border border-white/10 bg-linear-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10 p-4">
                  <p className="text-sm font-medium text-zinc-200">Principles</p>
                  <ul className="mt-2 space-y-2 text-sm text-zinc-300">
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-300/80" />
                      Build accessible, responsive UI by default
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300/80" />
                      Keep components reusable and scalable
                    </li>
                    <li className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-fuchsia-300/80" />
                      Add motion only when it improves clarity
                    </li>
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </Container>
  )
}

