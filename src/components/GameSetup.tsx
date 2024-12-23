"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CosmicButton } from "./CosmicButton";

export default function GameSetup() {
  const [playerCount, setPlayerCount] = useState(3);
  const [selectedDeck, setSelectedDeck] = useState("");
  const [winningScore, setWinningScore] = useState(7);
  const [gameName, setGameName] = useState("");
  const [password, setPassword] = useState("");

  // const handleStartGame = () => {
  //   console.log("Starting game with:", {
  //     playerCount,
  //     selectedDeck,
  //     winningScore,
  //     gameName,
  //     password,
  //   });
  // };

  return (
    <div className="mx-auto max-w-2xl text-white">
      <h1 className="mb-8 text-center text-4xl font-bold">Game Setup</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-lg bg-gray-800 p-6"
      >
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold">Game Name</label>
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter game name"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold">
            Password (Optional)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold">
            Number of Players
          </label>
          <input
            type="range"
            min="3"
            max="10"
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            className="w-full"
          />
          <span className="mt-2 block text-center">{playerCount} players</span>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold">
            Select Deck
          </label>
          <select
            value={selectedDeck}
            onChange={(e) => setSelectedDeck(e.target.value)}
            className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a deck</option>
            <option value="classic">Classic Mishaps</option>
            <option value="scifi">Sci-Fi Shenanigans</option>
            <option value="fantasy">Fantasy Follies</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold">
            Winning Score
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={winningScore}
            onChange={(e) => setWinningScore(Number(e.target.value))}
            className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <CosmicButton
          text="Start Game"
          color="bg-gradient-to-r from-green-600 to-blue-600"
        />
      </motion.div>
    </div>
  );
}
