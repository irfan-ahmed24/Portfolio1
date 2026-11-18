import { response, secureCookie } from './_shared'

export default async (request: Request) => {
  if (request.method !== 'POST') return response({ error: 'Method not allowed' }, 405)
  return response({ authenticated: false }, 200, { 'set-cookie': secureCookie('', true) })
}
