/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { motion } from "framer-motion";

export function SpinningMolecule() {
  return (
    <div className="relative z-10 h-24 w-24">
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-700 to-blue-700"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
          background: [
            "linear-gradient(to right, rgb(109, 40, 217), rgb(29, 78, 216))",
            "linear-gradient(to right, rgb(29, 78, 216), rgb(109, 40, 217))",
            "linear-gradient(to right, rgb(109, 40, 217), rgb(29, 78, 216))",
          ],
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          background: { duration: 3, repeat: Infinity, ease: "linear" },
        }}
      />
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-4 w-4"
            style={{ rotate: i * 120 }}
          >
            <motion.div
              className="absolute h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <div className="h-4 w-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
              <div className="absolute left-1/2 top-1/2 h-16 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-cyan-500 to-transparent opacity-50" />
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
