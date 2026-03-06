import { About, Background, Contact, Footer, Hero, Navbar, Projects, ScrollToTop, Skills } from './components'

export default function App() {
  return (
    <div className="scrollbar min-h-dvh">
      <Background />
      <Navbar />

      <main>
        <Hero />

        <div className="mt-12 border-t border-white/10" />
        <About />

        <div className="border-t border-white/10" />
        <Skills />

        <div className="border-t border-white/10" />
        <Projects />

        <div className="border-t border-white/10" />
        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}
