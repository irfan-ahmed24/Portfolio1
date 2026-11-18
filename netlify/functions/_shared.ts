import { getStore } from '@netlify/blobs'
import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto'
import bcrypt from 'bcryptjs'

export const jsonHeaders = {
  'content-type': 'application/json',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
}

export function response(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...jsonHeaders, ...extraHeaders } })
}

export function dataStore() {
  return getStore({ name: 'portfolio-data', consistency: 'strong' })
}

export function mediaStore() {
  return getStore({ name: 'portfolio-media', consistency: 'strong' })
}

export async function readJson<T>(key: string, fallback: T): Promise<T> {
  const value = await dataStore().get(key, { type: 'json' })
  return (value as T | null) ?? fallback
}

export async function writeJson(key: string, value: unknown) {
  await dataStore().set(key, JSON.stringify(value), { contentType: 'application/json' })
}

export function parseCookies(cookieHeader: string | null) {
  const result: Record<string, string> = {}
  for (const part of (cookieHeader || '').split(';')) {
    const [rawName, ...rest] = part.trim().split('=')
    if (rawName) result[rawName] = decodeURIComponent(rest.join('='))
  }
  return result
}

export function sign(value: string) {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not configured')
  return createHmac('sha256', secret).update(value).digest('hex')
}

export function createSession(username: string) {
  const payload = Buffer.from(JSON.stringify({
    username,
    exp: Date.now() + 8 * 60 * 60 * 1000,
    nonce: randomBytes(12).toString('hex'),
  })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function verifySession(request: Request) {
  const cookies = parseCookies(request.headers.get('cookie'))
  const token = cookies.admin_session
  if (!token) return null
  const dot = token.lastIndexOf('.')
  if (dot < 0) return null
  const payload = token.slice(0, dot)
  const signature = token.slice(dot + 1)
  let expected: string
  try { expected = sign(payload) } catch { return null }
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) return null
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as { username?: string; exp?: number }
    if (!session.username || !session.exp || session.exp < Date.now()) return null
    return session
  } catch {
    return null
  }
}

export function requireAdmin(request: Request) {
  return verifySession(request) !== null
}

export async function verifyPassword(password: string) {
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) throw new Error('ADMIN_PASSWORD_HASH is not configured')
  return bcrypt.compare(password, hash)
}

export function secureCookie(token: string, clear = false) {
  const parts = [
    `admin_session=${clear ? '' : token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
  ]
  if (process.env.URL?.startsWith('https://') || process.env.CONTEXT === 'production') parts.push('Secure')
  if (clear) parts.push('Max-Age=0')
  else parts.push(`Max-Age=${8 * 60 * 60}`)
  return parts.join('; ')
}

export function isSafeMutation(request: Request) {
  const origin = request.headers.get('origin')
  if (!origin) return request.headers.get('sec-fetch-site') !== 'cross-site'
  const url = new URL(request.url)
  try { return new URL(origin).host === url.host } catch { return false }
}
