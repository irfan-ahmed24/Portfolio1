import { portfolio } from '../data/portfolio'

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function resumeHtml() {
  const name = portfolio.person.name
  const role = portfolio.person.role
  const email = portfolio.links.email
  const github = portfolio.links.socials.find((s) => s.label.toLowerCase() === 'github')?.href ?? ''
  const linkedin =
    portfolio.links.socials.find((s) => s.label.toLowerCase() === 'linkedin')?.href ?? ''

  const skills = portfolio.skills.items.map((s) => s.name)

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(name)} — Resume</title>
    <style>
      :root { --fg:#111827; --muted:#4b5563; --line:#e5e7eb; --chip:#111827; --bg:#ffffff; --accent:#4f46e5; }
      * { box-sizing: border-box; }
      html, body { height: 100%; }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--fg);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
        line-height: 1.35;
      }
      a { color: inherit; text-decoration: none; }
      .page { max-width: 920px; margin: 28px auto; padding: 26px; }
      .top { display:flex; gap:18px; align-items:flex-start; justify-content:space-between; }
      .title h1 { margin:0; font-size: 34px; letter-spacing:-0.03em; }
      .title .role { margin-top:6px; font-size: 14px; color: var(--muted); font-weight: 600; }
      .meta { display:grid; gap:6px; justify-items:end; text-align:right; }
      .meta a { font-size: 12px; color: var(--muted); }
      .meta a strong { color: var(--fg); font-weight: 700; }
      .divider { height:1px; background: var(--line); margin: 16px 0 18px; }

      .grid { display:grid; grid-template-columns: 1.25fr 0.75fr; gap: 22px; }
      .section { margin-bottom: 14px; }
      .h { font-size: 12px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin: 0 0 10px; }
      .p { margin: 0; color: var(--fg); font-size: 13px; }
      .bullets { margin: 10px 0 0; padding-left: 16px; color: var(--fg); font-size: 13px; }
      .bullets li { margin: 6px 0; }

      .card { border: 1px solid var(--line); border-radius: 14px; padding: 14px; }
      .chips { display:flex; flex-wrap:wrap; gap:8px; }
      .chip { border:1px solid var(--line); border-radius: 999px; padding: 7px 10px; font-size: 12px; color: var(--chip); background: #f9fafb; }

      .project { display:grid; gap: 4px; margin-bottom: 10px; }
      .project .t { font-weight: 800; font-size: 13px; }
      .project .d { color: var(--muted); font-size: 12px; }

      .photoWrap { display:flex; align-items:center; gap: 12px; }
      .photo {
        width: 62px; height: 62px; border-radius: 14px; border: 1px solid var(--line);
        overflow:hidden; background: #f3f4f6; flex: none;
        display:flex; align-items:center; justify-content:center;
        font-weight: 900; color: var(--accent);
      }
      .photo img { width: 100%; height: 100%; object-fit: cover; display:block; }

      @media print {
        .page { margin: 0; padding: 0; }
        body { background: #fff; }
        a { text-decoration: none; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <div class="top">
        <div class="title">
          <div class="photoWrap">
            <div class="photo" aria-label="Photo">
              <img src="/irfan1.png" alt="${escapeHtml(name)}" onerror="this.remove(); this.parentElement.textContent='IA';" />
            </div>
            <div>
              <h1>${escapeHtml(name)}</h1>
              <div class="role">${escapeHtml(role)}</div>
            </div>
          </div>
        </div>
        <div class="meta">
          <a href="mailto:${encodeURIComponent(email)}"><strong>Email:</strong> ${escapeHtml(
    email,
  )}</a>
          ${linkedin ? `<a href="${escapeHtml(linkedin)}"><strong>LinkedIn:</strong> ${escapeHtml(linkedin)}</a>` : ''}
          ${github ? `<a href="${escapeHtml(github)}"><strong>GitHub:</strong> ${escapeHtml(github)}</a>` : ''}
        </div>
      </div>

      <div class="divider"></div>

      <div class="grid">
        <div>
          <div class="section">
            <div class="h">Profile</div>
            <p class="p">
              Full‑stack developer focused on building responsive, production‑ready web applications.
              Strong in UI, component architecture, and delivering features end‑to‑end.
            </p>
            <ul class="bullets">
              <li>Build clean, responsive UI with modern React + TypeScript patterns.</li>
              <li>Develop backend APIs and database models (Node.js / PHP / Laravel).</li>
              <li>Care about performance, accessibility, and maintainable code.</li>
            </ul>
          </div>

          <div class="section">
            <div class="h">Projects</div>
            <div class="project">
              <div class="t">Portfolio Website</div>
              <div class="d">Modern portfolio with animation, responsive layout, and contact form.</div>
            </div>
            <div class="project">
              <div class="t">Web App UI / CRUD</div>
              <div class="d">Authentication, dashboards, forms, API integration, and database operations.</div>
            </div>
          </div>

          <div class="section">
            <div class="h">Education</div>
            <p class="p">Add your school/college name here — (Year)</p>
          </div>
        </div>

        <div>
          <div class="section card">
            <div class="h">Core Skills</div>
            <div class="chips">
              ${skills.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join('')}
            </div>
          </div>

          <div class="section card">
            <div class="h">Highlights</div>
            <ul class="bullets">
              <li>React, TypeScript, Tailwind UI</li>
              <li>Node.js / PHP / Laravel</li>
              <li>MySQL & MongoDB</li>
            </ul>
          </div>

          <div class="section card">
            <div class="h">How to download</div>
            <p class="p" style="color: var(--muted)">
              In the print dialog, choose <strong>Save as PDF</strong> to download.
            </p>
          </div>
        </div>
      </div>
    </div>

    <script>
      // Auto-open print dialog so visitors can "Save as PDF"
      window.addEventListener('load', () => setTimeout(() => window.print(), 300));
    </script>
  </body>
</html>`
}

export function openResume() {
  const w = window.open('', '_blank', 'noopener,noreferrer')
  if (!w) return
  w.document.open()
  w.document.write(resumeHtml())
  w.document.close()
}

