import React, { useEffect, useRef, useState } from 'react'
import Avatar from './Avatar.jsx'
import { PROFILE } from '../data/portfolio.js'

// LinkedIn's own profile badge (their script, their data — the closest LinkedIn
// allows to living inside another page; linkedin.com itself blocks framing).
// If the badge does not render (script blocked, visibility off), a native card
// with only verified facts takes its place — never a broken empty box.
export default function LinkedInBadge({ theme = 'dark' }) {
  const ref = useRef(null)
  const [failed, setFailed] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // The badge script scans the document when it loads, so each mount appends
    // its own copy; LinkedIn's script is idempotent for already-rendered badges.
    const script = document.createElement('script')
    script.src = 'https://platform.linkedin.com/badges/js/profile.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)
    const t = window.setTimeout(() => {
      if (ref.current && !ref.current.querySelector('iframe')) setFailed(true)
    }, 7000)
    return () => { window.clearTimeout(t); script.remove() }
  }, [])

  function copyLink() {
    const url = 'https://www.linkedin.com/in/suyashtripathi3/'
    const done = () => { setCopied(true); window.setTimeout(() => setCopied(false), 2000) }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done).catch(done)
    else done()
  }

  if (failed) {
    return (
      <div className="li-card">
        <Avatar size={72} />
        <h3>{PROFILE.name}</h3>
        <p className="muted">{PROFILE.title}</p>
        <p className="small muted">React Native Developer — DesignersX Web and App Solutions</p>
        <p className="small muted">LinkedIn's profile card did not load here, so this is the short version. The full profile opens on LinkedIn.</p>
        <div className="li-actions">
          <a className="btn" href="https://www.linkedin.com/in/suyashtripathi3/" target="_blank" rel="noreferrer">Open in LinkedIn ↗</a>
          <button className="btn secondary" onClick={copyLink}>{copied ? 'Copied ✓' : 'Copy profile link'}</button>
        </div>
      </div>
    )
  }

  return (
    <div className="li-badge-wrap" ref={ref}>
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme={theme}
        data-type="VERTICAL"
        data-vanity="suyashtripathi3"
        data-version="v1"
      >
        <a className="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/suyashtripathi3/">Suyash Tripathi</a>
      </div>
      <p className="small muted li-note">LinkedIn's own profile card, loaded live from LinkedIn.</p>
    </div>
  )
}
