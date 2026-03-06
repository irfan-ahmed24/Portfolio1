export type SocialLink = {
  label: string
  href: string
}

export type Skill = {
  name: string
  level: 'Advanced' | 'Intermediate' | 'Beginner'
}

export type Project = {
  title: string
  description: string
  tags: string[]
  href?: string
  github?: string
  highlights: string[]
}

export const portfolio = {
  person: {
    name: 'Irfan Ahmed',
    role: 'Full‑Stack Web Developer',
    location: 'Your City, Country',
    tagline:
      'I build modern, responsive web applications with clean UI, strong backend logic, and smooth user experiences.',
  },
  links: {
    email: 'irfanahmed99989@gmail.com',
    resumeHref: '#',
    socials: [
      { label: 'GitHub', href: 'https://github.com/irfan-ahmed24' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/irfan-ahmed24' },
    ] satisfies SocialLink[],
  },
  about: {
    title: 'About',
    paragraphs: [
      'I’m a developer who loves turning complex problems into delightful, polished user experiences. I care about performance, accessibility, and design systems.',
      'Recently I’ve been working with React, TypeScript, Tailwind, and motion-driven micro-interactions to create modern web apps that feel premium.',
    ],
    stats: [
      { label: 'Years Experience', value: '2+' },
      { label: 'Projects Shipped', value: '20+' },
      { label: 'Focus', value: 'UI + DX' },
    ],
  },
  skills: {
    title: 'Skills',
    items: [
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'React.js', level: 'Advanced' },
      { name: 'TypeScript', level: 'Intermediate' },
      { name: 'Node.js', level: 'Intermediate' },
      { name: 'PHP', level: 'Intermediate' },
      { name: 'Laravel', level: 'Intermediate' },
      { name: 'MySQL', level: 'Intermediate' },
      { name: 'MongoDB', level: 'Intermediate' },
    ] satisfies Skill[],
  },
  projects: {
    title: 'Projects',
    items: [
      {
        title: 'Modern Dashboard',
        description:
          'A responsive dashboard with charts, authentication, and real-time UI states.',
        tags: ['React', 'TypeScript', 'Tailwind'],
        href: '#',
        github: '#',
        highlights: [
          'Reusable components + design tokens',
          'Accessible keyboard navigation',
          'Optimized rendering and data loading',
        ],
      },
      {
        title: 'E-commerce UI',
        description:
          'High-conversion storefront UI with product search, filters, and smooth transitions.',
        tags: ['React', 'Motion', 'UX'],
        href: '#',
        github: '#',
        highlights: [
          'Motion-driven micro-interactions',
          'Mobile-first responsive layout',
          'Clean architecture and scalable patterns',
        ],
      },
      {
        title: 'Portfolio V1',
        description:
          'A premium personal portfolio with sections, animations, and a polished visual identity.',
        tags: ['Vite', 'Tailwind', 'Framer Motion'],
        href: '#',
        github: '#',
        highlights: [
          'Beautiful hero + subtle background effects',
          'Component-driven sections',
          'Fast load and smooth scrolling',
        ],
      },
    ] satisfies Project[],
  },
  contact: {
    title: 'Let’s build something great',
    subtitle:
      'Have a role, project, or idea? Send a message and I’ll reply quickly.',
  },
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ],
} as const

