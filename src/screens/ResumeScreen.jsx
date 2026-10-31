import React from 'react'
import { CONFIG, EXPERIENCE, PROFILE, PROJECTS, SKILLS } from '../data/portfolio.js'

export function resumeText() {
  const lines = [
    PROFILE.name, PROFILE.title, '',
    'SUMMARY', PROFILE.intro, '',
    'SKILLS',
    ...SKILLS.map((g) => `${g.group}: ${g.items.join(', ')}`), '',
    'EXPERIENCE',
    ...EXPERIENCE.map((e) => `${e.role} — ${e.company} (${e.period}) — ${e.description}`), '',
    'PROJECTS',
    ...PROJECTS.map((p) => `${p.name} (${p.status}): ${p.description} Stack: ${p.stack.join(', ')}${p.repo ? ` Repo: ${p.repo}` : ''}`), '',
    'EDUCATION', 'Not added yet', '',
    `GitHub: ${PROFILE.github}`,
    CONFIG.LINKEDIN_URL ? `LinkedIn: ${CONFIG.LINKEDIN_URL}` : 'LinkedIn: Not added yet',
    CONFIG.EMAIL ? `Email: ${CONFIG.EMAIL}` : 'Email: Not added yet',
  ]
  return lines.join('\n')
}

export function viewResume() {
  const blob = new Blob([resumeText()], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank', 'noopener')
  window.setTimeout(() => URL.revokeObjectURL(url), 10000)
}

export async function downloadResumePdf() {
  // Dynamic import: jspdf only loads when the user actually downloads the PDF,
  // so the main portfolio bundle stays light.
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  let y = 56
  const maxW = 500
  function line(text, size = 11, bold = false, gap = 6) {
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.setFontSize(size)
    const lines = doc.splitTextToSize(text, maxW)
    lines.forEach((l) => { if (y > 780) { doc.addPage(); y = 56 } doc.text(l, 48, y); y += size + 4 })
    y += gap
  }
  line(PROFILE.name, 22, true, 2)
  line(PROFILE.title, 12, false, 14)
  line('PROFESSIONAL SUMMARY', 12, true, 2); line(PROFILE.intro)
  line('TECHNICAL SKILLS', 12, true, 2)
  SKILLS.forEach((g) => line(`${g.group}: ${g.items.join(', ')}`))
  line('EXPERIENCE', 12, true, 2)
  EXPERIENCE.forEach((e) => line(`${e.role} — ${e.company} (${e.period}) — ${e.description}`))
  line('PROJECTS', 12, true, 2)
  PROJECTS.forEach((p) => line(`${p.name} (${p.status}): ${p.description} Stack: ${p.stack.join(', ')}${p.repo ? ` Repo: ${p.repo}` : ''}`))
  line('EDUCATION', 12, true, 2); line('Not added yet')
  line(`GitHub: ${PROFILE.github}`)
  line(CONFIG.LINKEDIN_URL ? `LinkedIn: ${CONFIG.LINKEDIN_URL}` : 'LinkedIn: Not added yet')
  line(CONFIG.EMAIL ? `Email: ${CONFIG.EMAIL}` : 'Email: Not added yet')
  doc.save('Suyash-Tripathi-Resume.pdf')
}

export function downloadResume() {
  const blob = new Blob([resumeText()], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'Suyash-Tripathi-Resume.txt'; a.click()
  URL.revokeObjectURL(url)
}

export default function ResumeScreen() {
  return (
    <div className="screen-body">
      <h3>{PROFILE.name}</h3>
      <p className="muted small">{PROFILE.title}</p>
      <div className="link-row">
        <button className="btn" onClick={downloadResumePdf}>Download resume (PDF)</button>
        <button className="btn secondary" onClick={downloadResume}>Download resume (.txt)</button>
        <button className="btn secondary" onClick={viewResume}>View resume</button>
        {CONFIG.RESUME_URL && <a className="btn secondary" href={CONFIG.RESUME_URL} target="_blank" rel="noreferrer">View hosted resume ↗</a>}
      </div>
      <p className="small muted">Download generates a plain-text resume from exactly the information shown here — no invented facts.</p>
      <h4>Professional summary</h4><p>{PROFILE.intro}</p>
      <h4>Technical skills</h4>
      {SKILLS.map((g) => <p className="small" key={g.group}><b>{g.group}:</b> {g.items.join(', ')}</p>)}
      <h4>Experience</h4>
      {EXPERIENCE.map((e) => <p className="small" key={e.company}><b>{e.role}</b> — {e.company} ({e.period})</p>)}
      <h4>Education</h4><p className="small">Education details not added yet.</p>
      <h4>Projects</h4>
      {PROJECTS.map((p) => <p className="small" key={p.id}><b>{p.name}</b> — {p.tagline} ({p.status})</p>)}
    </div>
  )
}
