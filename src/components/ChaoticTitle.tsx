"use client"

import { motion } from 'framer-motion'

interface ChaoticTitleProps {
  text: string
  animationType: 'portal' | 'explosion' | 'glitch'
}

export default function ChaoticTitle({ text, animationType }: ChaoticTitleProps) {
  const words = text.split(' ')

  const portalAnimation = {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { type: 'spring', stiffness: 260, damping: 20 }
  }

  const explosionAnimation = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: 'spring', stiffness: 500, damping: 10 }
  }

  const glitchAnimation = {
    initial: { x: -20, y: -20, opacity: 0 },
    animate: { x: 0, y: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 100, damping: 10 }
  }

  const getAnimation = (type: string) => {
    switch (type) {
      case 'portal':
        return portalAnimation
      case 'explosion':
        return explosionAnimation
      case 'glitch':
        return glitchAnimation
      default:
        return portalAnimation
    }
  }

  return (
    <h1 className="text-6xl font-bold mb-12 text-center">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-4">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              {...getAnimation(animationType)}
              style={{ textShadow: '0 0 10px rgba(255,255,255,0.7)' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  )
}

