"use client"

import { motion } from 'framer-motion'

const words = ['Multiversal', 'Mishaps']

export default function ColorChangingTitle() {
  return (
    <h1 className="text-6xl font-bold mb-12 text-center">
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-4">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              animate={{
                color: [
                  'rgb(255, 50, 50)',   // Deep Red
                  'rgb(50, 50, 255)',   // Deep Blue
                  'rgb(255, 255, 255)', // White
                  'rgb(255, 50, 255)',  // Magenta
                  'rgb(255, 50, 50)',   // Back to Deep Red
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: (wordIndex * word.length + charIndex) * 0.1,
              }}
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

