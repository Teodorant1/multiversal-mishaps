/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import seedrandom from "seedrandom";

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
  subType?: string;
  direction: "left" | "right";
}) => {
  const getGradientColor = (
    type: "planet" | "sun" | "star",
    subType?: string,
  ): string => {
    if (type === "sun") {
      const isDeepRed = rng() < 0.5;
      return isDeepRed
        ? "bg-gradient-to-r from-red-900 via-red-700 to-red-500"
        : "bg-gradient-to-r from-white via-gray-300 to-gray-100";
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
        ? rng() * 700 + 300 // Range for suns: 300-1000
        : isStar
          ? rng() * 30 + 50 // Range for stars: 50-80
          : rng() * 60 + 60, // Range for planets: 60-120
      delay: rng() * -40,
      yOffset: rng() * 80,
      color: getGradientColor(type, subType),
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
        subType={subTypes[Math.floor(rng() * subTypes.length)] ?? undefined}
        direction={i % 2 === 0 ? "left" : "right"}
      />
    ));

  const Spaceship = ({ direction }: { direction: "left" | "right" }) => {
    const [randomProps, setRandomProps] = useState<RandomProps | null>(null);

    useEffect(() => {
      setRandomProps({
        size: rng() * 20 + 30, // Range: 30-50
        duration: rng() * 20 + 10, // Range: 10-30
        delay: rng() * -10,
        yOffset: rng() * 80,
        color: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500",
      });
    }, []);

    if (!randomProps) return null; // Avoid rendering until hydrated

    return (
      <motion.div
        className={`absolute ${randomProps.color}`}
        style={{
          width: randomProps.size,
          height: randomProps.size / 2,
          clipPath:
            direction === "left"
              ? "polygon(0% 50%, 100% 0%, 100% 100%)"
              : "polygon(0% 0%, 100% 50%, 0% 100%)",
          opacity: 0.8,
          zIndex: 20,
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
      >
        <motion.div
          className="absolute inset-0 bg-blue-500 opacity-50"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    );
  };
  const generateSpaceships = (count: number) =>
    [...Array(count)].map((_, i) => (
      <Spaceship
        key={`spaceship-${i}`}
        direction={i % 2 === 0 ? "left" : "right"}
      />
    ));
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {generateBodies("planet", 10, celestialConfig.planet)}
      {generateBodies("sun", 5, celestialConfig.sun)}
      {generateBodies("star", 50, celestialConfig.star)}
      {generateSpaceships(8)}
    </div>
  );
}
