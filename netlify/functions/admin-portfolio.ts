import { dataStore, response, requireAdmin } from './_shared'

export default async (request: Request) => {
  if (!requireAdmin(request)) return response({ error: 'Unauthorized' }, 401)
  if (request.method !== 'GET') return response({ error: 'Method not allowed' }, 405)
  const keys = ['profile.json', 'about.json', 'skills.json', 'education.json', 'experience.json', 'projects.json', 'certificates.json', 'resume.json', 'social-links.json', 'contact.json']
  const values: Record<string, unknown> = {}
  for (const key of keys) values[key] = await dataStore().get(key, { type: 'json' })
  return response({
    profile: values['profile.json'],
    about: values['about.json'],
    skills: values['skills.json'],
    education: values['education.json'],
    experience: values['experience.json'],
    projects: values['projects.json'],
    certificates: values['certificates.json'],
    resume: values['resume.json'],
    socialLinks: values['social-links.json'],
    contact: values['contact.json'],
  })
}
