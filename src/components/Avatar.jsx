import React from 'react'
import { PROFILE } from '../data/portfolio.js'

// Illustrated avatar — a clean, generic person mark, NOT a claimed likeness.
// If PROFILE.photo is set to a confirmed photo URL, that photo is used instead.
export default function Avatar({ size = 76 }) {
  if (PROFILE.photo) {
    return <img className="avatar-img" src={PROFILE.photo} alt="Suyash Tripathi" width={size} height={size} />
  }
  return (
    <svg className="avatar-img" viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Illustrated avatar placeholder for Suyash Tripathi">
      <circle cx="50" cy="50" r="50" fill="#0f172a" />
      <circle cx="50" cy="38" r="17" fill="#dbeafe" />
      <path d="M18 92 Q50 58 82 92 Z" fill="#dbeafe" />
      <circle cx="50" cy="50" r="48" fill="none" stroke="#38bdf8" strokeWidth="2" opacity="0.6" />
    </svg>
  )
}
