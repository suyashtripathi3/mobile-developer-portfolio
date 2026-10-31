import React from 'react'
import { EXPERIENCE } from '../data/portfolio.js'

export default function ExperienceScreen() {
  return (
    <div className="screen-body">
      <h3>Professional experience</h3>
      <ol className="timeline">
        {EXPERIENCE.map((e) => (
          <li key={e.company} className={e.current ? 'current' : ''}>
            <span className="timeline-mark">{e.company.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
            <b>{e.role}</b>
            <span>{e.company}</span>
            <span className="period">{e.period}{e.current ? ' · Present' : ''}</span>
            <p className="small">{e.description}</p>
          </li>
        ))}
      </ol>
      <p className="small muted">No start date or duties beyond mobile application development are claimed for the current role, as none were supplied.</p>
    </div>
  )
}
