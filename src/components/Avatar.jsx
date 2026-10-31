import React from 'react'
import { PROFILE } from '../data/portfolio.js'

// Animated avatar — waves "hi" every few seconds, then rests.
// A clean, generic person mark, NOT a claimed likeness.
// If PROFILE.photo is set to a confirmed photo URL, that photo is used instead
// (the wave then becomes the "Hi!" bubble over the photo).
export default function Avatar({ size = 76, animated = true }) {
  const inner = PROFILE.photo ? (
    <img className="avatar-img" src={PROFILE.photo} alt="Suyash Tripathi" width={size} height={size} />
  ) : (
    <svg className="avatar-img avatar-svg" viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Illustrated avatar placeholder for Suyash Tripathi">
      <circle cx="50" cy="50" r="50" fill="#0f172a" />
      <circle cx="50" cy="38" r="17" fill="#dbeafe" />
      <path d="M18 92 Q50 58 82 92 Z" fill="#dbeafe" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
      {/* Waving hand, raised on the right side */}
      <g className={animated ? 'wave-hand' : ''}>
        <path d="M76 62 Q84 50 82 38" fill="none" stroke="#dbeafe" strokeWidth="7" strokeLinecap="round" />
        <circle cx="82" cy="34" r="8" fill="#dbeafe" />
        <path d="M78 28 v-6 M82 27 v-7 M86 28 v-6" stroke="#dbeafe" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
  return (
    <span className="avatar-wrap">
      {inner}
      {animated && <span className="hi-bubble" aria-hidden="true">Hi!</span>}
    </span>
  )
}
