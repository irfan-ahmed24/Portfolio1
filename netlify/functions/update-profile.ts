import { isSafeMutation, requireAdmin, response, writeJson } from './_shared'

export default async (request: Request) => {
  if (request.method !== 'PUT') return response({ error: 'Method not allowed' }, 405)
  if (!requireAdmin(request)) return response({ error: 'Unauthorized' }, 401)
  if (!isSafeMutation(request)) return response({ error: 'Invalid request origin' }, 403)
  let body: Record<string, unknown>
  try { body = await request.json() } catch { return response({ error: 'Invalid JSON' }, 400) }
  const allowed = ['name', 'role', 'location', 'tagline', 'imageUrl', 'available']
  const clean = Object.fromEntries(Object.entries(body).filter(([key]) => allowed.includes(key)))
  await writeJson('profile.json', clean)
  return response({ profile: clean })
}
