import { Container } from './Container'
import { portfolio } from '../data/portfolio'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 py-10">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-zinc-400">
            © {year} {portfolio.person.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {portfolio.links.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 transition hover:bg-white/10"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}

