import { FiArrowUpRight } from 'react-icons/fi'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { usePortfolio } from '../context/usePortfolio'

export function Certificates() {
  const { data: portfolio } = usePortfolio()
  const certificates = portfolio.certificates.filter((certificate) => certificate.visible !== false)
  if (certificates.length === 0) return null

  return (
    <Container>
      <Section id="certificates" eyebrow="Credentials" title="Certificates" subtitle="Courses and certifications that support my work.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((certificate, index) => (
            <Reveal key={certificate.id} delay={Math.min(0.35, index * 0.06)}>
              <article className="rounded-3xl border border-white/10 bg-white/5 p-5 ring-soft">
                <h3 className="font-semibold text-zinc-50">{certificate.title}</h3>
                <p className="mt-2 text-sm text-zinc-300">{certificate.issuer}</p>
                {certificate.date && <p className="mt-1 text-xs text-zinc-400">{certificate.date}</p>}
                {certificate.fileUrl && (
                  <a
                    href={certificate.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-300 hover:text-indigo-200"
                  >
                    View certificate <FiArrowUpRight />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </Container>
  )
}
