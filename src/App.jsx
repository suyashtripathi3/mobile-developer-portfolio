import React, { useEffect, useRef, useState } from 'react'
import Phone from './components/Phone.jsx'
import Avatar from './components/Avatar.jsx'
import Intro from './components/Intro.jsx'
import WebSections from './components/WebSections.jsx'
import { EXPERIENCE, PROFILE, PROJECTS, SKILLS } from './data/portfolio.js'
import { downloadResumePdf } from './screens/ResumeScreen.jsx'

// Experience rule, as Suyash set it:
//   Web     → website only. No phone, no phone option. Detail opens in the site.
//   iOS     → only the iPhone. Everything else lives inside that phone.
//   Android → only the Pixel. Everything else lives inside that phone.
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

function ExperienceBar({ experience, setExperience }) {
  return (
    <div className="experience-bar" role="group" aria-label="Experience">
      <span className="small muted">Experience:</span>
      {([['web', 'Web'], ['ios', 'iOS'], ['android', 'Android']]).map(([v, label]) => (
        <button key={v} className={experience === v ? 'active' : ''} aria-pressed={experience === v} onClick={() => setExperience(v)}>{label}</button>
      ))}
      <button className="exp-change" onClick={() => setExperience(null)}>Change experience</button>
    </div>
  )
}

function Footer() {
  return (
    <footer>
      <p><b>{PROFILE.name}</b> — {PROFILE.title}</p>
      <p><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a> · <a href="https://www.linkedin.com/in/suyashtripathi3/" target="_blank" rel="noreferrer">LinkedIn</a> · <a href={PROFILE.oldPortfolio} target="_blank" rel="noreferrer">Previous portfolio (for context)</a></p>
      <p className="small muted">Email is not shown until added in src/data/portfolio.js — no address has been guessed. Education is likewise shown as “not added yet” in the Resume section. Contact delivery needs the backend env vars in README — until then the form never fakes a sent message.</p>
    </footer>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [experience, setExperience] = useState(null) // null | 'web' | 'ios' | 'android'

  useEffect(() => {
    if (!introDone || !experience) return
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('revealed')); return }
    const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('revealed'); io.unobserve(en.target) } }), { threshold: 0.12 })
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
        <Footer />
      </main>
    )
  }

  // ── WEB: website only, no phone anywhere ──────────────────────────────
  if (experience === 'web') {
    return (
      <main>
        <header className="topbar">
          <a className="brand" href="#top"><span className="brand-avatar"><Avatar size={38} /></span> Suyash Tripathi</a>
          <nav aria-label="Primary">
            <a href="#web-about">About</a><a href="#web-projects">Projects</a><a href="#web-experience">Experience</a><a href="#web-skills">Skills</a><a href="#web-resume">Resume</a><a href="#web-contact">Contact</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </nav>
        </header>
        <ExperienceBar experience={experience} setExperience={setExperience} />

        <section className="web-hero" id="top">
          <div className="web-hero-card">
            <Avatar size={96} />
            <p className="eyebrow"><span className="eyebrow-line" /> Mobile Application Developer</p>
            <h1>{PROFILE.name}</h1>
            <p className="hero-role">{PROFILE.title}</p>
            <p className="intro">{PROFILE.intro}</p>
            <p className="intro-tagline">Building Mobile Experiences. Designing Beyond Screens.</p>
            <div className="hero-badges" aria-label="Focus areas">
              <span>React Native</span><span>iOS</span><span>Android</span><span>Firebase</span><span>REST APIs</span>
            </div>
            <div className="cta-row">
              <a className="btn" href="#web-projects">Explore projects →</a>
              <button className="btn secondary" onClick={downloadResumePdf}>Download resume (PDF)</button>
              <a className="btn ghost" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            </div>
            <div className="web-counts" aria-label="Portfolio contents">
              <span><b>{PROJECTS.length}</b> projects</span>
              <span><b>{EXPERIENCE.length}</b> roles</span>
              <span><b>{SKILLS.length}</b> skill areas</span>
              <span><b>Mobile-first</b> always</span>
            </div>
          </div>
        </section>

        <WebSections />
        <Footer />
      </main>
    )
  }

  // ── iOS / Android: one phone only, everything inside it ───────────────
  const kind = experience // 'ios' | 'android'
  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-avatar"><Avatar size={38} /></span> Suyash Tripathi</a>
        <nav aria-label="Primary"><a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a></nav>
      </header>
      <ExperienceBar experience={experience} setExperience={setExperience} />

      <section className="phone-stage">
        <p className="eyebrow"><span className="eyebrow-line" /> {kind === 'ios' ? 'iOS Experience' : 'Android Experience'}</p>
        <h1>{PROFILE.name}</h1>
        <p className="muted">Everything is inside this {kind === 'ios' ? 'iPhone' : 'Pixel'} — unlock it, tap an app, and explore About, Projects, Experience, Skills, Resume and Contact from within.</p>
        <p className="small muted">Try it like a phone: swipe up to unlock, tap the status bar for notifications, open Control Centre from the shade, and use Recent apps to switch.</p>
        <div className="phones phones-single">
          <Phone kind={kind} featured exploreRequest={null} onExploreHandled={() => {}} />
        </div>
      </section>
      <Footer />
    </main>
  )
}
