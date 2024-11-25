"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import ChaoticTitle from './ChaoticTitle'
import CosmicButton from './CosmicButton'

export default function DonateHitchhiker() {
  const [amount, setAmount] = useState('')
  const [message, setMessage] = useState('')

  const handleDonate = () => {
    console.log(`Donating ${amount} credits. Message: ${message}`)
    // Here you would typically handle the actual donation process
  }

  return (
    <div className="max-w-4xl mx-auto text-white">
      <ChaoticTitle text="Don't Panic, Just Donate!" animationType="glitch" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8"
      >
        <p className="text-lg mb-4">
          In the vastness of space, where money is as imaginary as the number 42, your generous donation 
          will help fuel our improbability drive and keep the Heart of Gold running smoothly.
        </p>
        <p className="text-lg mb-4">
          Remember, every credit counts in our quest to find the Ultimate Question of Life, the Universe, and Everything!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label htmlFor="amount" className="block text-lg font-semibold mb-2">Amount of Galactic Credits</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="42"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-lg font-semibold mb-2">Message to the Galaxy</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="So long, and thanks for all the fish!"
            rows={3}
          />
        </div>
        <CosmicButton
          text="Donate to the Infinite Improbability Fund"
          color="bg-gradient-to-r from-green-500 to-blue-500"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-lg italic">
          "A towel is about the most massively useful thing an interstellar hitchhiker can have." 
          - Your donation is our towel in this cosmic adventure!
        </p>
      </motion.div>
    </div>
  )
}

