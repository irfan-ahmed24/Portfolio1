import { mediaStore, response } from './_shared'

export default async (request: Request) => {
  if (request.method !== 'GET') return response({ error: 'Method not allowed' }, 405)
  const url = new URL(request.url)
  const key = url.searchParams.get('key')
  if (!key || key.includes('..') || key.startsWith('/')) return response({ error: 'Invalid media key' }, 400)
  const result = await mediaStore().get(key, { type: 'blob' })
  if (!result) return response({ error: 'Media not found' }, 404)
  const blob = result as Blob
  const keyName = key.split('/').pop() || 'download'
  const isPdf = blob.type === 'application/pdf' || keyName.toLowerCase().endsWith('.pdf')
  const headers: Record<string, string> = {
    'content-type': blob.type || 'application/octet-stream',
    'cache-control': 'no-store, no-cache, must-revalidate',
    'x-content-type-options': 'nosniff',
  }
  if (isPdf) {
    const requestedName = url.searchParams.get('filename')
    const safeName = (requestedName || keyName).replace(/["\\]/g, '').replace(/[\r\n]/g, '')
    headers['content-disposition'] = `attachment; filename="${safeName}"`
  }
  return new Response(blob, {
    headers,
  })
}
