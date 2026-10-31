import React, { useState } from 'react'
import { CONFIG, PROFILE } from '../data/portfolio.js'

export default function ContactScreen({ linkedinNotice }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [formError, setFormError] = useState('')
  const [copied, setCopied] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) { setFormError('Please enter your name and a message.'); return }
    if (!CONFIG.EMAIL) {
      setFormError('No email service configured yet — please reach out via GitHub.')
      return
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name.trim()}`)
    const body = encodeURIComponent(message.trim())
    window.location.href = `mailto:${CONFIG.EMAIL}?subject=${subject}&body=${body}`
    setFormError('')
  }

  async function copyGithub() {
    try { await navigator.clipboard.writeText(PROFILE.github); setCopied(true) }
    catch { setCopied(false) }
  }

  return (
    <div className="screen-body">
      <h3>Contact</h3>
      {linkedinNotice && <p className="notice">LinkedIn link not added yet — update <code>src/data/portfolio.js</code>.</p>}
      <a className="row-link" href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
      {CONFIG.LINKEDIN_URL
        ? <a className="row-link" href={CONFIG.LINKEDIN_URL} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        : <p className="notice">LinkedIn: not added yet.</p>}
      {CONFIG.EMAIL
        ? <a className="row-link" href={`mailto:${CONFIG.EMAIL}`}>Email: {CONFIG.EMAIL} ↗</a>
        : <p className="notice">Email: not added yet.</p>}
      <button className="btn secondary" onClick={copyGithub}>{copied ? 'GitHub link copied ✓' : 'Copy GitHub link'}</button>
      <h4>Send a message</h4>
      <form onSubmit={submit} className="contact-form">
        <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
        <label>Message<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} /></label>
        <button className="btn" type="submit">Send message</button>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <p className="small muted">No message is sent or faked here: if an email is configured, this opens your email composer; otherwise it says so plainly.</p>
      </form>
    </div>
  )
}
