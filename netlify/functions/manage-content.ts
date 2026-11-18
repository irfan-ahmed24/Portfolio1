import { isSafeMutation, requireAdmin, response, writeJson } from './_shared'

export default async (request: Request) => {
  if (!['PUT', 'POST'].includes(request.method)) return response({ error: 'Method not allowed' }, 405)
  if (!requireAdmin(request)) return response({ error: 'Unauthorized' }, 401)
  if (!isSafeMutation(request)) return response({ error: 'Invalid request origin' }, 403)
  const url = new URL(request.url)
  const section = url.searchParams.get('section')
  const files: Record<string, string> = {
    about: 'about.json',
    skills: 'skills.json',
    education: 'education.json',
    experience: 'experience.json',
    certificates: 'certificates.json',
    social: 'social-links.json',
    contact: 'contact.json',
  }
  const file = section ? files[section] : undefined
  if (!file) return response({ error: 'Unknown content section' }, 400)
  let body: unknown
  try { body = await request.json() } catch { return response({ error: 'Invalid JSON' }, 400) }
  if (body === null || typeof body !== 'object') return response({ error: 'Invalid content' }, 400)
  await writeJson(file, body)
  return response({ saved: true })
}
