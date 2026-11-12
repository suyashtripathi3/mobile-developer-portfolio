import React, { useEffect, useState } from 'react'
import { getGitHubProfile, getGitHubRepos, timeAgo } from '../data/github.js'

// Shared live-GitHub data + presentational pieces, used by the in-phone GitHub
// screen and by the Web GitHub section. All values come from the public API.
export function useGitHubData() {
  const [profile, setProfile] = useState(null)
  const [repos, setRepos] = useState(null)
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let alive = true
    setError('')
    Promise.all([getGitHubProfile(), getGitHubRepos()])
      .then(([p, r]) => { if (alive) { setProfile(p); setRepos(r) } })
      .catch((e) => { if (alive) setError(e.message || 'Could not reach GitHub.') })
    return () => { alive = false }
  }, [attempt])

  return { profile, repos, error, loading: !profile && !repos && !error, retry: () => setAttempt((a) => a + 1) }
}

export function RepoRow({ repo, onOpen }) {
  return (
    <button className="gh-repo" onClick={() => onOpen && onOpen(repo)}>
      <span className="gh-repo-name">{repo.name}</span>
      {repo.description && <span className="gh-repo-desc">{repo.description}</span>}
      <span className="gh-repo-meta">
        {repo.language && <span><i className="gh-lang-dot" />{repo.language}</span>}
        <span>★ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
        <span>Updated {timeAgo(repo.updated_at)}</span>
      </span>
    </button>
  )
}

export function GitHubError({ error, retry }) {
  return (
    <div className="gh-error">
      <p><b>GitHub did not load.</b></p>
      <p className="muted small">{error}</p>
      <button className="btn secondary" onClick={retry}>Try again</button>
      <a className="btn ghost" href="https://github.com/suyashtripathi3" target="_blank" rel="noreferrer">Open on GitHub ↗</a>
    </div>
  )
}

export function GitHubSkeleton() {
  return (
    <div className="gh-skeleton" aria-label="Loading GitHub">
      <div className="sk sk-line wide" /><div className="sk sk-line" /><div className="sk sk-line" /><div className="sk sk-line wide" />
    </div>
  )
}
