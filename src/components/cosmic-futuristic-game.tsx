"use client";
export const dynamic = "force-static";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Atom, Rocket, Star } from "lucide-react";

interface Question {
  id: string;
  text: string;
}

interface GameProps {
  questions: Question[];
}

export function CosmicFuturisticGame({ questions }: GameProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [playerAnswer, setPlayerAnswer] = useState("");
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [cosmicEnergy, setCosmicEnergy] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setCosmicEnergy((prevEnergy) => Math.max(0, prevEnergy - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnswerVisible(true);
    setCosmicEnergy((prevEnergy) => Math.min(100, prevEnergy + 10));
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex === questions.length - 1 ? 0 : prevIndex + 1,
    );
    setPlayerAnswer("");
    setIsAnswerVisible(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-lg border border-cyan-500 bg-gradient-to-br from-blue-900 to-purple-900 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-300">Cosmic Conundrums</h2>
        <div className="flex items-center space-x-2">
          <Atom className="animate-spin text-cyan-300" />
          <div className="h-4 w-32 overflow-hidden rounded-full bg-gray-800">
            <motion.div
              className="h-full bg-cyan-500"
              initial={{ width: "100%" }}
              animate={{ width: `${cosmicEnergy}%` }}
              transition={{ type: "spring", stiffness: 100 }}
            />
          </div>
        </div>
      </div>

      <div className="relative mb-6 min-h-[200px] rounded-lg bg-gray-800 bg-opacity-50 p-6 backdrop-blur-sm backdrop-filter">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-lg text-cyan-200"
          >
            {questions[currentQuestionIndex]!.text}
          </motion.div>
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={playerAnswer}
            onChange={(e) => setPlayerAnswer(e.target.value)}
            className="w-full rounded-md bg-blue-900 bg-opacity-50 p-2 text-cyan-100 backdrop-blur-sm backdrop-filter focus:outline-none focus:ring-2 focus:ring-cyan-500"
            rows={3}
            placeholder="Enter your cosmic insight..."
          />
          <button
            type="submit"
            className="w-full rounded-md bg-cyan-600 py-2 text-white transition-colors hover:bg-cyan-500"
          >
            Transmit Answer
          </button>
        </form>
      </div>

      {isAnswerVisible && (
        <div className="mb-6 rounded-lg border border-cyan-500 bg-gray-800 bg-opacity-50 p-4 backdrop-blur-sm backdrop-filter">
          <h3 className="mb-2 text-lg font-semibold text-cyan-300">
            Your Cosmic Insight:
          </h3>
          <p className="text-gray-200">{playerAnswer}</p>
        </div>
      )}

      <button
        onClick={nextQuestion}
        className="flex w-full items-center justify-center space-x-2 rounded-md bg-blue-800 bg-opacity-50 py-2 text-cyan-300 backdrop-blur-sm backdrop-filter transition-colors hover:bg-blue-700 hover:bg-opacity-50"
      >
        <span>Next Cosmic Query</span>
        <Rocket className="h-5 w-5" />
      </button>

      <div className="mt-6 flex justify-center">
        <Star className="animate-pulse text-yellow-300" size={32} />
      </div>
    </div>
  );
}
