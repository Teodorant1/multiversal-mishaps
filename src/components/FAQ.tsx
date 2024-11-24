"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: "What is Multiversal Mishaps?",
    answer: "Multiversal Mishaps is a hilarious party game inspired by Cards Against Humanity, but with a cosmic twist. Players compete to create the funniest combinations of questions and answers across different universes and dimensions."
  },
  {
    question: "How many players can play?",
    answer: "The game is designed for 3 to 10 players. The more players you have, the more chaotic and fun it becomes!"
  },
  {
    question: "Can I create my own cards?",
    answer: "You can create your own custom decks with both question (black) and answer (white) cards. Let your imagination run wild across the multiverse!"
  },
  {
    question: "How long does a typical game last?",
    answer: "A typical game lasts about 30-60 minutes, but you can adjust the winning score to make games shorter or longer."
  },
  {
    question: "Is there an age restriction?",
    answer: "While the base game is suitable for players 17 and up, you can create family-friendly decks for younger players. Always check the deck content before playing with mixed age groups."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.button
              className="w-full text-left bg-gradient-to-r from-purple-800 to-blue-800 p-4 rounded-lg focus:outline-none"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-semibold">{faq.question}</span>
              <motion.span
                className="float-right"
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ▼
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-r from-blue-900 to-purple-900 p-4 rounded-b-lg mt-1"
                >
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-gray-200"
                  >
                    {faq.answer}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

