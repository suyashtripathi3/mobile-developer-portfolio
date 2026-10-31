import React, { useEffect, useRef, useState } from 'react'
import { APPS, PROFILE, PROJECTS } from '../data/portfolio.js'
import AboutScreen from '../screens/AboutScreen.jsx'
import { ProjectsList, ProjectDetail } from '../screens/ProjectsScreen.jsx'
import ExperienceScreen from '../screens/ExperienceScreen.jsx'
import SkillsScreen from '../screens/SkillsScreen.jsx'
import ResumeScreen from '../screens/ResumeScreen.jsx'
import ContactScreen from '../screens/ContactScreen.jsx'
import { CONFIG } from '../data/portfolio.js'

function nowParts() {
  const d = new Date()
  return {
    time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: d.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }),
  }
}

export default function Phone({ kind, featured, exploreRequest, onExploreHandled }) {
  const [locked, setLocked] = useState(true)
  const [screen, setScreen] = useState('home') // home | about | projects | detail | experience | skills | resume | contact
  const [projectId, setProjectId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [linkedinNotice, setLinkedinNotice] = useState(false)
  const [history, setHistory] = useState([])
  const timer = useRef(null)
  const { time, date } = nowParts()

  function openApp(id) {
    if (id === 'github') { window.open(PROFILE.github, '_blank', 'noopener'); return }
    if (id === 'linkedin') {
      if (!CONFIG.LINKEDIN_URL) { setLinkedinNotice(true); navigate('contact'); return }
      window.open(CONFIG.LINKEDIN_URL, '_blank', 'noopener'); return
    }
    navigate(id)
  }

  function navigate(next) {
    setHistory((h) => [...h, screen])
    setLoading(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => { setScreen(next); setLoading(false) }, 300)
  }

  function goBack() {
    setHistory((h) => {
      const prev = h[h.length - 1] || 'home'
      setScreen(prev)
      return h.slice(0, -1)
    })
  }
  function goHome() { setHistory([]); setScreen('home') }

  useEffect(() => {
    if (!exploreRequest) return
    setLocked(false)
    if (exploreRequest.app === 'github') { window.open(PROFILE.github, '_blank', 'noopener') }
    else if (exploreRequest.app === 'linkedin') {
      if (!CONFIG.LINKEDIN_URL) { setLinkedinNotice(true); setHistory([]); setScreen('contact') }
      else { window.open(CONFIG.LINKEDIN_URL, '_blank', 'noopener') }
    }
    else { setHistory([]); setScreen(exploreRequest.app) }
    if (onExploreHandled) onExploreHandled()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exploreRequest])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const titles = { about: 'About Me', projects: 'My Projects', detail: 'Project', experience: 'Experience', skills: 'Technical Skills', resume: 'Resume', contact: 'Contact Me' }
  const project = PROJECTS.find((p) => p.id === projectId)

  return (
    <div className={`phone-wrap ${featured ? 'featured' : ''}`}>
      <div className={`phone ${kind}`} role="region" aria-label={`${kind === 'ios' ? 'iPhone' : 'Pixel'} interactive portfolio`}>
        <div className="phone-notch" aria-hidden="true">
          {kind === 'ios' ? <span className="island" /> : <span className="punch" />}
        </div>
        <div className="status-bar" aria-hidden="true">
          <span>{time}</span>
          <span>{kind === 'ios' ? '📶 5G 🔋' : '📶 🔋 87%'}</span>
        </div>

        {locked ? (
          <div className="lock-screen">
            <p className="lock-date">{date}</p>
            <p className="lock-time">{time}</p>
            <p className="lock-hint">Suyash Tripathi</p>
            <p className="lock-sub">React Native Developer</p>
            <button className="btn unlock" onClick={() => setLocked(false)}>Tap to unlock</button>
          </div>
        ) : loading ? (
          <div className="screen-body skeleton" aria-label="Loading"><i /><i /><i /><i /></div>
        ) : screen === 'home' ? (
          <div className="home-screen">
            <div className="widget">
              <div><small>{date}</small><b>Hello, I build mobile apps.</b></div>
              <span className="widget-temp">📱</span>
            </div>
            <div className="app-grid">
              {APPS.map((a) => (
                <button key={a.id} className="app-btn" onClick={() => openApp(a.id)} aria-label={`Open ${a.label}`}>
                  <span className="app-icon" style={{ background: a.tint }}>{a.icon}</span>
                  <span className="app-label">{a.label}</span>
                </button>
              ))}
            </div>
            <p className="home-foot">Tap an app. GitHub opens in a new tab.</p>
          </div>
        ) : (
          <div className="app-screen">
            <div className="app-header">
              <button className="nav-btn" onClick={goBack} aria-label="Go back">‹ Back</button>
              <b>{titles[screen]}</b>
              <button className="nav-btn" onClick={goHome} aria-label="Go home">Home</button>
            </div>
            <div className="app-scroll">
              {screen === 'about' && <AboutScreen />}
              {screen === 'projects' && <ProjectsList onOpen={(id) => { setProjectId(id); navigate('detail') }} />}
              {screen === 'detail' && <ProjectDetail project={project} onBack={goBack} />}
              {screen === 'experience' && <ExperienceScreen />}
              {screen === 'skills' && <SkillsScreen />}
              {screen === 'resume' && <ResumeScreen />}
              {screen === 'contact' && <ContactScreen linkedinNotice={linkedinNotice} />}
            </div>
          </div>
        )}

        <button className="gesture-bar" onClick={goHome} aria-label="Home gesture bar" />
      </div>
      <p className="phone-caption">{kind === 'ios' ? 'iPhone — iOS experience' : 'Pixel — Android experience'}</p>
    </div>
  )
}
