import React, { useRef, useState } from 'react'
import Phone from './components/Phone.jsx'
import { PROFILE } from './data/portfolio.js'

const EXPLORE = [
  { id: 'about', label: 'About Me' }, { id: 'projects', label: 'My Projects' },
  { id: 'experience', label: 'Experience' }, { id: 'skills', label: 'Technical Skills' },
  { id: 'resume', label: 'Resume' }, { id: 'contact', label: 'Contact Me' },
  { id: 'github', label: 'GitHub ↗' },
  { id: 'linkedin', label: 'LinkedIn ↗' },
]

export default function App() {
  const [mode, setMode] = useState('both') // ios | android | both
  const [exploreRequest, setExploreRequest] = useState(null)
  const phonesRef = useRef(null)

  function explore(app) {
    setExploreRequest({ app, at: Date.now() })
    phonesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">ST</span> Suyash Tripathi</a>
        <nav aria-label="Primary">
          <a href="#phones">Phones</a><a href="#explore">Explore</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Mobile Application Developer</p>
          <h1>{PROFILE.name}</h1>
          <h2>{PROFILE.title}</h2>
          <p className="intro">{PROFILE.intro}</p>
          <div className="hero-badges" aria-label="Focus areas">
            <span>React Native</span><span>iOS</span><span>Android</span><span>Firebase</span><span>REST APIs</span>
          </div>
          <div className="cta-row">
            <button className="btn" onClick={() => explore('projects')}>View projects</button>
            <button className="btn secondary" onClick={() => document.getElementById('phones')?.scrollIntoView({ behavior: 'smooth' })}>Open the phones</button>
            <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <p className="small muted">Two real, working device experiences — iOS and Android — not screenshots. Every app icon inside the phones does something.</p>

          <div className="mode-toggle" role="group" aria-label="Device presentation mode">
            {([['ios', 'iOS'], ['android', 'Android'], ['both', 'Both']]).map(([v, label]) => (
              <button key={v} className={mode === v ? 'active' : ''} aria-pressed={mode === v} onClick={() => setMode(v)}>{label}</button>
            ))}
          </div>
          <p className="small muted">Toggle switches which device is shown or enlarged. On “Both”, both phones are interactive.</p>
        </div>

        <div className="phones" id="phones" ref={phonesRef}>
          {(mode === 'both' || mode === 'ios') && (
            <Phone kind="ios" featured={mode === 'ios'} exploreRequest={mode === 'ios' || mode === 'both' ? exploreRequest : null} onExploreHandled={() => setExploreRequest(null)} />
          )}
          {(mode === 'both' || mode === 'android') && (
            <Phone kind="android" featured={mode === 'android'} exploreRequest={mode === 'android' || mode === 'both' ? exploreRequest : null} onExploreHandled={() => setExploreRequest(null)} />
          )}
        </div>
      </section>

      <section className="explore" id="explore">
        <h2>Explore without tiny taps</h2>
        <p>These buttons open the same app inside the featured phone above — useful on small screens and with a keyboard.</p>
        <div className="explore-grid">
          {EXPLORE.map((e) => (
            <button key={e.id} className="explore-btn" onClick={() => explore(e.id)}>{e.label}</button>
          ))}
        </div>
      </section>

      <footer>
        <p><b>{PROFILE.name}</b> — {PROFILE.title}</p>
        <p><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a> · <a href={PROFILE.oldPortfolio} target="_blank" rel="noreferrer">Previous portfolio (for context)</a></p>
        <p className="small muted">LinkedIn and email are intentionally not shown until added in src/data/portfolio.js — no profile or address has been guessed. Education is likewise shown as “not added yet” in the Resume app.</p>
      </footer>
    </main>
  )
}
