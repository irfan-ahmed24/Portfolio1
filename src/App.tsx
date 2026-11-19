import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { About, Background, Certificates, Contact, Experience, Footer, Hero, Navbar, Projects, ScrollToTop, Skills } from './components'
import { PortfolioProvider } from './context/PortfolioContext'
import { usePortfolio } from './context/usePortfolio'
import { AdminApp } from './admin/AdminApp'

function PublicPortfolio() {
  const { data: portfolio } = usePortfolio()
  const visibleProjects = portfolio.projects.filter((project) => project.visible)
  const visibleCertificates = portfolio.certificates.filter((certificate) => certificate.visible !== false)

  return (
    <div className="scrollbar min-h-dvh">
      <Background />
      <Navbar />

      <main>
        <Hero />

        <div className="mt-12 border-t border-white/10" />
        <About />

        {portfolio.skills.length > 0 && (
          <>
            <div className="border-t border-white/10" />
            <Skills />
          </>
        )}

        {visibleProjects.length > 0 && (
          <>
            <div className="border-t border-white/10" />
            <Projects />
          </>
        )}

        {portfolio.experience.length > 0 && (
          <>
            <div className="border-t border-white/10" />
            <Experience />
          </>
        )}

        {visibleCertificates.length > 0 && (
          <>
            <div className="border-t border-white/10" />
            <Certificates />
          </>
        )}

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
