import React from 'react'
import { CONFIG, PROFILE } from '../data/portfolio.js'
import Avatar from '../components/Avatar.jsx'

export default function AboutScreen() {
  return (
    <div className="screen-body">
      <div className="profile-card">
        <Avatar size={88} />
        <h3>{PROFILE.name}</h3>
        <p className="muted small">{PROFILE.title}</p>
        <p className="avail">{PROFILE.availability}</p>
      </div>
      <p>{PROFILE.intro}</p>
      <h4>Interests</h4>
      <div className="chips">{PROFILE.interests.map((i) => <span className="chip" key={i}>{i}</span>)}</div>
      <h4>Links</h4>
      <a className="row-link" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
      {CONFIG.LINKEDIN_URL
        ? <a className="row-link" href={CONFIG.LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        : <p className="notice">LinkedIn link not added yet — update <code>src/data/portfolio.js</code>.</p>}
    </div>
  )
}
