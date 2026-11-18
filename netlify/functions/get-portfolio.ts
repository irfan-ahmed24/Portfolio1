import { dataStore, readJson, response, writeJson } from './_shared'

const seed = {
  profile: { name: 'Irfan Ahmed', role: 'Full-Stack Web Developer', location: 'Dhaka, Bangladesh', tagline: 'I build modern, responsive web applications with clean UI, strong backend logic, and smooth user experiences.', imageUrl: '/Picture/irfan2.jpeg', available: true },
  about: { title: 'About', paragraphs: ['I’m a Full-Stack Developer who lives at the intersection of beautiful interfaces and robust architecture. I love turning complex logic into delightful, polished user experiences that feel fluid and premium.', 'On the frontend, I focus on performance, accessibility, and pixel-perfect design systems—brought to life using React, TypeScript, Tailwind CSS, and motion-driven micro-interactions.'], stats: [{ label: 'Years Experience', value: '1+' }, { label: 'Projects Shipped', value: '5+' }, { label: 'Focus', value: 'UI + UX' }], principles: ['Build accessible, responsive UI by default', 'Keep components reusable and scalable', 'Add motion only when it improves clarity'] },
  skills: [{ name: 'HTML', level: 'Advanced' }, { name: 'CSS', level: 'Advanced' }, { name: 'JavaScript', level: 'Advanced' }, { name: 'React.js', level: 'Advanced' }, { name: 'TypeScript', level: 'Intermediate' }, { name: 'Node.js', level: 'Intermediate' }, { name: 'PHP', level: 'Intermediate' }, { name: 'Laravel', level: 'Intermediate' }, { name: 'MySQL', level: 'Intermediate' }, { name: 'MongoDB', level: 'Intermediate' }],
  education: [{ id: 'education-1', degree: 'Bachelor of CSE', institute: 'IUBAT', period: 'Running' }, { id: 'education-2', degree: 'Alim (HSC)', institute: 'Chandonbari Kamil Madrasha', period: '2020-2022' }],
  experience: [],
  projects: [
    { id: 'project-1', title: 'Harmonious Pavlova', description: 'Live project deployed on Netlify.', technologies: ['Web App'], liveUrl: 'https://harmonious-pavlova-c0d2ca.netlify.app/', githubUrl: '#', screenshots: [], featured: true, visible: true, order: 0, highlights: ['Netlify deployment'] },
    { id: 'project-2', title: 'Electronic Products Store', description: 'Project overview and deployment on Netlify.', technologies: ['E-commerce'], liveUrl: 'https://app.netlify.com/projects/electronic-products-store/overview', githubUrl: '#', screenshots: [], featured: false, visible: true, order: 1, highlights: ['Netlify project overview'] },
    { id: 'project-3', title: 'Luminous Zabaione', description: 'Live project deployed on Netlify.', technologies: ['Web App'], liveUrl: 'https://luminous-zabaione-1d6288.netlify.app/', githubUrl: '#', screenshots: [], featured: false, visible: true, order: 2, highlights: ['Netlify deployment'] },
    { id: 'project-4', title: 'Prostoti moncho', description: 'Live project deployed on Netlify.', technologies: ['Web App'], liveUrl: 'https://prostotimoncho.netlify.app/', githubUrl: '#', screenshots: [], featured: false, visible: true, order: 3, highlights: ['Netlify deployment'] },
    { id: 'project-5', title: 'Textile Inventory Management System', description: 'Live project deployed on Railway.', technologies: ['Web App'], liveUrl: 'https://textile-management-system-production.up.railway.app/', githubUrl: 'https://github.com/irfan-ahmed24/textile-management-system', screenshots: [], featured: false, visible: true, order: 4, highlights: ['Railway deployment'] },
  ],
  certificates: [],
  resume: { title: 'Resume', fileUrl: undefined, fileName: undefined },
  socialLinks: [{ id: 'social-1', label: 'GitHub', href: 'https://github.com/irfan-ahmed24', visible: true }, { id: 'social-2', label: 'LinkedIn', href: 'https://www.linkedin.com/in/irfan-ahmed24', visible: true }],
  contact: { title: 'Let’s build something great', subtitle: 'Have a role, project, or idea? Send a message and I’ll reply quickly.', email: 'irfanahmed99989@gmail.com' },
  nav: [{ label: 'Home', href: '#home' }, { label: 'About', href: '#about' }, { label: 'Skills', href: '#skills' }, { label: 'Projects', href: '#projects' }, { label: 'Contact', href: '#contact' }],
}

const keys = ['profile', 'about', 'skills', 'education', 'experience', 'projects', 'certificates', 'resume', 'social-links', 'contact']

export default async (request: Request) => {
  if (request.method !== 'GET') return response({ error: 'Method not allowed' }, 405)
  const values: Record<string, unknown> = {}
  for (const key of keys) {
    const seedKey = key === 'social-links' ? 'socialLinks' : key
    const seedValue = (seed as Record<string, unknown>)[seedKey]
    if (await dataStore().get(key + '.json') === null) await writeJson(key + '.json', seedValue)
    values[key] = await readJson(key + '.json', seedValue)
  }
  const portfolio = {
    profile: values.profile,
    about: values.about,
    skills: values.skills,
    education: values.education,
    experience: values.experience,
    projects: values.projects,
    certificates: values.certificates,
    resume: values.resume,
    socialLinks: values['social-links'],
    contact: values.contact,
    nav: seed.nav,
  }
  return response(portfolio, 200, { 'cache-control': 'no-cache, no-store, must-revalidate' })
}
