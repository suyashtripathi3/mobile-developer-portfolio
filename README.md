# Suyash Tripathi — Interactive Mobile Developer Portfolio

Vite + React + JavaScript/JSX only. No TypeScript, no extra runtime dependencies.

## Concept
A cinematic intro (lightweight canvas particles + CSS-3D floating phone, no heavy
WebGL dependency, so it never blocks on low-end devices) leads to
"Choose Your Experience": Web, iOS or Android. All three use the same shared
data in `src/data/portfolio.js` — Web shows full-page sections, iOS/Android
show a single realistic phone. Each phone has a lock screen, a home screen
with 8 working apps (About, Projects, Experience, Skills, Resume, Contact,
GitHub, LinkedIn), swipe gestures, a notifications shade, a control centre
(Wi-Fi/Bluetooth/DND/flashlight/brightness), an app switcher, back/home
navigation, and a brief loading state on app open.

## Email / backend setup (honest)
The contact form never fakes a sent message.
- On static GitHub Pages, there is no server: the form tries `POST /api/contact`
  and, if that is not configured, falls back to opening the visitor's email
  composer (only if `CONFIG.EMAIL` is set in `src/data/portfolio.js`) or shows
  a plain "not configured" error.
- To enable real delivery on Vercel: set `CONFIG.EMAIL` to Suyash's email,
  deploy the repo to Vercel (so `api/contact.js` runs as a serverless function),
  and set env vars `CONTACT_TO` and `RESEND_API_KEY` in Vercel. No API key is
  committed anywhere. Until those are set, the form will say so — it will not
  claim a message was sent.
- Resume PDF is generated in the browser from the same displayed data
  (via jspdf) — no invented education or employment.

## Run
```bash
npm install
npm run dev     # local development
npm run build   # production build to dist/
npm run preview # serve the build locally
```

## Fill in your details (never guessed)
Edit `src/data/portfolio.js` — the `CONFIG` block at the top:
- `LINKEDIN_URL` — until set, the LinkedIn icon opens Contact with an honest notice.
- `EMAIL` — until set, the contact form shows an honest error instead of a fake success.
  When set, the form opens the visitor's email composer via `mailto:`.
- `RESUME_URL` — optional hosted PDF; otherwise the Resume app downloads a
  plain-text resume generated from the same displayed data.

Education is shown as "not added yet" — no degree or college is invented.

## Deploy
- Vercel: import the repo; the Vite build works as-is.
- GitHub Pages: `.github/workflows/deploy.yml` builds and deploys on push to `main`.
  The Vite `base` is `./` so the build works under any path.

## Structure
- `src/data/portfolio.js` — all content, skills, experience, projects, CONFIG
- `src/components/Phone.jsx` — phone frame, lock/home/navigation, app-open loading
- `src/components/Preview.jsx` — CSS-only illustrative project previews
- `src/screens/` — About, Projects (+ detail), Experience, Skills, Resume, Contact
- `src/styles.css`, `src/App.jsx`, `index.html`, `vite.config.js`
