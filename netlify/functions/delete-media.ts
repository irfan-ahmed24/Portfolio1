import { isSafeMutation, mediaStore, response } from './_shared'

export default async (request: Request) => {
  if (request.method !== 'DELETE') return response({ error: 'Method not allowed' }, 405)
  if (!isSafeMutation(request)) return response({ error: 'Invalid request origin' }, 403)
  const key = new URL(request.url).searchParams.get('key')
  if (!key || key.includes('..') || key.startsWith('/')) return response({ error: 'Valid media key is required' }, 400)
  await mediaStore().delete(key)
  return response({ deleted: true })
}
