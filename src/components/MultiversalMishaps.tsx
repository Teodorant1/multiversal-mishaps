"use client"

import { motion } from 'framer-motion'
import AnimatedHeader from './AnimatedHeader'
import ColorChangingTitle from './ColorChangingTitle'
import CardGame from './CardGame'

export default function MultiversalMishaps() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden relative">
      <AnimatedHeader />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-20 relative"
      >
        <ColorChangingTitle />
        <CardGame />
      </motion.div>
    </div>
  )
}

