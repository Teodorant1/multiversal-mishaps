"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { type deck_type, type question_type } from "~/server/db/schema";
import { CosmicButton } from "./CosmicButton";

export function DeckQuestionsListPublic({
  deck,
  all_questions,
}: {
  deck: deck_type;
  all_questions: question_type[];
}) {
  const [shuffledSituations, setShuffledSituations] = useState(() =>
    all_questions
      .filter((q) => q.isSituation === true)
      .sort(() => Math.random() - 0.5),
  );
  const [shuffledQuestions, setShuffledQuestions] = useState(() =>
    all_questions
      .filter((q) => q.isSituation === false)
      .sort(() => Math.random() - 0.5),
  );

  const handleShuffle = () => {
    setShuffledSituations((prev) => [...prev].sort(() => Math.random() - 0.5));
    setShuffledQuestions((prev) => [...prev].sort(() => Math.random() - 0.5));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Card className="mx-auto w-full overflow-hidden break-all border-cyan-800 bg-gray-900/90 text-cyan-50 shadow-xl shadow-cyan-500/20">
      <CardHeader className="border-b border-cyan-800">
        <div className="items-center justify-between">
          <Badge
            variant="outline"
            className="border-cyan-700 bg-cyan-900/50 text-cyan-300"
          >
            By {deck.author}
          </Badge>
          <CardTitle className="flex text-2xl font-bold text-cyan-300">
            <div className="mr-5">Name: {deck.name}</div>{" "}
            <div className="ml-5">id:</div>
            <div>{deck.id}</div>
          </CardTitle>
        </div>{" "}
        <div className="m-5">
          <CosmicButton
            onClick={() => {
              handleShuffle();
            }}
            text="Shuffle"
            fullWidth={true}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Situations Column */}
          <div>
            <h3 className="mb-4 flex items-center text-lg font-semibold text-cyan-400">
              <motion.div
                className="mr-2 h-2 w-2 rounded-full bg-cyan-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              Situations
            </h3>
            <ScrollArea className="h-[500px] pr-4">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {shuffledSituations.map((situation) => (
                  <motion.div
                    key={situation.id}
                    variants={item}
                    className="rounded-lg border border-cyan-800/50 bg-gradient-to-r from-violet-900/50 to-blue-900/50 p-4 transition-colors hover:border-cyan-600/50"
                  >
                    <p className="text-cyan-100">{situation.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollArea>
          </div>
          <div>
            <h3 className="mb-4 flex items-center text-lg font-semibold text-purple-400">
              <motion.div
                className="mr-2 h-2 w-2 rounded-full bg-purple-400"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              Questions
            </h3>
            <ScrollArea className="h-[500px] pr-4">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-3"
              >
                {shuffledQuestions.map((question) => (
                  <motion.div
                    key={question.id}
                    variants={item}
                    className="rounded-lg border border-purple-800/50 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 p-4 transition-colors hover:border-purple-600/50"
                  >
                    <p className="text-purple-100">{question.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
