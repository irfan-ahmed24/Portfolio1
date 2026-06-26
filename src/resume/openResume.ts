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
      :root { 
        --fg:#111827; 
        --muted:#4b5563; 
        --line:#e5e7eb; 
        --chip:#111827; 
        --bg:#ffffff; 
        --accent:#4f46e5; 
      }
      * { box-sizing: border-box; }
      html, body { height: 100%; margin: 0; padding: 0; }
      body {
        background: var(--bg);
        color: var(--fg);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial;
        line-height: 1.4;
      }
      a { color: inherit; text-decoration: none; }
      
      .page { max-width: 920px; margin: 20px auto; padding: 30px; position: relative; }
      .main-title { text-align: center; font-size: 26px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: var(--fg); margin-bottom: 25px; }
      
      /* টপ সেকশন লেআউট */
      .top-layout { display: flex; flex-direction: row-reverse; justify-content: space-between; align-items: flex-start; gap: 20px; }
      
      /* ডানপাশে ছবি */
      .right-pic { flex: none; }
      .photo {
        width: 110px; height: 110px; border-radius: 12px; border: 1px solid var(--line);
        overflow: hidden; background: #f3f4f6; display: flex; align-items: center; justify-content: center;
        font-weight: 900; color: var(--accent); font-size: 24px;
      }
      .photo img { width: 100%; height: 100%; object-fit: cover; display: block; }
      
      /* বামপাশে নাম ও রোল */
      .left-info { text-align: left; flex: 1; }
      .left-info h1 { margin: 0; font-size: 32px; letter-spacing: -0.02em; font-weight: 800; color: var(--fg); }
      .left-info .role { margin-top: 4px; font-size: 15px; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
      
      /* কন্টাক্ট মেটা - লেফট অ্যালাইন */
      .meta-info { margin-top: 10px; display: flex; flex-direction: column; gap: 4px; align-items: flex-start; text-align: left; }
      .meta-info a { font-size: 13px; color: var(--muted); }
      .meta-info a strong { color: var(--fg); }

      .divider { height: 1px; background: var(--line); margin: 20px 0; }

      /* কন্টেন্ট বডি - সব লেফট অ্যালাইন */
      .content-body { text-align: left; display: flex; flex-direction: column; gap: 24px; }
      
      .section { display: flex; flex-direction: column; align-items: flex-start; }
      .section-title { font-size: 13px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin: 0 0 8px 0; }
      
      .p-text { margin: 0; color: var(--fg); font-size: 14px; max-width: 650px; text-align: left; }
      
      /* লিস্ট আইটেম লেফট অ্যালাইন */
      .left-list { margin: 8px 0 0 0; padding: 0; list-style: none; font-size: 14px; color: var(--fg); text-align: left; }
      .left-list li { margin: 6px 0; position: relative; padding-left: 15px; }
      .left-list li::before { content: "•"; position: absolute; left: 0; color: var(--accent); font-weight: bold; }

      /* প্রজেক্ট ও এডুকেশন গ্রিড */
      .item-block { margin-bottom: 12px; display: flex; flex-direction: column; align-items: flex-start; }
      .item-title { font-weight: 700; font-size: 14px; color: var(--fg); }
      .item-desc { color: var(--muted); font-size: 13px; margin-top: 2px; }

      /* স্কিল চিপস লেফট অ্যালাইন */
      .chips { display: flex; flex-wrap: wrap; gap: 6px; justify-content: flex-start; margin-top: 4px; max-width: 600px; }
      .chip { border: 1px solid var(--line); border-radius: 6px; padding: 5px 10px; font-size: 12px; color: var(--chip); background: #f9fafb; font-weight: 500; }

      /* বটম ডাউনলোড বাটন */
      .action-zone { display: flex; justify-content: center; margin-top: 40px; padding-bottom: 20px; }
      .download-btn {
        background: var(--accent); color: #fff; border: none; padding: 12px 28px;
        font-size: 14px; font-weight: 700; border-radius: 8px; cursor: pointer;
        box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); transition: all 0.2s;
        display: inline-flex; align-items: center; gap: 8px; letter-spacing: 0.05em;
      }
      .download-btn:hover { background: #4338ca; transform: translateY(-1px); }

      @media print {
        .page { margin: 0; padding: 0; }
        .action-zone { display: none; }
        body { background: #fff; }
      }
    </style>
  </head>
  <body>
    <div class="page">
      <!-- মিডেলে রেজুমে লেখা -->
      <div class="main-title">Resume</div>

      <div class="top-layout">
        <div class="right-pic">
          <div class="photo" aria-label="Photo">
            <img src="irfan1.jpg" alt="${escapeHtml(name)}" onerror="this.remove(); this.parentElement.textContent='IA';" />
          </div>
        </div>
        
        <!-- বামপাশে নাম ও ডেজিগনেশন -->
        <div class="left-info">
          <h1>${escapeHtml(name)}</h1>
          <div class="role">${escapeHtml(role)}</div>
          
          <div class="meta-info">
            <a href="mailto:${encodeURIComponent(email)}"><strong>Email:</strong> ${escapeHtml(email)}</a>
            ${linkedin ? `<a href="${escapeHtml(linkedin)}" target="_blank"><strong>LinkedIn:</strong> ${escapeHtml(linkedin)}</a>` : ''}
            ${github ? `<a href="${escapeHtml(github)}" target="_blank"><strong>GitHub:</strong> ${escapeHtml(github)}</a>` : ''}
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="content-body">
        <!-- Career Objective Section -->
        <div class="section">
          <div class="section-title">Career Objective</div>
          <p class="p-text">
            Results-driven Full-Stack Web Developer dedicated to engineering high-performance, accessible, and visually stunning web applications. Seeking to leverage robust backend expertise in Laravel and Node.js combined with modern React ecosystem practices to build scalable architectures that solve complex product challenges.
          </p>
          <ul class="left-list">
            <li>Mastering full-stack structures to ensure seamless end-to-end feature delivery.</li>
            <li>Passionate about design systems, security optimization, and fluid micro-interactions.</li>
            <li>Committed to clean code architectures that simplify continuous scaling and integration.</li>
          </ul>
        </div>

        <!-- Core Skills Section -->
        <div class="section">
          <div class="section-title">Core Skills</div>
          <div class="chips">
            ${skills.map((s) => `<span class="chip">${escapeHtml(s)}</span>`).join('')}
          </div>
        </div>

        <!-- Projects Section -->
        <div class="section">
          <div class="section-title">Key Projects</div>
          <div class="item-block">
            <div class="item-title">Interactive Portfolio Platform</div>
            <div class="item-desc">Premium personal portfolio using React, TypeScript, and Tailwind CSS featuring motion-driven UX.</div>
          </div>
          <div class="item-block">
            <div class="item-title">Full-Stack Application & CRUD Systems</div>
            <div class="item-desc">Secure RESTful APIs, multi-role authentication modules, and optimized database architectures.</div>
          </div>
        </div>

        <!-- Technical Highlights -->
        <div class="section">
          <div class="section-title">Technical Highlights</div>
          <ul class="left-list">
            <li>Advanced Client Architectures: React, TypeScript, Tailwind UI</li>
            <li>Backend Engineering: Engine systems via Node.js, PHP, and Laravel Framework</li>
            <li>Database Management: Structured and Non-structured queries (MySQL, PostgreSQL, MongoDB)</li>
          </ul>
        </div>

        <!-- Education Section -->
        <div class="section">
          <div class="section-title">Education</div>
          <div class="item-block">
            <div class="item-title">International University of Business Agriculture and Technology (IUBAT)</div>
            <div class="item-desc">Bachelor of Science in Computer Science and Engineering (BSc in CSE)</div>
          </div>
        </div>
      </div>

      <!-- সবার নিচে ডাউনলোড বাটন -->
      <div class="action-zone">
        <button class="download-btn" onclick="window.print()">
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  </body>
</html>`
}

export function openResume() {
  const w = window.open('about:blank', '_blank');
  
  if (!w) {
    alert('Please allow popups for this website to view the resume!');
    return;
  }

  w.document.open();
  w.document.write(resumeHtml());
  w.document.close();
}