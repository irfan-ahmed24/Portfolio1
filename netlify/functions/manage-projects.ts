import { isSafeMutation, readJson, requireAdmin, response, writeJson } from './_shared'

interface ProjectInput {
  id?: string
  title: string
  description?: string
  technologies?: string[]
  liveUrl?: string
  githubUrl?: string
  screenshots?: unknown[]
  featured?: boolean
  visible?: boolean
  order?: number
  highlights?: string[]
}

export default async (request: Request) => {
  if (!['POST', 'PUT', 'DELETE'].includes(request.method)) return response({ error: 'Method not allowed' }, 405)
  if (!requireAdmin(request)) return response({ error: 'Unauthorized' }, 401)
  if (!isSafeMutation(request)) return response({ error: 'Invalid request origin' }, 403)
  const projects = await readJson<ProjectInput[]>('projects.json', [])
  if (request.method === 'DELETE') {
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return response({ error: 'Project id is required' }, 400)
    await writeJson('projects.json', projects.filter((project) => project.id !== id))
    return response({ deleted: true })
  }
  let body: ProjectInput
  try { body = await request.json() } catch { return response({ error: 'Invalid JSON' }, 400) }
  if (!body || typeof body.title !== 'string' || !body.title.trim()) return response({ error: 'Project title is required' }, 400)
  if (typeof body.description !== 'string') body.description = ''
  body.technologies = Array.isArray(body.technologies) ? body.technologies : []
  body.screenshots = Array.isArray(body.screenshots) ? body.screenshots : []
  body.featured = Boolean(body.featured)
  body.visible = body.visible !== false
  body.order = Number.isFinite(Number(body.order)) ? Number(body.order) : 0
  body.highlights = Array.isArray(body.highlights) ? body.highlights : []
  if (request.method === 'POST') body.id = body.id || crypto.randomUUID()
  if (!body.id) return response({ error: 'Project id is required' }, 400)
  const updated = request.method === 'POST'
    ? [...projects, body]
    : projects.map((project) => project.id === body.id ? body : project)
  await writeJson('projects.json', updated)
  return response({ project: body })
}
