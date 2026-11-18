import { mediaStore, response } from './_shared'

export default async (request: Request) => {
  if (request.method !== 'GET') return response({ error: 'Method not allowed' }, 405)
  const key = new URL(request.url).searchParams.get('key')
  if (!key || key.includes('..') || key.startsWith('/')) return response({ error: 'Invalid media key' }, 400)
  const result = await mediaStore().get(key, { type: 'blob' })
  if (!result) return response({ error: 'Media not found' }, 404)
  const blob = result as Blob
  return new Response(blob, {
    headers: {
      'content-type': blob.type || 'application/octet-stream',
      'cache-control': 'public, max-age=300',
      'x-content-type-options': 'nosniff',
    },
  })
}
