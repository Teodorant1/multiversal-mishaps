"use client"

import { motion } from 'framer-motion'

const CosmicButton = ({ text }: { text: string }) => (
  <motion.button
    className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-full text-lg"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%', opacity: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    />
    <motion.span
      initial={{ opacity: 0.8 }}
      whileHover={{ opacity: 1 }}
      className="relative z-10"
    >
      {text}
    </motion.span>
    <motion.div
      className="absolute inset-0 bg-white opacity-0"
      whileHover={{ opacity: 0.2, scale: 1.5 }}
      transition={{ duration: 0.3 }}
      style={{ filter: 'blur(20px)' }}
    />
  </motion.button>
)

export default function CosmicButtons() {
  const buttons = [
    'Explore Multiverse',
    'Create Dimension',
    'Time Warp',
    'Quantum Leap',
    'Cosmic Shuffle',
    'Nebula Burst',
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-white">Cosmic Control Panel</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {buttons.map((text, index) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CosmicButton text={text} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

