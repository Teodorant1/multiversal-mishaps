"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import ChaoticTitle from './ChaoticTitle'
import CosmicButton from './CosmicButton'

export default function DonateSeductive() {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleDonate = () => {
    console.log(`Donating ${amount} credits. Message: ${message}`)
    // Here you would typically handle the actual donation process
  }

  return (
    <div className="max-w-4xl mx-auto text-white">
      <ChaoticTitle text="Indulge in Cosmic Generosity" animationType="portal" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg mb-8 backdrop-filter backdrop-blur-sm"
      >
        <p className="text-lg mb-4">
          Darling, your generosity is as alluring as the mysteries of the universe. 
          Let your donation be the gravitational pull that brings us closer together in this cosmic dance.
        </p>
        <p className="text-lg mb-4">
          Every credit you contribute ignites the passion of our interstellar journey. 
          Won't you join us in this tantalizing exploration of the unknown?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 bg-opacity-50 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-sm"
      >
        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-semibold mb-2">Whisper Your Desire (Amount)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="69"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-semibold mb-2">Leave a Tempting Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 bg-opacity-50 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Your words are as intoxicating as stardust..."
            rows={3}
          />
        </div>
        <CosmicButton
          text="Surrender to the Cosmic Passion"
          color="bg-gradient-to-r from-pink-500 to-purple-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-lg italic">
          "In the grand seduction of the cosmos, your generosity is the most irresistible force of all."
        </p>
      </motion.div>
    </div>
  )
}

