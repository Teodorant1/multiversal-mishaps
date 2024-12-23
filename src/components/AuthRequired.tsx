/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { motion, useAnimation } from "framer-motion";
import { CosmicButton } from "./CosmicButton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthRequiredProps } from "~/types/projecttypes";

export function AuthRequired({
  message = "ONLY THOSE WHO BEAR THE MARK MAY TRAVERSE BEYOND",
}: AuthRequiredProps) {
  const router = useRouter();
  const controls = useAnimation();
  const [hoveredGlyph, setHoveredGlyph] = useState<number | null>(null);

  // Ancient glyphs that appear to be counting or measuring something
  const glyphs = ["◊", "◇", "⬡", "⬢", "⬣", "⬣+", "⬣++"];

  useEffect(() => {
    void controls.start({
      opacity: [0, 1],
      transition: { duration: 2 },
    });
  }, [controls]);

  // Deterministic star positions and durations
  const stars = Array.from({ length: 100 }, (_, i) => ({
    left: `${(i % 10) * 10 + 5}%`,
    top: `${Math.floor(i / 10) * 10 + 5}%`,
    duration: 5 + (i % 5) * 0.5,
    delay: (i % 4) * 0.5,
  }));

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
      {/* Starfield background */}
      <div className="fixed inset-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px bg-white"
            style={{
              left: star.left,
              top: star.top,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
          />
        ))}
      </div>

      {/* The Monolith */}
      <motion.div
        className="relative aspect-[1/4] w-full max-w-[300px] bg-black"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        {/* Mysterious surface patterns */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />

        {/* Ancient measurement markings */}
        <div className="absolute left-0 h-full w-[1px] bg-gray-800">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-2 bg-gray-700"
              style={{ top: `${(i + 1) * 5}%` }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                width: i % 5 === 0 ? "12px" : "8px",
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Central inscription */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 3 }}
          >
            {/* Ancient glyphs */}
            <div className="mb-8 flex justify-center space-x-4">
              {glyphs.map((glyph, index) => (
                <motion.div
                  key={index}
                  className="cursor-pointer text-2xl text-gray-500"
                  animate={{
                    color: hoveredGlyph === index ? "#67e8f9" : "#6b7280",
                    textShadow:
                      hoveredGlyph === index ? "0 0 10px #67e8f9" : "none",
                  }}
                  whileHover={{
                    scale: 1.2,
                    rotate: 180,
                  }}
                  onHoverStart={() => setHoveredGlyph(index)}
                  onHoverEnd={() => setHoveredGlyph(null)}
                >
                  {glyph}
                </motion.div>
              ))}
            </div>

            {/* Message */}
            <motion.p
              className="font-mono text-sm leading-relaxed tracking-[0.2em] text-gray-400"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {message.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: i * 0.1 + 3,
                    duration: 0.5,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>{" "}
          {/* Actions */}
          <div className="z-20 space-y-4 pt-8">
            <div className="my-5">
              <CosmicButton href="/api/auth/signin" text="INITIATE SEQUENCE" />
            </div>
            <div className="my-5">
              <CosmicButton href="/signup" text="INITIATE REGISTRATION" />
            </div>
            <div className="my-5">
              <CosmicButton href="/" text="TERMINATE SEQUENCE" />
            </div>
          </div>
        </div>

        {/* Mysterious scanning effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent"
          style={{ height: "100px" }}
          animate={{
            top: ["-100px", "100%"],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Edge details */}
        <div className="absolute inset-0 border border-gray-800/50" />

        {/* Corner markers */}
        {[0, 90, 180, 270].map((rotation) => (
          <motion.div
            key={rotation}
            className="absolute h-6 w-6"
            style={{
              rotate: rotation,
              ...(rotation === 0 && { top: -3, right: -3 }),
              ...(rotation === 90 && { bottom: -3, right: -3 }),
              ...(rotation === 180 && { bottom: -3, left: -3 }),
              ...(rotation === 270 && { top: -3, left: -3 }),
            }}
          >
            <motion.div
              className="h-full w-full border-l border-t border-gray-700"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                borderColor: ["#374151", "#67e8f9", "#374151"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: rotation / 360,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
