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
    location: 'Dhaka, Bangladesh',
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
    education: [
      {
        degree: 'Bachelor of CSE',
        institute: 'IUBAT',
        period: 'Running',
      },
      {
        degree: 'HSC',
        institute: 'Chandonbari Kamil Madrasha',
        period: '2020-2022',
      },
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
        title: 'Harmonious Pavlova',
        description:
          'Live project deployed on Netlify.',
        tags: ['Web App'],
        href: 'https://harmonious-pavlova-c0d2ca.netlify.app/',
        github: '#',
        highlights: [
          'Netlify deployment',
        ],
      },
      {
        title: 'Electronic Products Store',
        description:
          'Project overview and deployment on Netlify.',
        tags: ['E-commerce'],
        href: 'https://app.netlify.com/projects/electronic-products-store/overview',
        github: '#',
        highlights: [
          'Netlify project overview',
        ],
      },
      {
        title: 'Luminous Zabaione',
        description:
          'Live project deployed on Netlify.',
        tags: ['Web App'],
        href: 'https://luminous-zabaione-1d6288.netlify.app/',
        github: '#',
        highlights: [
          'Netlify deployment',
        ],
      },
      {
        title: 'Prostotimoncho',
        description:
          'Live project deployed on Netlify.',
        tags: ['Web App'],
        href: 'https://prostotimoncho.netlify.app/',
        github: '#',
        highlights: [
          'Netlify deployment',
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

