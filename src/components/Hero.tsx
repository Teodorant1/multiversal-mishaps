"use client";

import { motion } from "framer-motion";
import ChaoticTitle from "./ChaoticTitle";
import CosmicButton from "./CosmicButton";

export default function Hero() {
  return (
    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <ChaoticTitle text="Multiversal Mishaps" animationType="explosion" />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mb-8 text-2xl"
        >
          Unleash Chaos Across Dimensions!
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex gap-4"
      >
        <CosmicButton
          onClick={() => {
            console.log("paloki");
          }}
          text="Start Adventure"
          color="bg-gradient-to-r from-pink-600 to-purple-600"
        />
        <CosmicButton
          text="Learn More"
          color="bg-gradient-to-r from-blue-600 to-green-600"
        />
      </motion.div>
      <motion.div
        className="mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.img
          src="/placeholder.svg?height=300&width=300"
          alt="Multiversal Mishaps"
          className="rounded-full shadow-lg"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        />
      </motion.div>
    </div>
  );
}
