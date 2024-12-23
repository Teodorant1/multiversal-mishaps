"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "~/components/ui/scroll-area";
import { type combined_type, type question_type } from "~/server/db/schema";
import { format } from "date-fns";
import { Clock } from "lucide-react";

// interface DeckListProps {
//   decks: Deck[];
//   onDeckSelect: (deck: Deck) => void;
//   selectedDeck?: Deck;
// }

export function DeckList({
  decks,
  onDeckSelect,
  selectedDeck,
}: {
  decks: combined_type[];
  onDeckSelect: (deck: string) => void;
  selectedDeck: combined_type | null;
}) {
  return (
    <div className="rounded-lg border border-purple-500/20 bg-gray-900/80 p-4">
      <h2 className="mb-4 text-xl font-bold text-purple-300">Archived Decks</h2>
      <ScrollArea className="h-[400px] pr-4">
        <AnimatePresence mode="wait">
          <motion.div className="z-10 space-y-4">
            {decks.map((deck) => (
              <motion.button
                key={deck.id}
                onClick={() => onDeckSelect(deck.id!)}
                className={`z-20 w-full rounded-lg border p-4 text-left transition-colors ${
                  selectedDeck?.id === deck.id
                    ? "border-purple-500 bg-purple-900/50"
                    : "border-purple-500/20 bg-gray-800/50 hover:border-purple-500/50"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-lg font-semibold text-purple-200">
                  {deck.name}
                </h3>
                <p className="mt-1 text-sm text-purple-300/70">
                  {deck.description}
                </p>
                <div className="mt-2 flex items-center text-xs text-purple-400">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>
                    Updated: {format(new Date(deck.updatedAt!), "MMM d, yyyy")}
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
}
