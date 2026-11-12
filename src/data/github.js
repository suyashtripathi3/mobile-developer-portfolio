// Live GitHub data for the in-app GitHub experience.
// github.com itself cannot be framed (X-Frame-Options: deny), so the app reads the
// public GitHub REST API instead — no key needed for public data, CORS-enabled.
// Every value shown is live from the API; nothing is invented or cached across visits.
export const GH_USER = 'suyashtripathi3'
const API = 'https://api.github.com'

const cache = new Map()
const inflight = new Map()

async function getJSON(url) {
  if (cache.has(url)) return cache.get(url)
  if (inflight.has(url)) return inflight.get(url)
  const p = fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
    .then(async (r) => {
      if (!r.ok) {
        const err = new Error(r.status === 403 ? 'GitHub rate limit reached — try again in a bit.' : `GitHub returned ${r.status}.`)
        err.status = r.status
        throw err
      }
      const data = await r.json()
      cache.set(url, data)
      return data
    })
    .finally(() => inflight.delete(url))
  inflight.set(url, p)
  return p
}

export function getGitHubProfile() {
  return getJSON(`${API}/users/${GH_USER}`)
}

export function getGitHubRepos() {
  return getJSON(`${API}/users/${GH_USER}/repos?per_page=100&sort=updated`)
}

export async function getRepoReadme(repo) {
  const url = `${API}/repos/${GH_USER}/${repo}/readme`
  if (cache.has(url)) return cache.get(url)
  const r = await fetch(url, { headers: { Accept: 'application/vnd.github.raw' } })
  if (r.status === 404) { cache.set(url, null); return null }
  if (!r.ok) throw new Error(`GitHub returned ${r.status}.`)
  const text = await r.text()
  cache.set(url, text)
  return text
}

export function timeAgo(iso) {
  if (!iso) return ''
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days <= 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} mo ago`
  return `${Math.floor(months / 12)} yr ago`
}
