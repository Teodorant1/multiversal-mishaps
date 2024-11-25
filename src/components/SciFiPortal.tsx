"use client"

import { motion } from 'framer-motion'

export default function SciFiPortal() {
  return (
    <div className="relative w-64 h-64">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0 border-4 border-blue-300 rounded-full"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-1 h-1/2 bg-white rounded-full transform -translate-y-1/2" />
      </motion.div>
    </div>
  )
}

