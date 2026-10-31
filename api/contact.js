// Vercel serverless contact endpoint (NOT used on static GitHub Pages).
// Setup (do NOT commit secrets — set them in Vercel → Settings → Environment Variables):
//   CONTACT_TO        — the email that should receive messages (Suyash's email)
//   RESEND_API_KEY    — Resend API key (https://resend.com), OR
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS — for nodemailer instead.
// If neither provider is configured, this returns 501 and the frontend
// honestly falls back to mailto / an error — it never fakes a sent message.
//
// To use Resend, install it in your Vercel project: npm install resend
// (it is deliberately NOT in package.json here, so the static site stays light).
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const clean = (s) => String(s || '').replace(/[<>]/g, '').trim().slice(0, 2000)
  const name = clean(req.body?.name)
  const email = clean(req.body?.email)
  const subject = clean(req.body?.subject)
  const message = clean(req.body?.message)
  if (!name || !message) return res.status(400).json({ error: 'Name and message are required' })
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Invalid email' })
  const to = process.env.CONTACT_TO
  const apiKey = process.env.RESEND_API_KEY
  if (!to || !apiKey) return res.status(501).json({ error: 'Email delivery is not configured on the server' })
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Portfolio <onboarding@resend.dev>',
        to: [to],
        subject: subject || `Portfolio contact from ${name}`,
        text: `${message}\n\nFrom: ${name}${email ? ` (${email})` : ''}`,
      }),
    })
    if (!r.ok) return res.status(502).json({ error: 'Email provider rejected the message' })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'Email provider unreachable' })
  }
}
