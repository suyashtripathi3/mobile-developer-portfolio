import React from 'react'

// CSS-only illustrative previews — explicitly NOT real screenshots.
export default function Preview({ kind }) {
  if (kind === 'weather') {
    return (
      <div className="preview preview-weather" aria-label="Illustrative weather preview">
        <span className="pv-city">Your City</span>
        <span className="pv-temp">24°</span>
        <span className="pv-cond">☀️ Clear skies</span>
        <div className="pv-row"><span>Mon ☀️ 24°</span><span>Tue 🌤️ 22°</span><span>Wed 🌧️ 19°</span></div>
      </div>
    )
  }
  if (kind === 'expense') {
    return (
      <div className="preview preview-expense" aria-label="Illustrative expense preview">
        <span className="pv-label">This month</span>
        <div className="pv-bar"><i style={{ width: '62%' }} /></div>
        <div className="pv-bar"><i style={{ width: '38%' }} /></div>
        <span className="pv-small">Personal · Group · Shared</span>
      </div>
    )
  }
  if (kind === 'shop') {
    return (
      <div className="preview preview-shop" aria-label="Illustrative shop preview">
        <div className="pv-card"><span>🎧</span><b>Headphones</b><span>★ 4.8</span></div>
        <div className="pv-card"><span>⌚</span><b>Smartwatch</b><span>★ 4.6</span></div>
      </div>
    )
  }
  return (
    <div className="preview preview-app" aria-label="Illustrative app preview">
      <span className="pv-logo">◈</span><b>App home</b><span className="pv-small">Notifications · Deep links · Account</span>
    </div>
  )
}
