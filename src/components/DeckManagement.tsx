"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'

type QuestionType = 'black' | 'white'
type Deck = {
  id: string
  name: string
  questions: { type: QuestionType; content: string }[]
}

export default function DeckManagement() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [newDeckName, setNewDeckName] = useState('')
  const [newQuestion, setNewQuestion] = useState('')
  const [questionType, setQuestionType] = useState<QuestionType>('black')
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null)

  const handleCreateDeck = () => {
    if (newDeckName.trim()) {
      const newDeck: Deck = {
        id: Date.now().toString(),
        name: newDeckName.trim(),
        questions: [],
      }
      setDecks([...decks, newDeck])
      setNewDeckName('')
    }
  }

  const handleAddQuestion = () => {
    if (selectedDeck && newQuestion.trim()) {
      const updatedDeck = {
        ...selectedDeck,
        questions: [...selectedDeck.questions, { type: questionType, content: newQuestion.trim() }],
      }
      setDecks(decks.map(deck => deck.id === selectedDeck.id ? updatedDeck : deck))
      setSelectedDeck(updatedDeck)
      setNewQuestion('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">Deck Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Create New Deck</h2>
          <input
            type="text"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            placeholder="Enter deck name"
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateDeck}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create Deck
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800 p-6 rounded-lg"
        >
          <h2 className="text-2xl font-semibold mb-4">Add Question</h2>
          <select
            value={selectedDeck?.id || ''}
            onChange={(e) => setSelectedDeck(decks.find(deck => deck.id === e.target.value) || null)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            <option value="">Select a deck</option>
            {decks.map(deck => (
              <option key={deck.id} value={deck.id}>{deck.name}</option>
            ))}
          </select>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          >
            <option value="black">Black Card</option>
            <option value="white">White Card</option>
          </select>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter question"
            className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddQuestion}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
          >
            Add Question
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 bg-gray-800 p-6 rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Browse Decks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {decks.map(deck => (
            <motion.div
              key={deck.id}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-700 p-4 rounded-md"
            >
              <h3 className="text-xl font-semibold mb-2">{deck.name}</h3>
              <p>{deck.questions.length} questions</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

