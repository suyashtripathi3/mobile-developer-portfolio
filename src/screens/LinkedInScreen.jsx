import React from 'react'
import LinkedInBadge from '../components/LinkedInBadge.jsx'

export default function LinkedInScreen() {
  return (
    <div className="screen-body li-screen">
      <p className="muted small">LinkedIn does not let its full site open inside another app, so this screen shows LinkedIn's own live profile card instead.</p>
      <LinkedInBadge theme="light" />
      <a className="btn" href="https://www.linkedin.com/in/suyashtripathi3/" target="_blank" rel="noreferrer">Open full profile on LinkedIn ↗</a>
    </div>
  )
}
