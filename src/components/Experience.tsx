import { Container } from './Container'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { usePortfolio } from '../context/usePortfolio'

export function Experience() {
  const { data: portfolio } = usePortfolio()
  if (portfolio.experience.length === 0) return null

  return (
    <Container>
      <Section id="experience" eyebrow="Career" title="Experience" subtitle="Roles and responsibilities from my professional journey.">
        <div className="grid gap-4">
          {portfolio.experience.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(0.35, index * 0.06)}>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 ring-soft">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-zinc-50">{item.title}</h3>
                    <p className="mt-1 text-sm text-indigo-300">{item.company}</p>
                  </div>
                  {item.period && <p className="text-sm text-zinc-400">{item.period}</p>}
                </div>
                {item.description && <p className="mt-4 leading-relaxed text-zinc-300">{item.description}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </Container>
  )
}
