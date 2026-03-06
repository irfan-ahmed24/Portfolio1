import { motion } from 'framer-motion'
import { FiArrowRight, FiMail } from 'react-icons/fi'
import { useMemo, useState } from 'react'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { Section } from './Section'
import { portfolio } from '../data/portfolio'

export function Contact() {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const mailto = useMemo(() => {
    const s = subject.trim() || `Hi ${portfolio.person.name}`
    const body = [
      message.trim(),
      '',
      `—`,
      `From: ${name.trim() || 'Anonymous'}`,
    ]
      .filter(Boolean)
      .join('\n')

    return `mailto:${portfolio.links.email}?subject=${encodeURIComponent(
      s,
    )}&body=${encodeURIComponent(body)}`
  }, [message, name, subject])

  return (
    <Container>
      <Section
        id="contact"
        eyebrow="Contact"
        title={portfolio.contact.title}
        subtitle={portfolio.contact.subtitle}
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="glass rounded-3xl p-5 ring-soft">
              <p className="text-sm font-semibold text-zinc-50">Quick links</p>
              <div className="mt-4 grid gap-2">
                <a
                  href={mailto}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 transition hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <FiMail />
                    {portfolio.links.email}
                  </span>
                  <FiArrowRight className="text-zinc-300" />
                </a>
                {portfolio.links.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-100 transition hover:bg-white/10"
                  >
                    <span>{s.label}</span>
                    <FiArrowRight className="text-zinc-300" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-indigo-500/15 via-white/5 to-fuchsia-500/10 p-6 ring-soft"
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(99,102,241,0.35),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(217,70,239,0.22),transparent_55%)]" />
              <div className="relative">
                <h3 className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                  Send a message
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-200/90">
                  The fastest way to reach me is email. If you include a short project
                  description + timeline, I can respond with clear next steps.
                </p>

                <form
                  className="mt-6 grid gap-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    window.location.href = mailto
                  }}
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-wide text-zinc-200">
                        Your name
                      </span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="h-11 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/25"
                      />
                    </label>
                    <label className="grid gap-2">
                      <span className="text-xs font-semibold tracking-wide text-zinc-200">
                        Subject
                      </span>
                      <input
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Portfolio website project"
                        className="h-11 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/25"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2">
                    <span className="text-xs font-semibold tracking-wide text-zinc-200">
                      Message
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your message..."
                      rows={6}
                      className="resize-none rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-indigo-400/40 focus:ring-2 focus:ring-indigo-400/25"
                      required
                    />
                  </label>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                    >
                      <FiMail />
                      Send email
                      <FiArrowRight />
                    </button>
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-black/20 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:bg-black/30"
                    >
                      See projects
                      <FiArrowRight />
                    </a>
                  </div>
                </form>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Section>
    </Container>
  )
}

