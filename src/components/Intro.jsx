import React, { useEffect, useRef } from 'react'
import Avatar from './Avatar.jsx'

// Cinematic intro, built with a lightweight canvas particle field and a
// CSS-3D floating phone — deliberately NOT a heavy WebGL/Three.js scene,
// so it loads fast on GitHub Pages, works on low-end phones, and never
// blocks the portfolio if WebGL is unavailable. Reduced motion: static.
export default function Intro({ onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w, h, raf
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const particles = []
    function resize() {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)
    for (let i = 0; i < 90; i++) {
      particles.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.8 + 0.4, s: Math.random() * 0.0006 + 0.0002, o: Math.random() * 0.5 + 0.2 })
    }
    function draw() {
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        if (!reduced) p.y -= p.s
        if (p.y < -0.02) p.y = 1.02
        ctx.beginPath()
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(125, 211, 252, ${p.o})`
        ctx.fill()
      })
      if (!reduced) raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); if (raf) cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="intro-screen" role="dialog" aria-label="Introduction">
      <canvas ref={canvasRef} className="intro-canvas" aria-hidden="true" />
      <button className="intro-skip" onClick={onDone}>Skip intro →</button>
      <div className="intro-phone" aria-hidden="true">
        <div className="intro-phone-screen">
          <Avatar size={72} animated={false} />
          <b>Suyash Tripathi</b>
          <span>React Native Developer</span>
        </div>
      </div>
      <h1 className="intro-name">SUYASH TRIPATHI</h1>
      <p className="intro-role">React Native Developer</p>
      <p className="intro-tag">Building experiences beyond the screen.</p>
      <button className="btn intro-enter" onClick={onDone}>Enter the portfolio →</button>
      <p className="small muted intro-hint">Then choose Web, iOS or Android.</p>
    </div>
  )
}
