import React from 'react'
import { PROFILE } from '../data/portfolio.js'
import { AVATAR_DATA } from '../data/avatar.js'

// Real avatar: the photo Suyash supplied, shown as a circular photo.
// It gently tilts like a greeting and a "Hi!" bubble pops up every few seconds.
// If PROFILE.photo is ever set to another confirmed photo URL, that wins.
export default function Avatar({ size = 76, animated = true }) {
  const src = PROFILE.photo || AVATAR_DATA
  return (
    <span className="avatar-wrap">
      <img className={`avatar-img ${animated ? 'avatar-photo' : ''}`} src={src} alt="Suyash Tripathi" width={size} height={size} />
      {animated && <span className="hi-bubble" aria-hidden="true">Hi!</span>}
    </span>
  )
}
