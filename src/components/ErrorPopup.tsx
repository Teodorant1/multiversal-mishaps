"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { type ErrorPopupProps } from "~/types/projecttypes";

export function ErrorPopup({
  message,
  duration = 15000,
  onDismiss,
}: ErrorPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.5 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 500,
              damping: 30,
            },
          }}
          exit={{
            opacity: 0,
            y: -50,
            scale: 0.8,
            transition: { duration: 0.2 },
          }}
          className="fixed top-4 z-50 -translate-x-1/2"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-lg bg-red-500/20 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative flex w-fit max-w-fit items-center gap-6 rounded-lg border border-red-500/50 bg-gray-900/95 px-8 py-6 text-red-500 shadow-2xl backdrop-blur-sm md:min-w-[600px] md:max-w-2xl">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <AlertCircle className="h-12 w-12" />
              </motion.div>

              <motion.p
                className="flex-1 font-mono text-lg"
                animate={{
                  x: [0, 1, -1, 0],
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                ERROR: {message}
              </motion.p>

              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-red-500"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{
                  duration: duration / 1000,
                  ease: "linear",
                }}
              />

              {[0, 90, 180, 270].map((rotation) => (
                <motion.div
                  key={rotation}
                  className="absolute h-4 w-4"
                  style={{
                    rotate: rotation,
                    ...(rotation === 0 && { top: -2, right: -2 }),
                    ...(rotation === 90 && { bottom: -2, right: -2 }),
                    ...(rotation === 180 && { bottom: -2, left: -2 }),
                    ...(rotation === 270 && { top: -2, left: -2 }),
                  }}
                >
                  <motion.div
                    className="h-full w-full border-l-2 border-t-2 border-red-500"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: rotation / 360,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
