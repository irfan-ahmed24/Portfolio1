import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiMail, FiMenu, FiX } from "react-icons/fi";
import { Container } from "./Container";
import { portfolio } from "../data/portfolio";
import { openResume } from "../resume/openResume";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const opacity = useMemo(() => clamp01(scrollY / 140), [scrollY]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/40 to-transparent" />
      <Container className="pointer-events-auto">
        <div
          className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/40 px-3 py-2 backdrop-blur-xl"
          style={{
            boxShadow: `0 10px 60px rgba(0,0,0,${0.15 + opacity * 0.35})`,
          }}
        >
          <a
            href="#home"
            className="group flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 ring-soft">
              <img
                src="Picture/irfan1.jpeg"
                alt="IA"
                className="w-full h-full object-cover rounded-xl"
              />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-zinc-50 sm:block">
              {portfolio.person.name}
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {portfolio.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href={`mailto:${portfolio.links.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            >
              <FiMail />
              Email
            </a>
            <button
              type="button"
              onClick={openResume}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-500/90 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
              <FiDownload />
              Resume
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-100 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </Container>

      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="absolute left-1/2 top-20 w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl border border-white/10 bg-zinc-950/80 p-3 shadow-soft"
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-2 py-1">
              <div className="text-sm font-semibold text-zinc-50">Menu</div>
              <button
                type="button"
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-zinc-100 transition hover:bg-white/10"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <FiX />
              </button>
            </div>
            <div className="mt-1 grid gap-1">
              {portfolio.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm text-zinc-200 transition hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a
                href={`mailto:${portfolio.links.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 transition hover:bg-white/10"
              >
                <FiMail />
                Email
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openResume();
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500/90 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
              >
                <FiDownload />
                Resume
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </header>
  );
}
