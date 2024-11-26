"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type QuestionType = "black" | "white";
type Deck = {
  id: string;
  name: string;
  questions: { type: QuestionType; content: string }[];
};

export default function DeckManagement() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [newDeckName, setNewDeckName] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [questionType, setQuestionType] = useState<QuestionType>("black");
  const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);

  const handleCreateDeck = () => {
    if (newDeckName.trim()) {
      const newDeck: Deck = {
        id: Date.now().toString(),
        name: newDeckName.trim(),
        questions: [],
      };
      setDecks([...decks, newDeck]);
      setNewDeckName("");
    }
  };

  const handleAddQuestion = () => {
    if (selectedDeck && newQuestion.trim()) {
      const updatedDeck = {
        ...selectedDeck,
        questions: [
          ...selectedDeck.questions,
          { type: questionType, content: newQuestion.trim() },
        ],
      };
      setDecks(
        decks.map((deck) => (deck.id === selectedDeck.id ? updatedDeck : deck)),
      );
      setSelectedDeck(updatedDeck);
      setNewQuestion("");
    }
  };

  return (
    <div className="mx-auto max-w-4xl text-white">
      <h1 className="mb-8 text-center text-4xl font-bold">Deck Management</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <h2 className="mb-4 text-2xl font-semibold">Create New Deck</h2>
          <input
            type="text"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            placeholder="Enter deck name"
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateDeck}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
          >
            Create Deck
          </motion.button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <h2 className="mb-4 text-2xl font-semibold">Add Question</h2>
          <select
            value={selectedDeck?.id ?? ""}
            onChange={(e) =>
              setSelectedDeck(
                decks.find((deck) => deck.id === e.target.value) ?? null,
              )
            }
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a deck</option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </select>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value as QuestionType)}
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="black">Black Card</option>
            <option value="white">White Card</option>
          </select>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter question"
            className="mb-4 w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddQuestion}
            className="w-full rounded-md bg-green-600 px-4 py-2 text-white transition duration-300 hover:bg-green-700"
          >
            Add Question
          </motion.button>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 rounded-lg bg-gray-800 p-6"
      >
        <h2 className="mb-4 text-2xl font-semibold">Browse Decks</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {decks.map((deck) => (
            <motion.div
              key={deck.id}
              whileHover={{ scale: 1.05 }}
              className="rounded-md bg-gray-700 p-4"
            >
              <h3 className="mb-2 text-xl font-semibold">{deck.name}</h3>
              <p>{deck.questions.length} questions</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
