import React, { useState } from 'react'
import { EXPERIENCE, PROFILE, PROJECTS, SKILLS } from '../data/portfolio.js'
import Avatar from './Avatar.jsx'
import Preview from './Preview.jsx'
import ContactScreen from '../screens/ContactScreen.jsx'
import { downloadResume, downloadResumePdf } from '../screens/ResumeScreen.jsx'

// Full-page Web experience, built from the SAME shared data as the phones.
// No second copy of any project, skill or experience lives here.
export default function WebSections() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="web-sections">
      <section className="web-section reveal" id="web-about">
        <p className="section-label">About</p>
        <h2>About me</h2>
        <div className="web-about-grid">
          <div className="web-card web-profile">
            <Avatar size={96} />
            <h3>{PROFILE.name}</h3>
            <p className="muted">{PROFILE.title}</p>
            <p>{PROFILE.availability}</p>
          </div>
          <div className="web-card">
            <p>{PROFILE.intro}</p>
            <div className="chips web-chips">{PROFILE.interests.map((i) => <span className="chip" key={i}>{i}</span>)}</div>
          </div>
        </div>
      </section>

      <section className="web-section reveal" id="web-projects">
        <p className="section-label">Projects</p>
        <h2>Selected work</h2>
        <div className="web-project-grid">
          {PROJECTS.map((p, i) => (
            <button key={p.id} className="web-project-card" onClick={() => setSelected(p)}>
              <span className="web-project-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <Preview kind={p.preview} />
              <span className="web-project-top"><b>{p.name}</b><span className={`status ${p.status === 'Completed' ? 'ok' : p.status === 'Under development' ? 'warn' : ''}`}>{p.status}</span></span>
              <span className="web-project-tag">{p.tagline}</span>
              <span className="small muted">{p.description}</span>
              <span className="chips web-project-stack">{p.stack.slice(0, 3).map((s) => <span className="chip" key={s}>{s}</span>)}{p.stack.length > 3 && <span className="chip">+{p.stack.length - 3} more</span>}</span>
              <span className="web-project-cta">View details →</span>
            </button>
          ))}
        </div>
      </section>

      <section className="web-section reveal" id="web-experience">
        <p className="section-label">Experience</p>
        <h2>Experience</h2>
        <ol className="timeline web-timeline">
          {EXPERIENCE.map((e) => (
            <li key={e.company}>
              <b>{e.role}</b><span>{e.company}</span><span className="period">{e.period}</span>
              <p className="small">{e.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="web-section reveal" id="web-skills">
        <p className="section-label">Skills</p>
        <h2>Technical skills</h2>
        <p className="muted">Mobile development first. {SKILLS.reduce((n, g) => n + g.items.length, 0)} skills across {SKILLS.length} areas — no percentage levels, because these are areas of work, not measured scores.</p>
        {SKILLS.map((g) => (
          <div key={g.group} className={g.emphasis ? 'skill-group emphasis' : 'skill-group'}>
            <h4>{g.group}{g.emphasis ? ' ★' : ''}</h4>
            <div className="chips">{g.items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
          </div>
        ))}
      </section>

      <section className="web-section reveal" id="web-resume">
        <p className="section-label">Resume</p>
        <h2>Resume</h2>
        <div className="web-card">
          <p>{PROFILE.intro}</p>
          <div className="link-row">
            <button className="btn" onClick={downloadResumePdf}>Download resume (PDF)</button>
            <button className="btn secondary" onClick={downloadResume}>Download resume (.txt)</button>
          </div>
          <p className="small muted">The PDF is generated in your browser from exactly the information shown here — no invented education, employment or certifications.</p>
        </div>
      </section>

      <section className="web-section reveal" id="web-contact">
        <p className="section-label">Contact</p>
        <h2>Contact</h2>
        <div className="web-card web-contact-card"><ContactScreen /></div>
      </section>

      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)} role="dialog" aria-modal="true" aria-label={`${selected.name} details`}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close">✕</button>
            <Preview kind={selected.preview} />
            <h3>{selected.name}</h3>
            <p className="muted">{selected.tagline} · <span className={`status ${selected.status === 'Completed' ? 'ok' : selected.status === 'Under development' ? 'warn' : ''}`}>{selected.status}</span></p>
            <p>{selected.description}</p>
            <p className="small muted">{selected.statusNote}</p>
            <h4>Key features</h4>
            <ul>{selected.features.map((f) => <li key={f}>{f}</li>)}</ul>
            <h4>Technology stack</h4>
            <div className="chips">{selected.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
            <div className="link-row">
              {selected.repo && <a className="btn" href={selected.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}
              {!selected.repo && <p className="notice small">Repository link not verified — none shown.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
