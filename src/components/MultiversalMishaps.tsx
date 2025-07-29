"use client";
export const dynamic = "force-static";

import { motion } from "framer-motion";
import AnimatedHeader from "./AnimatedHeader";
import ColorChangingTitle from "./ColorChangingTitle";
import CardGame from "./CardGame";

export default function MultiversalMishaps() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4">
      <AnimatedHeader />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20"
      >
        <ColorChangingTitle />
        <CardGame />
      </motion.div>
    </div>
  );
}
