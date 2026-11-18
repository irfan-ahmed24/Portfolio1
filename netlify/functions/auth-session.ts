import { response, verifySession } from './_shared'

export default async (request: Request) => {
  if (request.method !== 'GET') return response({ error: 'Method not allowed' }, 405)
  const session = verifySession(request)
  return response(session ? { authenticated: true, username: session.username } : { authenticated: false }, session ? 200 : 401)
}
