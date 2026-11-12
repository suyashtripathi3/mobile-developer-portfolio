import React, { useEffect, useState } from 'react'
import { getRepoReadme, timeAgo } from '../data/github.js'
import { GitHubError, GitHubSkeleton, RepoRow, useGitHubData } from '../components/GitHubView.jsx'

// In-phone GitHub: real profile + repos from the public GitHub API, browsable
// inside the phone. Code itself can't run inside — GitHub blocks framing — so a
// repo opens its detail (stats, topics, README preview) here, with a link out.
export default function GitHubScreen() {
  const { profile, repos, error, loading, retry } = useGitHubData()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [readme, setReadme] = useState(undefined) // undefined = not loaded yet

  useEffect(() => {
    if (!selected) return
    setReadme(undefined)
    let alive = true
    getRepoReadme(selected.name)
      .then((t) => { if (alive) setReadme(t) })
      .catch(() => { if (alive) setReadme(null) })
    return () => { alive = false }
  }, [selected])

  if (loading) return <div className="screen-body"><GitHubSkeleton /></div>
  if (error) return <div className="screen-body"><GitHubError error={error} retry={retry} /></div>

  if (selected) {
    return (
      <div className="screen-body">
        <button className="back-link" onClick={() => setSelected(null)}>← All repositories</button>
        <h3 className="gh-detail-name">{selected.name}</h3>
        {selected.description && <p className="muted">{selected.description}</p>}
        <div className="gh-stats">
          <span><b>{selected.stargazers_count}</b> stars</span>
          <span><b>{selected.forks_count}</b> forks</span>
          <span><b>{selected.language || '—'}</b></span>
          <span>Updated {timeAgo(selected.updated_at)}</span>
        </div>
        {selected.topics && selected.topics.length > 0 && (
          <div className="chips">{selected.topics.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
        )}
        <h4 className="gh-readme-title">README</h4>
        {readme === undefined && <GitHubSkeleton />}
        {readme === null && <p className="muted small">This repository has no README.</p>}
        {readme && <pre className="gh-readme">{readme.length > 3000 ? `${readme.slice(0, 3000)}…` : readme}</pre>}
        <a className="btn" href={selected.html_url} target="_blank" rel="noreferrer">Open on GitHub ↗</a>
      </div>
    )
  }

  const filtered = (repos || []).filter((r) => !query || r.name.toLowerCase().includes(query.toLowerCase()) || (r.description || '').toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="screen-body">
      {profile && (
        <div className="gh-profile">
          <img className="gh-avatar" src={profile.avatar_url} alt="" width="64" height="64" />
          <div>
            <h3>{profile.name || profile.login}</h3>
            <p className="muted small">@{profile.login}</p>
            {profile.bio && <p className="small">{profile.bio}</p>}
            <p className="gh-counts"><b>{profile.public_repos}</b> repos · <b>{profile.followers}</b> followers · <b>{profile.following}</b> following</p>
          </div>
        </div>
      )}
      <p className="gh-live"><span className="gh-live-dot" /> Live from GitHub — no login needed</p>
      <input className="gh-search" type="search" placeholder="Search repositories" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search repositories" />
      {filtered.length === 0 && <p className="muted small">No repositories match “{query}”.</p>}
      <div className="gh-repo-list">
        {filtered.map((r) => <RepoRow key={r.id} repo={r} onOpen={setSelected} />)}
      </div>
    </div>
  )
}
