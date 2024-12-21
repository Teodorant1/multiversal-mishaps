"use client";

import { motion } from "framer-motion";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { type deck_type, type question_type } from "~/server/db/schema";

export function DeckQuestionsList({
  deck,
  all_questions,
}: {
  deck: deck_type;
  all_questions: question_type[];
}) {
  const situations = all_questions.filter((q) => q.isSituation === true);
  const questions = all_questions.filter((q) => q.isSituation === false);

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
    <Card className="mx-auto w-full max-w-4xl border-cyan-800 bg-gray-900/90 text-cyan-50 shadow-xl shadow-cyan-500/20">
      <CardHeader className="border-b border-cyan-800">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-cyan-300">
            {deck.name}
          </CardTitle>
          <Badge
            variant="outline"
            className="border-cyan-700 bg-cyan-900/50 text-cyan-300"
          >
            By {deck.author}
          </Badge>
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
                {situations.map((situation) => (
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

          {/* Questions Column */}
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
                {questions.map((question) => (
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
