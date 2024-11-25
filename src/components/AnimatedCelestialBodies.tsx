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
  type: "planet" | "sun" | "star" | "mysterious" | "pyramid";
  subType?: string;
  direction: "left" | "right";
}) => {
  const getGradientColor = (
    type: "planet" | "sun" | "star" | "mysterious" | "pyramid",
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
        : "bg-gradient-to-r from-white via-gray-300 to-blue-400";
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
          return "bg-gradient-to-r from-purple-500 via-red-500 to-orange-600";
      }
    }
    if (type === "mysterious") {
      return "bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900";
    }
    if (type === "pyramid") {
      return "bg-gradient-to-r from-yellow-700 via-yellow-500 to-yellow-300";
    }
    return "bg-gray-500";
  };

  const [randomProps, setRandomProps] = useState<RandomProps | null>(null);

  useEffect(() => {
    const isStar = type === "star";
    const isSun = type === "sun";
    const isMysterious = type === "mysterious";
    const isPyramid = type === "pyramid";
    setRandomProps({
      size: isStar ? rng() * 2 + 1 : rng() * 60 + 20,
      duration: isSun
        ? rng() * 700 + 300
        : isStar
          ? rng() * 30 + 50
          : isMysterious || isPyramid
            ? rng() * 20 + 40
            : rng() * 60 + 60,
      delay: rng() * -40,
      yOffset: rng() * 80,
      color: getGradientColor(type, subType),
    });
  }, [type, subType]);

  if (!randomProps) return null;

  const mysteriousPath = {
    x: [0, 50, -50, 0],
    y: [0, -50, 50, 0],
    scale: [1, 1.2, 0.8, 1],
    rotate: [0, 45, -45, 0],
  };

  return (
    <motion.div
      className={`rounded-full ${randomProps.color} absolute`}
      style={{
        width: randomProps.size,
        height: type === "pyramid" ? randomProps.size * 1.5 : randomProps.size,
        clipPath:
          type === "pyramid" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none",
        opacity: type === "star" ? 0.8 : 1,
        zIndex: type === "star" ? 0 : 10,
        willChange: "transform",
      }}
      initial={{
        x: direction === "left" ? "100vw" : "-100vw",
        y: randomProps.yOffset,
      }}
      animate={
        type === "mysterious" || type === "pyramid"
          ? mysteriousPath
          : {
              x: direction === "left" ? "-100vw" : "100vw",
            }
      }
      transition={{
        x: {
          repeat: Infinity,
          duration: randomProps.duration,
          ease: "linear",
          delay: randomProps.delay,
        },
        ...((type === "mysterious" || type === "pyramid") && {
          duration: randomProps.duration,
          repeat: Infinity,
          repeatType: "loop",
        }),
      }}
    >
      {(type === "mysterious" || type === "pyramid") && (
        <div className="flex h-full w-full items-center justify-center font-bold text-white">
          {type === "mysterious" ? "?" : "Δ"}
        </div>
      )}
    </motion.div>
  );
};

const Spaceship = ({ direction }: { direction: "left" | "right" }) => {
  const [randomProps, setRandomProps] = useState<RandomProps | null>(null);

  useEffect(() => {
    setRandomProps({
      size: rng() * 20 + 30,
      duration: rng() * 20 + 10,
      delay: rng() * -10,
      yOffset: rng() * 80,
      color: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500",
    });
  }, []);

  if (!randomProps) return null;

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

export default function AnimatedCelestialBodies() {
  const celestialConfig = {
    planet: ["gas giant", "icy world", "rocky world", "unknown planet"],
    sun: [null],
    star: ["red giant", "white dwarf"],
    mysterious: [null],
    pyramid: [null],
  };

  const generateBodies = (
    type: "planet" | "sun" | "star" | "mysterious" | "pyramid",
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

  const generateSpaceships = (count: number) =>
    [...Array(count)].map((_, i) => (
      <Spaceship
        key={`spaceship-${i}`}
        direction={i % 2 === 0 ? "left" : "right"}
      />
    ));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {generateBodies("planet", 20, celestialConfig.planet)}
      {generateBodies("sun", 10, celestialConfig.sun)}
      {generateBodies("star", 40, celestialConfig.star)}
      {generateBodies("mysterious", 6, celestialConfig.mysterious)}
      {generateBodies("pyramid", 3, celestialConfig.pyramid)}
      {generateSpaceships(10)}
    </div>
  );
}
