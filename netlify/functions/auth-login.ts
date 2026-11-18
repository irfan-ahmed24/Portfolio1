import { createSession, isSafeMutation, response, secureCookie, verifyPassword } from './_shared'

const attempts = new Map<string, { count: number; resetAt: number }>()

export default async (request: Request) => {
  if (request.method !== 'POST') return response({ error: 'Method not allowed' }, 405)
  if (!isSafeMutation(request)) return response({ error: 'Invalid request origin' }, 403)

  const ip = request.headers.get('x-nf-client-connection-ip') || 'unknown'
  const now = Date.now()
  const entry = attempts.get(ip)
  if (entry && entry.resetAt > now && entry.count >= 5) {
    return response({ error: 'Too many login attempts. Try again later.' }, 429)
  }
  if (!entry || entry.resetAt <= now) attempts.set(ip, { count: 0, resetAt: now + 15 * 60 * 1000 })

  let body: { username?: string; password?: string }
  try { body = await request.json() } catch { return response({ error: 'Invalid JSON' }, 400) }
  if (!body.username || !body.password) return response({ error: 'Username and password are required' }, 400)
  if (body.username !== process.env.ADMIN_USERNAME) {
    attempts.set(ip, { count: (attempts.get(ip)?.count || 0) + 1, resetAt: attempts.get(ip)?.resetAt || now + 900000 })
    return response({ error: 'Invalid credentials' }, 401)
  }

  let valid = false
  try { valid = await verifyPassword(body.password) } catch {
    return response({ error: 'Admin authentication is not configured' }, 503)
  }
  if (!valid) {
    attempts.set(ip, { count: (attempts.get(ip)?.count || 0) + 1, resetAt: attempts.get(ip)?.resetAt || now + 900000 })
    return response({ error: 'Invalid credentials' }, 401)
  }

  attempts.delete(ip)
  const token = createSession(body.username)
  return response({ authenticated: true }, 200, { 'set-cookie': secureCookie(token) })
}
