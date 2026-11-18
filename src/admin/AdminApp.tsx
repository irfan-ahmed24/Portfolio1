import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import type { MediaReference, PortfolioData, Project } from '../types/portfolio'

const request = (url: string, options: RequestInit = {}) =>
  fetch(url, { credentials: 'include', ...options, headers: { 'content-type': 'application/json', ...options.headers } })

async function api<T>(url: string, options: RequestInit = {}) {
  const response = await request(url, options)
  const body = await response.json()
  if (!response.ok) throw new Error(body.error || 'Request failed')
  return body as T
}

function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      await api<{ authenticated: boolean }>('/.netlify/functions/auth-login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <form onSubmit={submit} className="glass w-full max-w-md rounded-3xl p-6 ring-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">Portfolio CMS</p>
        <h1 className="mt-2 text-2xl font-semibold text-zinc-50">Admin login</h1>
        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-zinc-300">Username
            <input value={username} onChange={(event) => setUsername(event.target.value)} required className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-zinc-100 outline-none focus:border-indigo-400" />
          </label>
          <label className="grid gap-2 text-sm text-zinc-300">Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required className="h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-zinc-100 outline-none focus:border-indigo-400" />
          </label>
          {error && <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>}
          <button disabled={busy} className="h-11 rounded-xl bg-indigo-500 font-medium text-white hover:bg-indigo-400 disabled:opacity-60">{busy ? 'Signing in...' : 'Sign in'}</button>
        </div>
      </form>
    </main>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="grid gap-2 text-sm text-zinc-300">{label}{children}</label>
}

const inputClass = 'min-h-11 rounded-xl border border-white/10 bg-black/20 px-3 text-zinc-100 outline-none focus:border-indigo-400'

function Dashboard() {
  const navigate = useNavigate()
  const [data, setData] = useState<PortfolioData | null>(null)
  const [tab, setTab] = useState('Overview')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    api<PortfolioData>('/.netlify/functions/admin-portfolio')
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Unable to load portfolio'))
  }, [])

  async function save(path: string, body: unknown, section?: string) {
    setError('')
    setNotice('')
    try {
      await api(path + (section ? `?section=${section}` : ''), { method: path.includes('admin') ? 'GET' : (section ? 'PUT' : 'PUT'), body: body === undefined ? undefined : JSON.stringify(body) })
      setNotice('Changes saved')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    }
  }

  async function logout() {
    await api('/.netlify/functions/auth-logout', { method: 'POST' })
    navigate('/admin/login', { replace: true })
  }

  async function upload(file: File, category: string): Promise<MediaReference> {
    const form = new FormData()
    form.append('file', file)
    form.append('category', category)
    const response = await fetch('/.netlify/functions/upload-media', { method: 'POST', credentials: 'include', body: form })
    const body = await response.json()
    if (!response.ok) throw new Error(body.error || 'Upload failed')
    return body as MediaReference
  }

  if (!data) return <main className="grid min-h-dvh place-items-center"><p className="text-zinc-400">{error || 'Loading dashboard...'}</p></main>

  const tabs = ['Overview', 'Profile', 'About', 'Skills', 'Education', 'Experience', 'Projects', 'Certificates', 'Resume', 'Social', 'Contact']
  const input = (value: string | number, onChange: (value: string) => void, type = 'text') =>
    <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className={inputClass} />

  async function saveSection(section: 'about' | 'skills' | 'education' | 'experience' | 'certificates' | 'social' | 'contact', value: unknown) {
    await save('/.netlify/functions/manage-content', value, section)
  }

  return (
    <main className="min-h-dvh px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-3">
          <div><p className="text-xs text-indigo-300">CMS</p><p className="font-semibold text-zinc-50">{data.profile.name}</p></div>
          <div className="flex gap-2"><a href="/" target="_blank" className="rounded-xl border border-white/10 px-3 py-2 text-sm text-zinc-200">View site</a><button onClick={logout} className="rounded-xl bg-white/10 px-3 py-2 text-sm text-zinc-100">Logout</button></div>
        </header>
        <div className="mt-5 grid gap-5 lg:grid-cols-[220px_1fr]">
          <nav className="glass h-fit rounded-2xl p-2 ring-soft">
            {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`w-full rounded-xl px-3 py-2 text-left text-sm ${tab === item ? 'bg-indigo-500/90 text-white' : 'text-zinc-300 hover:bg-white/5'}`}>{item}</button>)}
          </nav>
          <section className="glass min-h-[520px] rounded-3xl p-5 ring-soft">
            {notice && <p className="mb-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-sm text-emerald-200">{notice}</p>}
            {error && <p className="mb-4 rounded-xl border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-200">{error}</p>}

            {tab === 'Overview' && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[['Projects', data.projects.length], ['Skills', data.skills.length], ['Education', data.education.length], ['Experience', data.experience.length], ['Certificates', data.certificates.length], ['Social links', data.socialLinks.length]].map(([label, value]) => <div key={String(label)} className="rounded-2xl border border-white/10 bg-white/5 p-5"><p className="text-sm text-zinc-400">{label}</p><p className="mt-2 text-3xl font-semibold text-zinc-50">{value}</p></div>)}</div>}

            {tab === 'Profile' && <form className="grid gap-4" onSubmit={async (event) => { event.preventDefault(); await save('/.netlify/functions/update-profile', data.profile); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">{input(data.profile.name, (value) => setData({ ...data, profile: { ...data.profile, name: value } }))}</Field>
                <Field label="Role">{input(data.profile.role, (value) => setData({ ...data, profile: { ...data.profile, role: value } }))}</Field>
                <Field label="Location">{input(data.profile.location, (value) => setData({ ...data, profile: { ...data.profile, location: value } }))}</Field>
                <Field label="Tagline">{input(data.profile.tagline, (value) => setData({ ...data, profile: { ...data.profile, tagline: value } }))}</Field>
              </div>
              <Field label="Profile image">
                <input type="file" accept="image/jpeg,image/png,image/webp" onChange={async (event) => {
                  const file = event.target.files?.[0]; if (!file) return
                  try { const media = await upload(file, 'profile') as unknown as import('../types/portfolio').MediaReference; setData({ ...data, profile: { ...data.profile, imageUrl: media.url } }) } catch (err) { setError(err instanceof Error ? err.message : 'Upload failed') }
                }} className="text-sm text-zinc-300" />
              </Field>
              {data.profile.imageUrl && <img src={data.profile.imageUrl} alt="Profile preview" className="h-32 w-32 rounded-2xl object-cover" />}
              <button className="w-fit rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white">Save profile</button>
            </form>}

            {tab === 'About' && <form className="grid gap-4" onSubmit={async (event) => { event.preventDefault(); await saveSection('about', data.about) }}>
              <Field label="Title">{input(data.about.title, (value) => setData({ ...data, about: { ...data.about, title: value } }))}</Field>
              <Field label="Paragraphs (one per line)"><textarea rows={5} value={data.about.paragraphs.join('\n')} onChange={(event) => setData({ ...data, about: { ...data.about, paragraphs: event.target.value.split('\n') } })} className={inputClass + ' py-3'} /></Field>
              <Field label="Stats"><textarea rows={5} value={JSON.stringify(data.about.stats, null, 2)} onChange={(event) => { try { setData({ ...data, about: { ...data.about, stats: JSON.parse(event.target.value) } }) } catch { setError('Stats JSON is invalid') } }} className={inputClass + ' py-3 font-mono text-xs'} /></Field>
              <button className="w-fit rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white">Save about</button>
            </form>}

            {tab === 'Skills' && <div className="grid gap-3">{data.skills.map((skill, index) => <div key={index} className="grid gap-2 rounded-2xl border border-white/10 p-3 sm:grid-cols-[1fr_180px_auto]">
              {input(skill.name, (value) => setData({ ...data, skills: data.skills.map((item, i) => i === index ? { ...item, name: value } : item) }))}
              <select value={skill.level} onChange={(event) => setData({ ...data, skills: data.skills.map((item, i) => i === index ? { ...item, level: event.target.value as typeof item.level } : item) })} className={inputClass}><option>Advanced</option><option>Intermediate</option><option>Beginner</option></select>
              <button onClick={() => setData({ ...data, skills: data.skills.filter((_, i) => i !== index) })} className="rounded-xl border border-red-400/20 px-3 text-sm text-red-200">Delete</button>
            </div>)}
              <div className="flex flex-wrap gap-2"><button onClick={() => setData({ ...data, skills: [...data.skills, { name: 'New skill', level: 'Intermediate' }] })} className="rounded-xl border border-white/10 px-3 py-2 text-sm">Add skill</button><button onClick={() => saveSection('skills', data.skills)} className="rounded-xl bg-indigo-500 px-3 py-2 text-sm text-white">Save skills</button></div>
            </div>}

            {tab === 'Education' && <ArrayEditor data={data.education as unknown as Record<string, unknown>[]} setData={(value) => setData({ ...data, education: value as unknown as typeof data.education })} fields={['degree', 'institute', 'period']} onSave={() => saveSection('education', data.education)} />}
            {tab === 'Experience' && <ArrayEditor data={data.experience as unknown as Record<string, unknown>[]} setData={(value) => setData({ ...data, experience: value as unknown as typeof data.experience })} fields={['title', 'company', 'period', 'description']} onSave={() => saveSection('experience', data.experience)} />}
            {tab === 'Certificates' && <ArrayEditor data={data.certificates as unknown as Record<string, unknown>[]} setData={(value) => setData({ ...data, certificates: value as unknown as typeof data.certificates })} fields={['title', 'issuer', 'date', 'fileUrl']} onSave={() => saveSection('certificates', data.certificates)} />}
            {tab === 'Social' && <ArrayEditor data={data.socialLinks as unknown as Record<string, unknown>[]} setData={(value) => setData({ ...data, socialLinks: value as unknown as typeof data.socialLinks })} fields={['label', 'href']} onSave={() => saveSection('social', data.socialLinks)} />}

            {tab === 'Contact' && <form className="grid gap-4" onSubmit={async (event) => { event.preventDefault(); await saveSection('contact', data.contact) }}>
              <Field label="Title">{input(data.contact.title, (value) => setData({ ...data, contact: { ...data.contact, title: value } }))}</Field>
              <Field label="Subtitle">{input(data.contact.subtitle, (value) => setData({ ...data, contact: { ...data.contact, subtitle: value } }))}</Field>
              <Field label="Email">{input(data.contact.email, (value) => setData({ ...data, contact: { ...data.contact, email: value } }))}</Field>
              <button className="w-fit rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white">Save contact</button>
            </form>}

            {tab === 'Resume' && <div className="grid gap-4"><p className="text-sm text-zinc-400">Upload a PDF resume. Existing resume links can be replaced or removed.</p>
              <input type="file" accept="application/pdf" onChange={async (event) => {
                const file = event.target.files?.[0]; if (!file) return
                try { const media = await upload(file, 'resume') as { url: string; fileName: string }; setData({ ...data, resume: { title: data.resume.title, fileUrl: media.url, fileName: media.fileName } }) } catch (err) { setError(err instanceof Error ? err.message : 'Upload failed') }
              }} className="text-sm text-zinc-300" />
              {data.resume.fileUrl && <a href={data.resume.fileUrl} target="_blank" className="text-sm text-indigo-300">Open current resume</a>}
              <button onClick={() => save('/.netlify/functions/update-resume', data.resume)} className="w-fit rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white">Save resume</button>
            </div>}

            {tab === 'Projects' && <ProjectsEditor data={data} setData={setData} setError={setError} setNotice={setNotice} upload={upload} />}
          </section>
        </div>
      </div>
    </main>
  )
}

function ArrayEditor({ data, setData, fields, onSave }: { data: Record<string, unknown>[]; setData: (value: Record<string, unknown>[] ) => void; fields: string[]; onSave: () => Promise<void> }) {
  const [item, setItem] = useState<Record<string, unknown> | null>(null)
  return <div className="grid gap-3">{data.map((row, index) => <div key={String(row.id || index)} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3">
    <button onClick={() => setItem(row)} className="text-left"><p className="font-medium text-zinc-100">{String(row.title || row.degree || row.label || row.issuer || 'Item')}</p><p className="mt-1 text-xs text-zinc-400">{String(row.company || row.institute || row.href || row.period || '')}</p></button>
    <button onClick={() => { if (confirm('Delete this item?')) setData(data.filter((_, i) => i !== index)) }} className="rounded-xl border border-red-400/20 px-3 py-2 text-sm text-red-200">Delete</button>
  </div>)}
    {item && <div className="grid gap-3 rounded-2xl border border-indigo-400/20 p-4">{fields.map((field) => <Field key={field} label={field}><input value={String(item[field] || '')} onChange={(event) => setItem({ ...item, [field]: event.target.value })} className={inputClass} /></Field>)}</div>}
    <div className="flex gap-2"><button onClick={() => setItem(fields.reduce((result, field) => ({ ...result, [field]: '', id: crypto.randomUUID() }), {}))} className="rounded-xl border border-white/10 px-3 py-2 text-sm">Add item</button>{item && <button onClick={() => { const exists = data.some((row) => row.id === item.id); setData(exists ? data.map((row) => row.id === item.id ? item : row) : [...data, item]); setItem(null) }} className="rounded-xl border border-indigo-400/40 px-3 py-2 text-sm text-indigo-200">Apply item</button>}<button onClick={onSave} className="rounded-xl bg-indigo-500 px-3 py-2 text-sm text-white">Save all</button></div>
  </div>
}

function ProjectsEditor({ data, setData, setError, setNotice, upload }: { data: PortfolioData; setData: (value: PortfolioData) => void; setError: (value: string) => void; setNotice: (value: string) => void; upload: (file: File, category: string) => Promise<MediaReference> }) {
  const [editing, setEditing] = useState<Project | null>(null)
  async function save(project: Project, create: boolean) {
    setError(''); setNotice('')
    const response = await fetch('/.netlify/functions/manage-projects', { method: create ? 'POST' : 'PUT', credentials: 'include', headers: { 'content-type': 'application/json' }, body: JSON.stringify(project) })
    const body = await response.json()
    if (!response.ok) { setError(body.error || 'Save failed'); return }
    setData({ ...data, projects: create ? [...data.projects, body.project] : data.projects.map((item) => item.id === body.project.id ? body.project : item) })
    setEditing(null); setNotice('Project saved')
  }
  async function remove(id: string) {
    if (!confirm('Delete this project?')) return
    const response = await fetch(`/.netlify/functions/manage-projects?id=${encodeURIComponent(id)}`, { method: 'DELETE', credentials: 'include' })
    if (!response.ok) { setError('Delete failed'); return }
    setData({ ...data, projects: data.projects.filter((item) => item.id !== id) }); setNotice('Project deleted')
  }
  const blank: Project = { id: crypto.randomUUID(), title: '', description: '', technologies: [], liveUrl: '', githubUrl: '', screenshots: [], featured: false, visible: true, order: data.projects.length, highlights: [] }
  return <div className="grid gap-3">{data.projects.sort((a, b) => a.order - b.order).map((project) => <div key={project.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"><div><p className="font-medium text-zinc-100">{project.title}</p><p className="mt-1 text-xs text-zinc-400">{project.visible ? 'Visible' : 'Hidden'} · order {project.order}</p></div><div className="flex gap-2"><button onClick={() => setEditing(project)} className="rounded-xl border border-white/10 px-3 py-2 text-sm">Edit</button><button onClick={() => remove(project.id)} className="rounded-xl border border-red-400/20 px-3 py-2 text-sm text-red-200">Delete</button></div></div>)}
    <button onClick={() => setEditing(blank)} className="w-fit rounded-xl bg-indigo-500 px-3 py-2 text-sm text-white">Add project</button>
    {editing && <form className="grid gap-3 rounded-2xl border border-indigo-400/20 p-4" onSubmit={(event) => { event.preventDefault(); save(editing, !data.projects.some((item) => item.id === editing.id)) }}>
      <Field label="Title"><input value={editing.title} onChange={(event) => setEditing({ ...editing, title: event.target.value })} className={inputClass} /></Field>
      <Field label="Description"><textarea rows={3} value={editing.description} onChange={(event) => setEditing({ ...editing, description: event.target.value })} className={inputClass + ' py-3'} /></Field>
      <div className="grid gap-3 sm:grid-cols-2"><Field label="GitHub URL"><input value={editing.githubUrl || ''} onChange={(event) => setEditing({ ...editing, githubUrl: event.target.value })} className={inputClass} /></Field><Field label="Live URL"><input value={editing.liveUrl || ''} onChange={(event) => setEditing({ ...editing, liveUrl: event.target.value })} className={inputClass} /></Field></div>
      <Field label="Technologies (comma separated)"><input value={editing.technologies.join(', ')} onChange={(event) => setEditing({ ...editing, technologies: event.target.value.split(',').map((value) => value.trim()).filter(Boolean) })} className={inputClass} /></Field>
      <Field label="Highlights (one per line)"><textarea rows={3} value={editing.highlights.join('\n')} onChange={(event) => setEditing({ ...editing, highlights: event.target.value.split('\n').filter(Boolean) })} className={inputClass + ' py-3'} /></Field>
      <div className="grid gap-3 sm:grid-cols-3"><Field label="Display order"><input type="number" value={editing.order} onChange={(event) => setEditing({ ...editing, order: Number(event.target.value) })} className={inputClass} /></Field><label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" checked={editing.featured} onChange={(event) => setEditing({ ...editing, featured: event.target.checked })} />Featured</label><label className="flex items-center gap-2 text-sm text-zinc-300"><input type="checkbox" checked={editing.visible} onChange={(event) => setEditing({ ...editing, visible: event.target.checked })} />Visible</label></div>
      <Field label="Screenshots"><input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={async (event) => { try { const files = Array.from(event.target.files || []); const media = await Promise.all(files.map((file) => upload(file, `projects/${editing.id}`))); setEditing({ ...editing, screenshots: [...editing.screenshots, ...media] }) } catch (err) { setError(err instanceof Error ? err.message : 'Upload failed') } }} /></Field>
      {editing.screenshots.length > 0 && <div className="flex flex-wrap gap-2">{editing.screenshots.map((image) => <img key={image.id} src={image.url} alt="" className="h-20 w-28 rounded-xl object-cover" />)}</div>}
      <div className="flex gap-2"><button className="rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white">Save project</button><button type="button" onClick={() => setEditing(null)} className="rounded-xl border border-white/10 px-4 py-2 text-sm">Cancel</button></div>
    </form>}
  </div>
}

function Protected() {
  const [session, setSession] = useState<boolean | null>(null)
  useEffect(() => {
    fetch('/.netlify/functions/auth-session', { credentials: 'include' })
      .then((response) => setSession(response.ok))
      .catch(() => setSession(false))
  }, [])
  if (session === null) return <main className="grid min-h-dvh place-items-center text-zinc-400">Checking session...</main>
  return session ? <Dashboard /> : <Navigate to="/admin/login" replace />
}

export function AdminApp() {
  return <Routes>
    <Route path="login" element={<Login />} />
    <Route path="" element={<Protected />} />
  </Routes>
}
