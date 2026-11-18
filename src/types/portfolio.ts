export type SkillLevel = 'Advanced' | 'Intermediate' | 'Beginner'

export interface Profile {
  name: string
  role: string
  location: string
  tagline: string
  imageUrl?: string
  available?: boolean
}

export interface About {
  title: string
  paragraphs: string[]
  stats: Array<{ label: string; value: string }>
  principles: string[]
}

export interface Skill {
  name: string
  level: SkillLevel
}

export interface Education {
  id: string
  degree: string
  institute: string
  period: string
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  screenshots: MediaReference[]
  featured: boolean
  visible: boolean
  order: number
  highlights: string[]
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  fileUrl?: string
  visible: boolean
}

export interface Resume {
  title: string
  fileUrl?: string
  fileName?: string
}

export interface SocialLink {
  id: string
  label: string
  href: string
  visible: boolean
}

export interface Contact {
  title: string
  subtitle: string
  email: string
}

export interface MediaReference {
  id: string
  key: string
  url: string
  fileName: string
  mimeType: string
  size: number
  uploadedAt: string
}

export interface PortfolioData {
  profile: Profile
  about: About
  skills: Skill[]
  education: Education[]
  experience: Experience[]
  projects: Project[]
  certificates: Certificate[]
  resume: Resume
  socialLinks: SocialLink[]
  contact: Contact
  nav: Array<{ label: string; href: string }>
}
