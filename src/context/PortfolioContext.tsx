import { useEffect, useState, type ReactNode } from 'react'
import { portfolio as staticPortfolio } from '../data/portfolio'
import type { PortfolioData } from '../types/portfolio'
import { PortfolioContext } from './PortfolioStore'

const fallback: PortfolioData = {
  profile: {
    name: staticPortfolio.person.name,
    role: staticPortfolio.person.role,
    location: staticPortfolio.person.location,
    tagline: staticPortfolio.person.tagline,
    imageUrl: '/Picture/irfan2.jpeg',
    available: true,
  },
  about: {
    title: staticPortfolio.about.title,
    paragraphs: [...staticPortfolio.about.paragraphs],
    stats: staticPortfolio.about.stats.map((item) => ({ ...item })),
    principles: [
      'Build accessible, responsive UI by default',
      'Keep components reusable and scalable',
      'Add motion only when it improves clarity',
    ],
  },
  skills: staticPortfolio.skills.items.map((item) => ({ ...item })),
  education: staticPortfolio.about.education.map((item, index) => ({
    id: `education-${index + 1}`,
    ...item,
  })),
  experience: [],
  projects: staticPortfolio.projects.items.map((item, index) => ({
    id: `project-${index + 1}`,
    title: item.title,
    description: item.description,
    technologies: [...item.tags],
    liveUrl: item.href,
    githubUrl: item.github,
    screenshots: [],
    featured: index === 0,
    visible: true,
    order: index,
    highlights: [...item.highlights],
  })),
  certificates: [],
  resume: { title: 'Resume', fileUrl: undefined, fileName: undefined },
  socialLinks: staticPortfolio.links.socials.map((item, index) => ({
    id: `social-${index + 1}`,
    label: item.label,
    href: item.href,
    visible: true,
  })),
  contact: {
    title: staticPortfolio.contact.title,
    subtitle: staticPortfolio.contact.subtitle,
    email: staticPortfolio.links.email,
  },
  nav: staticPortfolio.nav.map((item) => ({ ...item })),
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/.netlify/functions/get-portfolio', {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((payload: PortfolioData) => setData(payload))
      .catch(() => setData(fallback))
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  return (
    <PortfolioContext.Provider value={{ data, loading }}>
      {children}
    </PortfolioContext.Provider>
  )
}

