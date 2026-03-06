import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin } from "react-icons/fi";
import { useState } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { portfolio } from "../data/portfolio";

export function Hero() {
  const [photoOk, setPhotoOk] = useState(true);

  return (
    <section id="home" className="relative pt-28 sm:pt-32">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-zinc-200 ring-soft">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
                Available for work
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl lg:text-6xl">
                Hi, I’m{" "}
                <span className="text-gradient">{portfolio.person.name}</span>
                <span className="text-zinc-400"> — </span>
                <span className="text-zinc-100">{portfolio.person.role}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-300 sm:text-lg">
                {portfolio.person.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-2xl bg-indigo-500/90 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
                >
                  View Projects
                  <FiArrowRight className="transition group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-zinc-100 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                >
                  Contact
                </a>
                <div className="ml-1 flex items-center gap-2">
                  <a
                    href={portfolio.links.socials[0]?.href ?? "#"}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-100 transition hover:-translate-y-0.5 hover:bg-white/10"
                    aria-label="GitHub"
                  >
                    <FiGithub />
                  </a>
                  <a
                    href={portfolio.links.socials[1]?.href ?? "#"}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-100 transition hover:-translate-y-0.5 hover:bg-white/10"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  {portfolio.person.location}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                  React • TypeScript • Tailwind
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 ring-soft shadow-soft"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 ring-soft">
                    {photoOk ? (
                      <img
                        src="/irfan2.png"
                        alt={portfolio.person.name}
                        className="h-full w-full object-cover"
                        onError={() => setPhotoOk(false)}
                      />
                    ) : (
                      <img src="Picture/irfan1.jpeg" alt="" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-50">
                      {portfolio.person.name}
                    </p>
                    <p className="text-sm text-zinc-400">
                      {portfolio.person.role}
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3">
                  <div className="glass rounded-2xl p-4 ring-soft">
                    <p className="text-sm font-medium text-zinc-200">
                      What I do
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      I design and build modern web apps with clean
                      architecture, smooth animations, and pixel-perfect UI.
                    </p>
                  </div>
                  <div className="glass rounded-2xl p-4 ring-soft">
                    <p className="text-sm font-medium text-zinc-200">
                      Currently
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                      Shipping user-facing features, refining UI systems, and
                      optimizing performance.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-sm text-zinc-300">Let’s collaborate</p>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:bg-white/15"
                  >
                    Message
                    <FiArrowRight className="transition group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
