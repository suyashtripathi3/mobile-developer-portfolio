import React, { useEffect, useRef, useState } from 'react'
import { APPS, PROFILE, PROJECTS } from '../data/portfolio.js'
import AppIcon from './icons.jsx'
import Avatar from './Avatar.jsx'
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

const TITLES = { about: 'About Me', projects: 'My Projects', detail: 'Project', experience: 'Experience', skills: 'Technical Skills', resume: 'Resume', contact: 'Contact Me', camera: 'Camera' }

export default function Phone({ kind, featured, exploreRequest, onExploreHandled }) {
  const [locked, setLocked] = useState(true)
  const [screen, setScreen] = useState('home')
  const [projectId, setProjectId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [linkedinNotice, setLinkedinNotice] = useState(false)
  const [history, setHistory] = useState([])
  const [now, setNow] = useState(() => nowParts())
  const [shade, setShade] = useState(null) // null | 'notifications' | 'control'
  const [switcher, setSwitcher] = useState(false)
  const [recent, setRecent] = useState([])
  const [brightness, setBrightness] = useState(1)
  const [wifi, setWifi] = useState(true)
  const [bluetooth, setBluetooth] = useState(false)
  const [dnd, setDnd] = useState(false)
  const [flashlight, setFlashlight] = useState(false)
  const [battery, setBattery] = useState(87)
  const [cameraFlash, setCameraFlash] = useState(false)
  const [query, setQuery] = useState('')
  const timer = useRef(null)
  const swipeStart = useRef(null)
  const { time, date } = now

  useEffect(() => {
    const id = window.setInterval(() => setNow(nowParts()), 20000)
    return () => window.clearInterval(id)
  }, [])

  // Real battery level when the browser exposes it, otherwise a believable 87%.
  useEffect(() => {
    if (navigator.getBattery) {
      navigator.getBattery().then((b) => setBattery(Math.round(b.level * 100))).catch(() => {})
    }
  }, [])

  function buzz() { try { navigator.vibrate && navigator.vibrate(8) } catch { /* vibration unsupported */ } }

  function recordRecent(id) {
    if (id === 'home') return
    setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 4))
  }

  function openApp(id) {
    buzz()
    if (id === 'github') { window.open(PROFILE.github, '_blank', 'noopener'); return }
    if (id === 'linkedin') {
      if (!CONFIG.LINKEDIN_URL) { setLinkedinNotice(true); navigate('contact'); return }
      window.open(CONFIG.LINKEDIN_URL, '_blank', 'noopener'); return
    }
    navigate(id)
  }

  function navigate(next) {
    recordRecent(next)
    setHistory((h) => [...h, screen])
    setLoading(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => { setScreen(next); setLoading(false) }, 300)
  }

  function goBack() {
    buzz()
    setHistory((h) => {
      const prev = h[h.length - 1] || 'home'
      setScreen(prev)
      return h.slice(0, -1)
    })
  }
  function goHome() { buzz(); setShade(null); setSwitcher(false); setHistory([]); setScreen('home') }
  function unlock() { buzz(); setLocked(false) }

  function openCamera() { buzz(); setLocked(false); recordRecent('camera'); setHistory([]); setScreen('camera') }

  // Swipe helpers: pointer up, not scroll — used on lock, status bar and home bar.
  function swipeDown(e, onDown) {
    const y = e.clientY
    if (swipeStart.current === null) return
    if (y - swipeStart.current > 60) { onDown(); buzz() }
    swipeStart.current = null
  }
  function swipeUp(e, onUp) {
    const y = e.clientY
    if (swipeStart.current === null) return
    if (swipeStart.current - y > 60) { onUp(); buzz() }
    swipeStart.current = null
  }
  const track = { onPointerDown: (e) => { swipeStart.current = e.clientY } }

  useEffect(() => {
    if (!exploreRequest) return
    setLocked(false)
    if (exploreRequest.app === 'project-detail' && exploreRequest.projectId) {
      setProjectId(exploreRequest.projectId); setHistory([]); setScreen('detail')
    }
    else if (exploreRequest.app === 'github') { window.open(PROFILE.github, '_blank', 'noopener') }
    else if (exploreRequest.app === 'linkedin') {
      if (!CONFIG.LINKEDIN_URL) { setLinkedinNotice(true); setHistory([]); setScreen('contact') }
      else { window.open(CONFIG.LINKEDIN_URL, '_blank', 'noopener') }
    }
    else { setHistory([]); setScreen(exploreRequest.app) }
    if (onExploreHandled) onExploreHandled()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exploreRequest])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const project = PROJECTS.find((p) => p.id === projectId)
  const appLabel = (id) => (id === 'detail' ? (project ? project.name : 'Project') : TITLES[id] || id)
  const appById = (id) => APPS.find((a) => a.id === id)
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const filteredApps = query.trim() ? APPS.filter((a) => a.label.toLowerCase().includes(query.trim().toLowerCase())) : null

  function shutter() {
    buzz()
    setCameraFlash(true)
    window.setTimeout(() => setCameraFlash(false), 220)
  }

  return (
    <div className={`phone-wrap ${featured ? 'featured' : ''}`}>
      <div className={`phone ${kind} ${flashlight ? 'flashlight-on' : ''}`} role="region" aria-label={`${kind === 'ios' ? 'iPhone' : 'Pixel'} interactive portfolio`} style={{ '--brightness': brightness }}>
        <div className="phone-notch" aria-hidden="true">
          {kind === 'ios' ? <span className="island" /> : <span className="punch" />}
        </div>
        <div
          className="status-bar"
          {...track}
          onPointerUp={(e) => { if (!locked) swipeDown(e, () => setShade('notifications')) }}
          onClick={() => { if (!locked) setShade(shade === 'notifications' ? null : 'notifications') }}
          title="Tap for notifications"
        >
          <span>{time}</span>
          <span className="status-icons">
            {dnd && <span>☾</span>}
            {!wifi && <span>No Wi-Fi</span>}
            <span>5G</span><i className="sig" /><i className="sig" /><i className="sig" />
            <span className="battery-pct">{battery}%</span>
            <span className="battery"><i style={{ width: `${battery}%` }} /></span>
          </span>
        </div>

        {locked ? (
          <div
            className="lock-screen"
            {...track}
            onPointerUp={(e) => swipeUp(e, unlock)}
          >
            <div className="lock-orbs" aria-hidden="true"><i /><i /></div>
            <p className="lock-date">{date}</p>
            <p className="lock-time">{time}</p>
            <p className="lock-greet">{greeting} 👋</p>
            <p className="lock-hint">Suyash Tripathi</p>
            <p className="lock-sub">React Native Developer</p>
            <div className="lock-note">
              <b>Portfolio</b><span>Tap an app inside to explore the work.</span>
            </div>
            <button className="btn unlock" onClick={unlock}>Tap to unlock</button>
            <p className="lock-swipe">or swipe up anywhere here</p>
            <div className="lock-shortcuts">
              <button onClick={() => { buzz(); setFlashlight((f) => !f) }} aria-label="Toggle flashlight" className={flashlight ? 'on' : ''}>◉</button>
              <button onClick={openCamera} aria-label="Open camera">◎</button>
            </div>
          </div>
        ) : loading ? (
          <div className="screen-body skeleton" aria-label="Loading"><i /><i /><i /><i /></div>
        ) : screen === 'home' ? (
          <div className="home-screen">
            <div className="widget" onClick={() => openApp('about')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && openApp('about')}>
              <div><small>{date} · {greeting}</small><b>Hello, I build mobile apps.</b><span className="widget-sub">React Native · iOS · Android</span></div>
              <span className="widget-mark"><Avatar size={44} animated={false} /></span>
            </div>
            <div className="mini-widgets">
              <div className="mini-widget"><small>Clock</small><b>{time}</b><span>Live time</span></div>
              <div className="mini-widget"><small>Projects</small><b>{PROJECTS.length} apps</b><span>Inside the phone</span></div>
            </div>
            <label className="home-search" aria-label="Search apps">
              <span>⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search apps…" />
              {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">✕</button>}
            </label>
            {filteredApps ? (
              <div className="app-grid">
                {filteredApps.map((a) => (
                  <button key={a.id} className="app-btn" onClick={() => openApp(a.id)} aria-label={`Open ${a.label}`}>
                    <span className="app-icon" style={{ background: `linear-gradient(145deg, ${a.tint}, ${a.tint} 55%, rgba(0,0,0,.35))` }}><AppIcon id={a.icon} /></span>
                    <span className="app-label">{a.label}</span>
                  </button>
                ))}
                {filteredApps.length === 0 && <p className="small muted">No app matches “{query}”.</p>}
              </div>
            ) : (
              <>
                <div className="app-grid">
                  {APPS.slice(0, 4).map((a) => (
                    <button key={a.id} className="app-btn" onClick={() => openApp(a.id)} aria-label={`Open ${a.label}`}>
                      <span className="app-icon" style={{ background: `linear-gradient(145deg, ${a.tint}, ${a.tint} 55%, rgba(0,0,0,.35))` }}><AppIcon id={a.icon} /></span>
                      <span className="app-label">{a.label}</span>
                    </button>
                  ))}
                </div>
                <p className="home-dots" aria-hidden="true"><i className="on" /><i /><i /></p>
              </>
            )}
            <p className="home-foot">Tap an app. GitHub opens in a new tab. <button className="text-btn" onClick={() => setSwitcher(true)}>Recent apps →</button></p>
            {!filteredApps && (
              <div className="dock" aria-label="Dock">
                {APPS.slice(4).map((a) => (
                  <button key={a.id} className="app-btn dock-btn" onClick={() => openApp(a.id)} aria-label={`Open ${a.label}`}>
                    <span className="app-icon" style={{ background: `linear-gradient(145deg, ${a.tint}, ${a.tint} 55%, rgba(0,0,0,.35))` }}><AppIcon id={a.icon} /></span>
                    <span className="app-label">{a.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : screen === 'camera' ? (
          <div className="app-screen">
            <div className="app-header">
              <button className="nav-btn" onClick={goBack} aria-label="Go back">‹ Back</button>
              <b>Camera</b>
              <button className="nav-btn" onClick={goHome} aria-label="Go home">Home</button>
            </div>
            <div className={`camera-view ${cameraFlash ? 'flash' : ''}`}>
              <div className="camera-frame" />
              <p>Simulated viewfinder — not your device camera.</p>
              <button className="shutter" onClick={shutter} aria-label="Take photo" />
            </div>
          </div>
        ) : (
          <div className={`app-screen ${screen === 'detail' ? 'app-screen-detail' : ''}`}>
            <div className="app-header">
              <button className="nav-btn" onClick={goBack} aria-label="Go back">‹ Back</button>
              <b>{TITLES[screen]}</b>
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

        {/* Notification shade / control centre */}
        {shade && !locked && (
          <div className="shade" {...track} onPointerUp={(e) => swipeUp(e, () => setShade(null))}>
            <div className="shade-handle" />
            <div className="shade-head">
              <b>{shade === 'notifications' ? 'Notifications' : 'Control Centre'}</b>
              <button className="nav-btn" onClick={() => setShade(shade === 'notifications' ? 'control' : 'notifications')}>
                {shade === 'notifications' ? 'Controls →' : '← Notifications'}
              </button>
              <button className="nav-btn" onClick={() => setShade(null)}>Done</button>
            </div>
            {shade === 'notifications' ? (
              <div className="shade-list">
                <button className="shade-item" onClick={() => { setShade(null); openApp('projects') }}><b>Portfolio</b><span>SkySnap, TIWIL, HisabRakho and RN-E-COM are inside — tap to see them.</span><small>{time}</small></button>
                <button className="shade-item" onClick={() => { setShade(null); openApp('experience') }}><b>Experience</b><span>React Native Developer at DesignersX.</span><small>{time}</small></button>
                <button className="shade-item" onClick={() => { setShade(null); openApp('about') }}><b>About Me</b><span>Hello — I build mobile apps for iOS and Android.</span><small>{time}</small></button>
                <p className="small muted">Swipe up on this panel, or tap Done, to close it.</p>
              </div>
            ) : (
              <div className="shade-list">
                <div className="tile-grid">
                  <button className={`tile ${wifi ? 'on' : ''}`} onClick={() => setWifi((v) => !v)}><b>Wi-Fi</b><span>{wifi ? 'On' : 'Off'}</span></button>
                  <button className={`tile ${bluetooth ? 'on' : ''}`} onClick={() => setBluetooth((v) => !v)}><b>Bluetooth</b><span>{bluetooth ? 'On' : 'Off'}</span></button>
                  <button className={`tile ${dnd ? 'on' : ''}`} onClick={() => setDnd((v) => !v)}><b>Do Not Disturb</b><span>{dnd ? 'On' : 'Off'}</span></button>
                  <button className={`tile ${flashlight ? 'on' : ''}`} onClick={() => setFlashlight((v) => !v)}><b>Flashlight</b><span>{flashlight ? 'On' : 'Off'}</span></button>
                </div>
                <label className="brightness-label">Brightness
                  <input type="range" min="70" max="110" value={Math.round(brightness * 100)} onChange={(e) => setBrightness(Number(e.target.value) / 100)} aria-label="Screen brightness" />
                </label>
                <p className="small muted">Battery {battery}% · Brightness changes this phone's screen, not the page around it.</p>
              </div>
            )}
          </div>
        )}

        {/* App switcher */}
        {switcher && !locked && (
          <div className="switcher">
            <div className="shade-head"><b>Recent apps</b><button className="nav-btn" onClick={() => setSwitcher(false)}>Done</button></div>
            <div className="switcher-list">
              <button className="switcher-card" onClick={goHome}><span className="switcher-icon" style={{ background: 'linear-gradient(145deg,#2563eb,#06b6d4)' }}>⌂</span><span><b>Home</b><span>Home screen</span></span></button>
              {recent.map((id) => {
                const app = appById(id)
                return (
                  <button key={id} className="switcher-card" onClick={() => { setSwitcher(false); setScreen(id) }}>
                    {app && <span className="switcher-icon" style={{ background: `linear-gradient(145deg, ${app.tint}, rgba(0,0,0,.35))` }}><AppIcon id={app.icon} /></span>}
                    <span><b>{appLabel(id)}</b><span>Tap to return</span></span>
                  </button>
                )
              })}
              {recent.length === 0 && <p className="small muted">No recent apps yet — open one first.</p>}
            </div>
          </div>
        )}

        {flashlight && <div className="flashlight-glow" aria-hidden="true" />}

        {kind === 'android' && !locked ? (
          <div className="android-nav" aria-label="Android navigation">
            <button onClick={goBack} aria-label="Android back">◁</button>
            <button className="android-home" onClick={goHome} aria-label="Android home">○</button>
            <button onClick={() => setSwitcher(true)} aria-label="Android overview">▢</button>
          </div>
        ) : (
          <button
            className="gesture-bar"
            {...track}
            onPointerUp={(e) => swipeUp(e, goHome)}
            onClick={goHome}
            aria-label="Home gesture bar — swipe up or tap for home"
          />
        )}
      </div>
      <p className="phone-caption">{kind === 'ios' ? 'iPhone — iOS experience' : 'Pixel — Android experience'}</p>
    </div>
  )
}
