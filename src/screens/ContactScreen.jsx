import React, { useState } from 'react'
import { CONFIG, PROFILE } from '../data/portfolio.js'

function clean(s) { return s.replace(/[<>]/g, '').trim() }

export default function ContactScreen({ linkedinNotice }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot — real visitors leave this blank
  const [status, setStatus] = useState('') // '' | 'sending' | 'sent' | 'error'
  const [formError, setFormError] = useState('')
  const [copied, setCopied] = useState(false)

  async function submit(e) {
    e.preventDefault()
    const n = clean(name), em = clean(email), sub = clean(subject), msg = clean(message)
    if (website) { setFormError('Submission blocked.'); return }
    if (!n || !msg) { setFormError('Please enter your name and a message.'); return }
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { setFormError('Please enter a valid email address, or leave email blank.'); return }
    if (msg.length > 2000) { setFormError('Please keep the message under 2000 characters.'); return }
    setFormError(''); setStatus('sending')
    // Real backend first: /api/contact (Vercel serverless, see api/contact.js).
    // It only works once RESEND_API_KEY / SMTP env vars are configured.
    // On static GitHub Pages it will 404/501 — that is NOT a success, so fall back honestly.
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: n, email: em, subject: sub, message: msg }) })
      if (res.ok) { setStatus('sent'); return }
    } catch { /* fall through to honest fallback */ }
    if (CONFIG.EMAIL) {
      const s = encodeURIComponent(sub || `Portfolio contact from ${n}`)
      const b = encodeURIComponent(`${msg}\n\nFrom: ${n}${em ? ` (${em})` : ''}`)
      window.location.href = `mailto:${CONFIG.EMAIL}?subject=${s}&body=${b}`
      setStatus('')
      setFormError('Email delivery is not configured on this site yet, so your message was opened in your email composer instead — send it from there to complete it.')
      return
    }
    setStatus('error')
    setFormError('Email delivery is not configured yet — nothing was sent and no fake success is shown. Please reach out via GitHub, or set CONFIG.EMAIL / the backend env vars (see README).')
  }

  async function copyMessage() {
    try { await navigator.clipboard.writeText(`From: ${name}\nSubject: ${subject}\n\n${message}`); setCopied(true) } catch { setCopied(false) }
  }
  async function copyGithub() {
    try { await navigator.clipboard.writeText(PROFILE.github); setCopied(true) } catch { setCopied(false) }
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
        : <p className="notice">Email: not added yet — set it in src/data/portfolio.js to enable the mailto fallback.</p>}
      <button className="btn secondary" onClick={copyGithub}>{copied ? 'Copied ✓' : 'Copy GitHub link'}</button>
      <h4>Send a message</h4>
      {status === 'sent' && <p className="notice" role="status">Message sent — thank you. The backend confirmed delivery.</p>}
      <form onSubmit={submit} className="contact-form">
        <label>Your name<input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
        <label>Your email (optional)<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
        <label>Subject<input value={subject} onChange={(e) => setSubject(e.target.value)} /></label>
        <label>Message<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} maxLength={2000} /></label>
        <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
        <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
        <button className="btn secondary" type="button" onClick={copyMessage}>Copy message</button>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <p className="small muted">No message is faked as sent: it goes through /api/contact when that backend is configured, otherwise it opens your email composer (if an email is set) or says so plainly.</p>
      </form>
    </div>
  )
}
