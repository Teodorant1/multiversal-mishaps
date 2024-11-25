"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'

const Card = ({ content, isBlack }: { content: string; isBlack: boolean }) => (
  <motion.div
    className={`w-64 h-96 rounded-lg shadow-lg flex items-center justify-center p-4 text-center text-lg font-bold ${
      isBlack ? 'bg-blue-900 text-white' : 'bg-red-100 text-blue-900'
    } border-2 ${isBlack ? 'border-red-500' : 'border-blue-500'}`}
    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }}
    whileTap={{ scale: 0.95 }}
  >
    {content}
  </motion.div>
)

const blackCards = [
  "In the parallel universe where _____ is considered a delicacy...",
  "The intergalactic treaty was nullified due to _____.",
  "The alien ambassador was shocked to discover Earth's obsession with _____.",
  "The time traveler's biggest mistake was introducing _____ to ancient civilizations.",
  "The secret ingredient in the galaxy's most popular dish is _____.",
]

const allWhiteCards = [
  "Quantum-entangled toast",
  "Sentient body pillows",
  "Time-traveling telemarketers",
  "Interdimensional memes",
  "Gravity-defying hair gel",
  "Telepathic karaoke",
  "Wormhole-flavored ice cream",
  "Antimatter dental floss",
  "Holographic pet rocks",
  "Nebula-powered coffee makers",
]

function shuffleArray(array: string[]) {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

export default function CardGame() {
  const [blackCard, setBlackCard] = useState(blackCards[0])
  const [whiteCards, setWhiteCards] = useState(() => shuffleArray(allWhiteCards).slice(0, 5))

  const shuffleCards = () => {
    setBlackCard(blackCards[Math.floor(Math.random() * blackCards.length)])
    setWhiteCards(shuffleArray(allWhiteCards).slice(0, 5))
  }

  return (
    <div className="flex flex-col items-center">
      <Card content={blackCard} isBlack={true} />
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {whiteCards.map((card, index) => (
          <Card key={index} content={card} isBlack={false} />
        ))}
      </div>
      <motion.button 
        onClick={shuffleCards}
        className="mt-8 px-6 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-full hover:from-red-700 hover:to-blue-700 transition-all duration-300 ease-in-out"
        whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(255,255,255,0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        Shuffle Multiverse
      </motion.button>
    </div>
  )
}
