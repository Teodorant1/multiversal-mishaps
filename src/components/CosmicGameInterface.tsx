/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Atom, Zap, Stars, Binary } from "lucide-react";
import { type CosmicGameInterfaceProps } from "~/types/projecttypes";

export function CosmicGameInterface({
  gameID,
  game_password,
  player_password,
  game_has_launched,
}: CosmicGameInterfaceProps) {
  // Mock for players and currentJudge assignment
  const players = [
    {
      id: "1",
      name: "Player 1",
      score: 10,
      isJudge: true,
      avatarUrl: "",
      currentAnswer: "Answer 1",
    },
    {
      id: "2",
      name: "Player 2",
      score: 5,
      isJudge: false,
      avatarUrl: "",
      currentAnswer: "Answer 2",
    },
    // Mock player data
  ];

  const currentJudge = players.find((p) => p.isJudge); // Find the judge in the players array
  if (!currentJudge) {
    return <div>No judge found!</div>; // Handle the case when there is no judge
  }

  const roundNumber = 1; // Mock round number
  const question = { text: "Sample question?" }; // Mock question
  const deck = {
    name: "Sample Deck",
    roundsPlayed: 2,
    questionCount: 10,
    author: "Author",
    description: "Sample description",
  }; // Mock deck info

  // Particle animation for background effects
  const ParticleEffect = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 bg-cyan-500/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );

  // Data stream animation
  const DataStream = () => (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute left-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          style={{ top: `${i * 5}%` }}
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-xl border border-cyan-500/20 bg-gray-900/80">
      <ParticleEffect />
      <DataStream />
      <div className="relative grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
        {/* Left Column - Judge and Deck Info */}
        <div className="space-y-6">
          {/* Judge Panel */}
          <Card className="overflow-hidden border-cyan-500/20 bg-gray-900/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-300">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Atom className="h-5 w-5 text-cyan-500" />
                </motion.div>
                Current Judge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                className="relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34,211,238,0)",
                    "0 0 20px rgba(34,211,238,0.3)",
                    "0 0 20px rgba(34,211,238,0)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex items-center gap-6 rounded-lg bg-cyan-950/30 p-4">
                  <motion.div
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Avatar className="h-20 w-20 ring-2 ring-cyan-500/50">
                      <AvatarImage src={currentJudge.avatarUrl} />
                      <AvatarFallback className="bg-cyan-950 text-2xl">
                        {currentJudge.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-cyan-100">
                      {currentJudge.name}
                    </h3>
                    <p className="text-cyan-300/70">
                      Total Score: {currentJudge.score}
                    </p>
                    <motion.div
                      className="mt-2 h-1 rounded-full bg-cyan-500"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{
                        duration: 60,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
          {/* Deck Info */}
          <Card className="border-purple-500/20 bg-gray-900/80">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-purple-300">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Stars className="h-5 w-5 text-purple-500" />
                  </motion.div>
                  {deck.name}
                </CardTitle>
                <Badge variant="outline" className="bg-purple-900/50">
                  {deck.roundsPlayed} / {deck.questionCount}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-medium text-purple-300">
                    <Binary className="h-4 w-4" />
                    Author
                  </h4>
                  <p className="text-purple-100">{deck.author}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-purple-300">
                    Description
                  </h4>
                  <p className="text-purple-100">{deck.description}</p>
                </div>
                <motion.div
                  className="h-1 w-full overflow-hidden rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(147,51,234,0.3) 0%, rgba(34,211,238,0.3) 100%)",
                  }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column - Question and Players */}
        <div className="space-y-6 lg:col-span-2">
          {/* Current Question */}
          <Card className="border-cyan-500/20 bg-gray-900/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-300">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Zap className="h-5 w-5 text-cyan-500" />
                </motion.div>
                Round {roundNumber}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6"
              >
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-500/5 to-purple-500/5"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.p
                  className="relative text-center text-xl font-semibold text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {question.text}
                </motion.p>
              </motion.div>
            </CardContent>
          </Card>
          {/* Player List */}
          <Card className="border-cyan-500/20 bg-gray-900/80">
            <CardHeader>
              <CardTitle className="text-cyan-300">Players</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[300px]">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 ring-2 ring-cyan-500">
                        <AvatarImage src={player.avatarUrl} />
                        <AvatarFallback>{player.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="font-medium text-cyan-100">{player.name}</p>
                    </div>
                    <p className="text-cyan-300">{player.score}</p>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
