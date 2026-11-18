import { isSafeMutation, response, writeJson } from './_shared'

export default async (request: Request) => {
  if (request.method !== 'PUT') return response({ error: 'Method not allowed' }, 405)
  if (!isSafeMutation(request)) return response({ error: 'Invalid request origin' }, 403)
  let body: unknown
  try { body = await request.json() } catch { return response({ error: 'Invalid JSON' }, 400) }
  if (!body || typeof body !== 'object') return response({ error: 'Invalid resume' }, 400)
  await writeJson('resume.json', body)
  return response({ resume: body })
}
