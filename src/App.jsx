import React, { useEffect, useRef, useState } from 'react'
import Phone from './components/Phone.jsx'
import Avatar from './components/Avatar.jsx'
import Intro from './components/Intro.jsx'
import WebSections from './components/WebSections.jsx'
import { PROFILE, PROJECTS } from './data/portfolio.js'

const EXPLORE = [
  { id: 'about', label: 'About Me' }, { id: 'projects', label: 'My Projects' },
  { id: 'experience', label: 'Experience' }, { id: 'skills', label: 'Technical Skills' },
  { id: 'resume', label: 'Resume' }, { id: 'contact', label: 'Contact Me' },
  { id: 'github', label: 'GitHub ↗' },
  { id: 'linkedin', label: 'LinkedIn ↗' },
]

const EXPERIENCES = [
  { id: 'web', icon: '▭', title: 'Explore on Web', desc: 'Discover my portfolio through a premium desktop experience.' },
  { id: 'ios', icon: '◉', title: 'Experience on iOS', desc: 'Explore my portfolio through an iPhone-inspired interface.' },
  { id: 'android', icon: '◎', title: 'Experience on Android', desc: 'Explore my portfolio through a Pixel-inspired interface.' },
]

function tilt(e) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const r = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  e.currentTarget.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-3px)`
}
function untilt(e) { e.currentTarget.style.transform = '' }

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [experience, setExperience] = useState(null) // null | 'web' | 'ios' | 'android'
  const [mode, setMode] = useState('both')
  const [exploreRequest, setExploreRequest] = useState(null)
  const phonesRef = useRef(null)

  const effectiveMode = experience === 'ios' ? 'ios' : experience === 'android' ? 'android' : mode

  function explore(app, projectId) {
    setExploreRequest({ app, projectId, at: Date.now() })
    phonesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function onHeroMouse(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    e.currentTarget.style.setProperty('--px', x.toFixed(3))
    e.currentTarget.style.setProperty('--py', y.toFixed(3))
  }
  useEffect(() => {
    if (!introDone || !experience) return
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('revealed')); return }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target) } }), { threshold: 0.15 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [introDone, experience])

  if (!introDone) return <Intro onDone={() => setIntroDone(true)} />

  if (!experience) {
    return (
      <main>
        <header className="topbar">
          <a className="brand" href="#top"><span className="brand-avatar"><Avatar size={38} /></span> Suyash Tripathi</a>
          <nav aria-label="Primary"><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a></nav>
        </header>
        <section className="choose">
          <p className="eyebrow"><span className="eyebrow-line" /> Suyash Tripathi — React Native Developer</p>
          <h1>CHOOSE YOUR EXPERIENCE</h1>
          <p className="intro">Explore my world through your preferred interface.</p>
          <div className="choose-grid">
            {EXPERIENCES.map((x) => (
              <button key={x.id} className="choose-card" onMouseMove={tilt} onMouseLeave={untilt} onClick={() => setExperience(x.id)}>
                <span className="choose-icon">{x.icon}</span>
                <b>{x.title}</b>
                <span className="muted small">{x.desc}</span>
                <span className="choose-cta">Enter →</span>
              </button>
            ))}
          </div>
          <p className="small muted">All three use the same portfolio data — Web, iOS and Android never disagree about a project or a skill.</p>
        </section>
        <footer>
          <p><b>{PROFILE.name}</b> — {PROFILE.title}</p>
          <p><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a> · <a href="https://www.linkedin.com/in/suyashtripathi3/" target="_blank" rel="noreferrer">LinkedIn</a></p>
        </footer>
      </main>
    )
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-avatar"><Avatar size={38} /></span> Suyash Tripathi</a>
        <nav aria-label="Primary">
          {experience === 'web' && (<><a href="#web-about">About</a><a href="#web-projects">Projects</a><a href="#web-experience">Experience</a><a href="#web-skills">Skills</a><a href="#web-resume">Resume</a><a href="#web-contact">Contact</a></>)}
          <a href="#phones">Phones</a><a href="#explore">Explore</a>
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </header>

      <div className="experience-bar" role="group" aria-label="Experience">
        <span className="small muted">Experience:</span>
        {([['web', 'Web'], ['ios', 'iOS'], ['android', 'Android']]).map(([v, label]) => (
          <button key={v} className={experience === v ? 'active' : ''} aria-pressed={experience === v} onClick={() => { setExperience(v); if (v === 'web') setMode('both') }}>{label}</button>
        ))}
        <button className="exp-change" onClick={() => setExperience(null)}>Change experience</button>
      </div>

      <section className="hero" id="top" onMouseMove={onHeroMouse}>
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {experience === 'ios' ? 'iOS Experience' : experience === 'android' ? 'Android Experience' : 'Web Experience'} · Mobile Application Developer</p>
          <h1>{PROFILE.name}</h1>
          <p className="hero-role">{PROFILE.title}</p>
          <p className="intro">{PROFILE.intro}</p>
          <p className="intro-tagline">Building Mobile Experiences. Designing Beyond Screens.</p>
          <div className="hero-badges" aria-label="Focus areas">
            <span>React Native</span><span>iOS</span><span>Android</span><span>Firebase</span><span>REST APIs</span>
          </div>
          <div className="cta-row">
            <button className="btn" onClick={() => explore('projects')}>See the work →</button>
            <button className="btn secondary" onClick={() => document.getElementById('phones')?.scrollIntoView({ behavior: 'smooth' })}>Try the phones</button>
            <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
          <p className="small muted">This portfolio is two phones, not two screenshots. Unlock one, tap an icon, and it opens — on iOS and on Android. Try it like a phone: swipe up to unlock, tap the status bar for notifications, open Control Centre from the shade, and use Recent apps to switch.</p>

          {experience === 'web' && (
            <div className="mode-toggle" role="group" aria-label="Device presentation mode">
              {([['ios', 'iOS'], ['android', 'Android'], ['both', 'Both']]).map(([v, label]) => (
                <button key={v} className={mode === v ? 'active' : ''} aria-pressed={mode === v} onClick={() => setMode(v)}>{label}</button>
              ))}
            </div>
          )}
        </div>

        <div className="phones" id="phones" ref={phonesRef}>
          {(effectiveMode === 'both' || effectiveMode === 'ios') && (
            <Phone kind="ios" featured={effectiveMode === 'ios'} exploreRequest={effectiveMode === 'ios' || effectiveMode === 'both' ? exploreRequest : null} onExploreHandled={() => setExploreRequest(null)} />
          )}
          {(effectiveMode === 'both' || effectiveMode === 'android') && (
            <Phone kind="android" featured={effectiveMode === 'android'} exploreRequest={effectiveMode === 'android' || effectiveMode === 'both' ? exploreRequest : null} onExploreHandled={() => setExploreRequest(null)} />
          )}
        </div>
      </section>

      {experience === 'web' && <WebSections />}

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
        <p className="small muted">Email is not shown until added in src/data/portfolio.js — no address has been guessed. Education is likewise shown as “not added yet” in the Resume app. Contact delivery needs the backend env vars in README — until then the form never fakes a sent message.</p>
      </footer>
    </main>
  )
}
