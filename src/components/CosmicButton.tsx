"use client"

import { motion } from 'framer-motion'

interface CosmicButtonProps {
  text: string
  color: string
}

export default function CosmicButton({ text, color }: CosmicButtonProps) {
  return (
    <motion.button
      className={`relative overflow-hidden ${color} text-white font-bold py-4 px-8 rounded-full text-lg`}
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
}

