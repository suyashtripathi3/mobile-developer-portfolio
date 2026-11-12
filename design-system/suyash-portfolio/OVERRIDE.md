# Overrides for Suyash Portfolio — MASTER.md is untouched, this file wins where it disagrees

Decisions recorded 2026-11-12, following the DoodleVerse round-4 pattern.

## ui-ux-pro-max design-system search — what was rejected and why

- **Pattern "FAQ/Documentation Landing" — REJECTED.** Misclassification: this is a personal
  developer portfolio, not a support site. No search-bar hero, no FAQ accordion, no support
  escalation. Structure stays: cinematic intro → Choose Your Experience (Web / iOS / Android)
  → Web sections or a single phone.
- **Accent #22C55E (green) — REJECTED.** The portfolio's identity is cobalt blue
  (#2563eb, close to the taste-skill deal's cobalt #1f2de6). Green would clash with the
  approved dark cinematic intro and with every existing screen.
- **Typography "JetBrains Mono / IBM Plex Sans" — PARTLY ADOPTED.** JetBrains Mono is already
  used for eyebrows/labels/numbers (added Oct 31). IBM Plex Sans is NOT adopted: Inter is
  already loaded and serves the same neutral sans role; adding a fourth family breaks the
  one-system rule. Headings stay Space Grotesk, body Inter, mono JetBrains Mono.
- **Style "Dark Mode (OLED)" — ADOPTED.** Deep black, high contrast, minimal glow, visible
  focus, reduced-motion respected. This matches the user's approved intro and the whole site.

## design-taste-frontend deal — what was rejected and why

- **Palette "cool-grey-cobalt" (light ground #eef0f3) — REJECTED.** The deal classified the
  page as a service and dealt light grounds. The user approved and loves the dark cinematic
  intro ("intro screen tagdi h"); a light theme would destroy it. Kept: dark OLED ground
  (#070b13 / #0f172a) with the deal's cobalt blue accent family (#2563eb).
- **Type "Hanken Grotesk" — NOT ADOPTED.** Space Grotesk is the same neo-grotesk family and
  is already loaded; swapping adds weight for no gain.
- **Adopted from the taste skill:** one accent (cobalt blue), flat grounds, no violet/lavender
  anywhere, no gradients on buttons/text/frames, one button pair, one card style, one radius
  scale, hover lift 2px + photo zoom 1.02, no tilt, no parallax, no scroll fade-ins, no grain,
  no emoji as icons, plain copy in the user's own voice, one section per screen, equal edges,
  hero enters once on load, the cinematic intro is the page's one dealt moment.

## Standing rules (from the user, unchanged)

- Web = website only, no phone. iOS = only iPhone, Android = only Pixel, everything inside
  that single phone.
- Never invent personal/professional facts, stats, skills, email, education or employment
  details. Only real data from src/data/portfolio.js.
- Contact form never fakes a sent message; email delivery is not configured (no email or
  provider key supplied).
