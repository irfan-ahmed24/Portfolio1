import { isSafeMutation, mediaStore, requireAdmin, response } from './_shared'

export default async (request: Request) => {
  if (request.method !== 'POST') return response({ error: 'Method not allowed' }, 405)
  if (!requireAdmin(request)) return response({ error: 'Unauthorized' }, 401)
  if (!isSafeMutation(request)) return response({ error: 'Invalid request origin' }, 403)
  let form: FormData
  try { form = await request.formData() } catch { return response({ error: 'Invalid multipart form' }, 400) }
  const file = form.get('file')
  if (!(file instanceof File)) return response({ error: 'File is required' }, 400)
  const category = String(form.get('category') || 'misc').replace(/[^a-z0-9-]/gi, '')
  const allowed: Record<string, { mime: string[]; max: number }> = {
    image: { mime: ['image/jpeg', 'image/png', 'image/webp'], max: 5 * 1024 * 1024 },
    document: { mime: ['application/pdf'], max: 10 * 1024 * 1024 },
  }
  const type = file.type.startsWith('image/') ? 'image' : file.type === 'application/pdf' ? 'document' : null
  if (!type || !allowed[type].mime.includes(file.type)) return response({ error: 'Unsupported file type' }, 415)
  if (file.size > allowed[type].max) return response({ error: `File exceeds ${allowed[type].max / 1024 / 1024} MB limit` }, 413)
  const extension = file.type === 'image/jpeg' ? 'jpg' : file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'pdf'
  const id = crypto.randomUUID()
  const key = `${category}/${id}.${extension}`
  const bytes = new Uint8Array(await file.arrayBuffer())
  await mediaStore().set(key, bytes, {
    contentType: file.type,
    metadata: { id, fileName: file.name, category, size: String(file.size), uploadedAt: new Date().toISOString() },
  })
  return response({
    id,
    key,
    url: `/.netlify/functions/get-media?key=${encodeURIComponent(key)}`,
    fileName: file.name,
    mimeType: file.type,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  }, 201)
}
