import React, { useEffect, useRef, useState } from 'react'
import Phone from './components/Phone.jsx'
import Avatar from './components/Avatar.jsx'
import { PROFILE, PROJECTS } from './data/portfolio.js'

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

  function explore(app, projectId) {
    setExploreRequest({ app, projectId, at: Date.now() })
    phonesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Subtle desktop parallax on the phones + gentle reveal on scroll.
  // Skipped entirely for touch and reduced-motion users.
  function onHeroMouse(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.setProperty('--px', x.toFixed(3))
    e.currentTarget.style.setProperty('--py', y.toFixed(3))
  }
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('revealed')); return }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target) } }), { threshold: 0.15 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-avatar"><Avatar size={38} /></span> Suyash Tripathi</a>
        <nav aria-label="Primary">
          <a href="#phones">Phones</a><a href="#explore">Explore</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>

      <section className="hero" id="top" onMouseMove={onHeroMouse}>
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> Mobile Application Developer</p>
          <h1>{PROFILE.name}</h1>
          <p className="hero-role">{PROFILE.title}</p>
          <p className="intro">{PROFILE.intro}</p>
          <div className="hero-badges" aria-label="Focus areas">
            <span>React Native</span><span>iOS</span><span>Android</span><span>Firebase</span><span>REST APIs</span>
          </div>
          <div className="cta-row">
            <button className="btn" onClick={() => explore('projects')}>See the work →</button>
            <button className="btn secondary" onClick={() => document.getElementById('phones')?.scrollIntoView({ behavior: 'smooth' })}>Try the phones</button>
            <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <p className="small muted">This portfolio is two phones, not two screenshots. Unlock one, tap an icon, and it opens — on iOS and on Android.</p>

          <div className="mode-toggle" role="group" aria-label="Device presentation mode">
            {([['ios', 'iOS'], ['android', 'Android'], ['both', 'Both']]).map(([v, label]) => (
              <button key={v} className={mode === v ? 'active' : ''} aria-pressed={mode === v} onClick={() => setMode(v)}>{label}</button>
            ))}
          </div>
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

      <section className="work-strip reveal" aria-label="Selected work">
        <p className="section-label">Selected work</p>
        <div className="work-list">
          {PROJECTS.map((p) => (
            <button key={p.id} className="work-item" onClick={() => explore('project-detail', p.id)}>
              <span className="work-dot" style={{ background: p.color }} />
              <span><b>{p.name}</b><span className="work-tag">{p.tagline}</span></span>
              <span className="work-status">{p.status} →</span>
            </button>
          ))}
        </div>
      </section>

      <section className="explore reveal" id="explore">
        <h2>Inside the phones</h2>
        <p>Prefer buttons to tiny taps? These open the same app inside the phone above — handy on small screens and with a keyboard.</p>
        <div className="explore-grid">
          {EXPLORE.map((e) => (
            <button key={e.id} className="explore-btn" onClick={() => explore(e.id)}>{e.label}</button>
          ))}
        </div>
      </section>

      <footer>
        <p><b>{PROFILE.name}</b> — {PROFILE.title}</p>
        <p><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a> · <a href="https://www.linkedin.com/in/suyashtripathi3/" target="_blank" rel="noreferrer">LinkedIn</a> · <a href={PROFILE.oldPortfolio} target="_blank" rel="noreferrer">Previous portfolio (for context)</a></p>
        <p className="small muted">Email is not shown until added in src/data/portfolio.js — no address has been guessed. Education is likewise shown as “not added yet” in the Resume app.</p>
      </footer>
    </main>
  )
}
