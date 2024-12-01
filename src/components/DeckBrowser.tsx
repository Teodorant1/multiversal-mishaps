"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  text: string;
}

interface Deck {
  id: string;
  name: string;
  author: string;
  questions: Question[];
}

interface DeckBrowserProps {
  deck: Deck;
}

export function DeckBrowser({ deck }: DeckBrowserProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === deck.questions.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === 0 ? deck.questions.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg bg-gradient-to-br from-indigo-900 to-purple-900 p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-cyan-300">{deck.name}</h2>
      <p className="mb-6 text-cyan-200">by {deck.author}</p>

      <div className="relative flex h-48 items-center justify-center rounded-lg bg-gray-800 p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center text-lg text-white"
          >
            {deck && <div>{deck.questions[currentQuestionIndex]!.text}</div>}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevQuestion}
          className="absolute left-2 top-1/2 -translate-y-1/2 transform text-cyan-300 transition-colors hover:text-cyan-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextQuestion}
          className="absolute right-2 top-1/2 -translate-y-1/2 transform text-cyan-300 transition-colors hover:text-cyan-100"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mt-4 text-cyan-200">
        Question {currentQuestionIndex + 1} of {deck.questions.length}
      </div>
    </div>
  );
}
