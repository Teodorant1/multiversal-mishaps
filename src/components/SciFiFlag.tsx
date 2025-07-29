"use client";
export const dynamic = "force-static";

import { motion } from "framer-motion";

export function SciFiFlag() {
  return (
    <div className="relative h-32 w-48">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-600 to-blue-900 p-0.5"
        animate={{
          boxShadow: [
            "0 0 20px rgba(34,211,238,0.2)",
            "0 0 40px rgba(34,211,238,0.4)",
            "0 0 20px rgba(34,211,238,0.2)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-y-0 left-0 w-1 bg-cyan-400" />
        <div className="h-full w-full bg-gray-900/90 p-4">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-2">
              <div className="h-0.5 w-full bg-cyan-500/50" />
              <div className="h-0.5 w-3/4 bg-cyan-500/30" />
            </div>
            <div className="space-y-2">
              <div className="h-0.5 w-3/4 bg-cyan-500/30" />
              <div className="h-0.5 w-full bg-cyan-500/50" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
