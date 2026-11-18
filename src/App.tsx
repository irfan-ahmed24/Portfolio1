import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { About, Background, Contact, Footer, Hero, Navbar, Projects, ScrollToTop, Skills } from './components'
import { PortfolioProvider } from './context/PortfolioContext'
import { AdminApp } from './admin/AdminApp'

function PublicPortfolio() {
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

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicPortfolio />} />
          <Route path="/admin/*" element={<AdminApp />} />
          <Route path="/irfan12/admin/*" element={<AdminApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </PortfolioProvider>
  )
}
