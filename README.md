# Suyash Tripathi — Interactive Mobile Developer Portfolio

Vite + React + JavaScript/JSX only. No TypeScript, no extra runtime dependencies.

## Concept
Two interactive phones in the browser — an iPhone (iOS) and a Pixel (Android).
Each phone has a lock screen, a home screen with 8 working apps (About, Projects,
Experience, Skills, Resume, Contact, GitHub, LinkedIn), in-phone screens, back/home
navigation, and a brief loading state on app open.

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
