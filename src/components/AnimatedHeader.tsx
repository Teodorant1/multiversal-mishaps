"use client"

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const CelestialBody = ({ type, direction }: { type: 'planet' | 'sun' | 'star', direction: 'left' | 'right' }) => {
  const [randomProps, setRandomProps] = useState({
    size: 0,
    color: '',
    duration: 0,
    delay: 0,
    yOffset: 0,
  })

  useEffect(() => {
    setRandomProps({
      size: type === 'star' ? Math.random() * 2 + 1 : Math.random() * 60 + 20,
      color: type === 'sun' ? 'bg-yellow-500' : 
             type === 'star' ? 'bg-white' : 
             `bg-${['blue', 'red', 'purple'][Math.floor(Math.random() * 3)]}-${Math.floor(Math.random() * 3 + 5)}00`,
      duration: type === 'star' ? Math.random() * 20 + 60 : Math.random() * 40 + 80,
      delay: Math.random() * -40,
      yOffset: Math.random() * 80,
    })
  }, [type])

  return (
    <motion.div
      className={`rounded-full ${randomProps.color} absolute`}
      style={{
        width: randomProps.size,
        height: randomProps.size,
        opacity: type === 'star' ? 0.8 : 1,
        zIndex: type === 'star' ? 0 : 10,
      }}
      initial={{ x: direction === 'left' ? '100vw' : '-100vw' }}
      animate={{
        x: direction === 'left' ? '-100vw' : '100vw',
        y: randomProps.yOffset,
      }}
      transition={{
        x: {
          repeat: Infinity,
          duration: randomProps.duration,
          ease: 'linear',
          delay: randomProps.delay,
        },
        y: {
          repeat: Infinity,
          duration: randomProps.duration / 2,
          yoyo: true,
          ease: 'easeInOut',
          delay: randomProps.delay,
        },
      }}
    />
  )
}

export default function AnimatedHeader() {
  return (
    <div className="w-full h-60 relative overflow-hidden mb-8">
      {[...Array(10)].map((_, i) => (
        <CelestialBody key={`planet-${i}`} type="planet" direction={i % 2 === 0 ? 'left' : 'right'} />
      ))}
      {[...Array(5)].map((_, i) => (
        <CelestialBody key={`sun-${i}`} type="sun" direction={i % 2 === 0 ? 'left' : 'right'} />
      ))}
      {[...Array(50)].map((_, i) => (
        <CelestialBody key={`star-${i}`} type="star" direction={i % 2 === 0 ? 'left' : 'right'} />
      ))}
    </div>
  )
}

