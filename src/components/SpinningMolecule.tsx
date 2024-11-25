"use client"

import { motion } from 'framer-motion'

export default function SpinningMolecule() {
  const atoms = [
    { x: 0, y: -40 },
    { x: 35, y: 20 },
    { x: -35, y: 20 },
  ]

  return (
    <div className="relative w-64 h-64">
      <motion.div
        className="absolute inset-0"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {atoms.map((atom, index) => (
          <motion.div
            key={index}
            className="absolute w-8 h-8 bg-blue-400 rounded-full"
            style={{ left: "calc(50% - 16px)", top: "calc(50% - 16px)" }}
            animate={{
              x: atom.x,
              y: atom.y,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.2,
            }}
          />
        ))}
        {atoms.map((atom, index) => (
          <motion.div
            key={`line-${index}`}
            className="absolute w-1 bg-blue-200 origin-bottom"
            style={{
              height: "40px",
              left: "calc(50% - 2px)",
              top: "calc(50% - 20px)",
              transformOrigin: "bottom",
            }}
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.5,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

