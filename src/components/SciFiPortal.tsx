"use client";

import { motion } from "framer-motion";

interface SciFiPortalProps {
  className?: string;
}

export default function SciFiPortal({ className = "" }: SciFiPortalProps) {
  return (
    <div className={`relative h-64 w-64 ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
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
        className="absolute inset-0 rounded-full border-4 border-blue-300"
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
        <div className="h-1/2 w-1 -translate-y-1/2 transform rounded-full bg-white" />
      </motion.div>
    </div>
  );
}
