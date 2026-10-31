import React from 'react'
import { PROJECTS } from '../data/portfolio.js'
import Preview from '../components/Preview.jsx'

export function ProjectsList({ onOpen }) {
  return (
    <div className="screen-body">
      <p className="muted small">Tap a project for details. Previews below are illustrative, not real screenshots.</p>
      {PROJECTS.map((p) => (
        <button key={p.id} className="project-row" onClick={() => onOpen(p.id)} aria-label={`Open ${p.name} details`}>
          <span className="app-icon-sm">{p.name[0]}</span>
          <span className="pr-main"><b>{p.name}</b><span>{p.tagline}</span></span>
          <span className={`status ${p.status === 'Completed' ? 'ok' : p.status === 'Under development' ? 'warn' : ''}`}>{p.status}</span>
        </button>
      ))}
    </div>
  )
}

export function ProjectDetail({ project, onBack }) {
  if (!project) return <div className="screen-body"><p>Project not found.</p><button className="btn" onClick={onBack}>Back</button></div>
  return (
    <div className="screen-body">
      <Preview kind={project.preview} />
      <p className="notice small">Illustrative preview — not a real screenshot.</p>
      <h3>{project.name}</h3>
      <p className="muted">{project.tagline}</p>
      <p>{project.description}</p>
      <p><span className={`status ${project.status === 'Completed' ? 'ok' : project.status === 'Under development' ? 'warn' : ''}`}>{project.status}</span></p>
      <p className="small muted">{project.statusNote}</p>
      <h4>Key features</h4>
      <ul>{project.features.map((f) => <li key={f}>{f}</li>)}</ul>
      <h4>Technology stack</h4>
      <div className="chips">{project.stack.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
      <div className="link-row">
        {project.repo && <a className="btn" href={project.repo} target="_blank" rel="noreferrer">GitHub ↗</a>}
        {!project.repo && <p className="notice small">Repository link not verified — none shown.</p>}
        {project.demo && <a className="btn secondary" href={project.demo} target="_blank" rel="noreferrer">Live demo ↗</a>}
      </div>
    </div>
  )
}
