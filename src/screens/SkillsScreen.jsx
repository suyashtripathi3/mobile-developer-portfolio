import React from 'react'
import { SKILLS } from '../data/portfolio.js'

export default function SkillsScreen() {
  return (
    <div className="screen-body">
      <p className="muted small">Mobile development first. {SKILLS.reduce((n, g) => n + g.items.length, 0)} skills across {SKILLS.length} areas. No percentage proficiency levels are shown — these are areas of work, not measured scores.</p>
      {SKILLS.map((g) => (
        <section key={g.group} className={g.emphasis ? 'skill-group emphasis' : 'skill-group'}>
          <h4>{g.group}{g.emphasis && ' ★'}</h4>
          <div className="chips">{g.items.map((s) => <span className="chip" key={s}>{s}</span>)}</div>
        </section>
      ))}
    </div>
  )
}
