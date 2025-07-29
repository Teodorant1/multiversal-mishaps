"use client";
export const dynamic = "force-static";
import { motion } from "framer-motion";
import { type ChaoticTitleProps } from "~/types/projecttypes";

export function ChaoticTitle({ title }: ChaoticTitleProps) {
  return (
    <h1 className="text-center text-6xl font-bold">
      {title.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 5,
          }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </h1>
  );
}
