/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import seedrandom from "seedrandom";

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const rng = seedrandom("fixed-seed");

interface RandomProps {
  size: number;
  duration: number;
  delay: number;
  yOffset: number;
  color: string;
}

const CelestialBody = ({
  type,
  subType,
  direction,
}: {
  type: "planet" | "sun" | "star";
  subType?: string; // Optional subtypes for more variety
  direction: "left" | "right";
}) => {
  const getGradientColor = (
    type: "planet" | "sun" | "star",
    subType?: string,
  ): string => {
    if (type === "sun") {
      return "bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-700";
    }
    if (type === "star") {
      return subType === "red giant"
        ? "bg-gradient-to-r from-red-500 via-pink-600 to-red-800"
        : "bg-gradient-to-r from-white via-gray-300 to-blue-400"; // Default for white dwarfs
    }
    if (type === "planet") {
      switch (subType) {
        case "gas giant":
          return "bg-gradient-to-r from-green-400 via-blue-600 to-purple-700";
        case "icy world":
          return "bg-gradient-to-r from-blue-200 via-cyan-400 to-blue-600";
        case "rocky world":
          return "bg-gradient-to-r from-gray-400 via-brown-500 to-gray-600";
        default:
          return "bg-gradient-to-r from-purple-500 via-red-500 to-orange-600"; // Default for unknown planets
      }
    }
    return "bg-gray-500"; // Fallback
  };

  const [randomProps, setRandomProps] = useState<RandomProps | null>(null);

  useEffect(() => {
    const isStar = type === "star";
    const isSun = type === "sun";
    setRandomProps({
      size: isStar ? rng() * 2 + 1 : rng() * 60 + 20,
      duration: isSun
        ? rng() * 500 + 500
        : isStar
          ? rng() * 20 + 60
          : rng() * 40 + 80,
      delay: rng() * -40,
      yOffset: rng() * 80,
      color: getGradientColor(type, subType), // Include the color property
    });
  }, [type, subType]);

  if (!randomProps) return null; // Avoid rendering until hydrated

  return (
    <motion.div
      className={`rounded-full ${randomProps.color} absolute`}
      style={{
        width: randomProps.size,
        height: randomProps.size,
        opacity: type === "star" ? 0.8 : 1,
        zIndex: type === "star" ? 0 : 10,
        willChange: "transform",
      }}
      initial={{
        x: direction === "left" ? "100vw" : "-100vw",
        y: randomProps.yOffset,
      }}
      animate={{
        x: direction === "left" ? "-100vw" : "100vw",
      }}
      transition={{
        x: {
          repeat: Infinity,
          duration: randomProps.duration,
          ease: "linear",
          delay: randomProps.delay,
        },
      }}
      aria-hidden="true"
    />
  );
};

export default function AnimatedCelestialBodies() {
  const celestialConfig = {
    planet: [
      "gas giant",
      "icy world",
      "rocky world",
      "unknown planet", // Default subtype
    ],
    sun: [null], // No subtypes for suns
    star: ["red giant", "white dwarf"],
  };

  const generateBodies = (
    type: "planet" | "sun" | "star",
    count: number,
    subTypes: (string | null)[],
  ) =>
    [...Array(count)].map((_, i) => (
      <CelestialBody
        key={`${type}-${i}`}
        type={type}
        subType={
          subTypes[Math.floor(Math.random() * subTypes.length)] ?? undefined
        }
        direction={i % 2 === 0 ? "left" : "right"}
      />
    ));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {generateBodies("planet", 10, celestialConfig.planet)}
      {generateBodies("sun", 5, celestialConfig.sun)}
      {generateBodies("star", 50, celestialConfig.star)}
    </div>
  );
}
