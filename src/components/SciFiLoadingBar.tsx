"use client"

import { motion } from "framer-motion"

export function SciFiLoadingBar() {
  return (
    <div className="h-2 w-64 overflow-hidden rounded-full bg-gray-900/50 p-0.5">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}

