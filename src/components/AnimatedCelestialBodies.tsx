/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
export const dynamic = "force-static";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { type RandomProps } from "~/types/projecttypes";

function createRng() {
  let seed = 1234;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

const rng = createRng();

function CelestialBody({
  type,
  subType,
  direction,
}: {
  type: "planet" | "sun" | "star" | "mysterious" | "pyramid";
  subType?: string;
  direction: "left" | "right";
}) {
  const getGradientColor = (
    type: "planet" | "sun" | "star" | "mysterious" | "pyramid",
  ): string => {
    if (type === "sun") {
      const colors = [
        "from-yellow-500 via-orange-500 to-red-500",
        "from-white via-yellow-200 to-orange-300",
        "from-blue-400 via-cyan-300 to-teal-400",
      ];
      return `bg-gradient-to-r ${colors[Math.floor(rng() * colors.length)]}`;
    }
    if (type === "star") {
      const colors = [
        "from-white via-blue-200 to-blue-400",
        "from-yellow-200 via-yellow-400 to-yellow-600",
        "from-red-400 via-red-500 to-red-700",
      ];
      return `bg-gradient-to-r ${colors[Math.floor(rng() * colors.length)]}`;
    }
    if (type === "planet") {
      const colors = [
        "from-green-400 via-blue-600 to-purple-700",
        "from-blue-200 via-cyan-400 to-blue-600",
        "from-gray-400 via-brown-500 to-gray-600",
        "from-red-500 via-orange-500 to-yellow-500",
        "from-indigo-500 via-purple-500 to-pink-500",
      ];
      return `bg-gradient-to-r ${colors[Math.floor(rng() * colors.length)]}`;
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
            ? rng() * 1000 + 2000
            : rng() * 60 + 60,
      delay: rng() * -40,
      yOffset: rng() * 80,
      color: getGradientColor(type),
    });
  }, [type, subType]);

  if (!randomProps) return null;

  const mysteriousOrPyramidPath = {
    x: [0, 100, 0, -100, 0],
    y: [0, 100, 0, -100, 0],
  };

  const regularPath = {
    x: direction === "left" ? ["100vw", "-100vw"] : ["-100vw", "100vw"],
  };

  const animationPath =
    type === "mysterious" || type === "pyramid"
      ? mysteriousOrPyramidPath
      : regularPath;

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
        y:
          type === "mysterious" || type === "pyramid" ? 0 : randomProps.yOffset,
      }}
      animate={animationPath}
      transition={{
        duration: randomProps.duration,
        repeat: Infinity,
        ease: "linear",
        delay: randomProps.delay,
      }}
    >
      {type === "pyramid" && (
        <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-yellow-900">
          Δ
        </div>
      )}
      {type === "mysterious" && (
        <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-red-500">
          ?
        </div>
      )}
    </motion.div>
  );
}

function Spaceship({ direction }: { direction: "left" | "right" }) {
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
        duration: randomProps.duration,
        repeat: Infinity,
        ease: "linear",
        delay: randomProps.delay,
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
}

export function AnimatedCelestialBodies() {
  const celestialConfig = {
    planet: ["gas giant", "icy world", "rocky world", "unknown planet"],
    sun: [null],
    star: ["red giant", "white dwarf"],
    mysterious: [null],
    pyramid: [null],
  };

  const generateBodies = (
    type: "planet" | "sun" | "star" | "pyramid" | "mysterious",
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
    <div className="pointer-events-none fixed inset-0 w-full overflow-hidden">
      {generateBodies("mysterious", 1, celestialConfig.mysterious)}
      {generateBodies("pyramid", 1, celestialConfig.pyramid)}
      {generateBodies("planet", 20, celestialConfig.planet)}
      {generateBodies("sun", 6, celestialConfig.sun)}
      {generateBodies("star", 60, celestialConfig.star)}
      {generateSpaceships(10)}
    </div>
  );
}
