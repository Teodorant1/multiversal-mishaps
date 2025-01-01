/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Atom, Stars } from "lucide-react";
import { type CosmicGameInterfaceProps } from "~/types/projecttypes";
import { useState } from "react";
import { api } from "~/trpc/react";
import { ErrorPopup } from "./ErrorPopup";
import { CosmicButton } from "./CosmicButton";
import { useSession } from "next-auth/react";

export function CosmicGameInterface({
  gameID,
  game_password,
  player_password,
  game_name,
}: CosmicGameInterfaceProps) {
  const [answer_text, setanswer_text] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean | null>(false);
  const [errorText, setErrorText] = useState("");

  const { data: session } = useSession();

  const match = api.game.get_data_on_match.useQuery(
    {
      player_password: player_password,
      match_id: gameID,
      match_name: game_name,
      match_password: game_password,
    },
    {
      refetchIntervalInBackground: true,
      refetchInterval: 10000,
    },
  );

  const start_match = api.game.start_match.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      if (data?.existing_match && data?.error === false) {
        await match.refetch();
      } else {
        setIsError(true);
        setErrorText(
          data?.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });

  const handle_start_match = () => {
    setIsLoading(true);
    start_match.mutate({
      match_id: gameID,
      match_name: game_name,
      match_password: game_password,
      player_password: player_password,
    });
  };

  const answer = api.game.answer.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      if (data && data?.error === false) {
        setanswer_text(" ");
        await match.refetch();
      } else {
        setIsError(true);
        setErrorText(
          data?.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });

  const handle_answer = () => {
    setIsLoading(true);
    answer.mutate({
      player_password: player_password,
      answer: answer_text,
      match_name: game_name,
      match_id: gameID,
      match_password: game_password,
    });
  };

  const judge_vote_for = api.game.judge_vote_for.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      if (data?.error === false) {
      } else {
        setIsError(true);
        setErrorText(
          data?.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });

  const handle_judge_vote_for = (target_id: string) => {
    setIsLoading(true);
    judge_vote_for.mutate({
      player_password: player_password,
      match_name: game_name,
      match_id: gameID,
      match_password: game_password,
      target_id: target_id,
    });
  };

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
    <div className="relative mx-auto w-full overflow-hidden rounded-xl border border-cyan-500/20 bg-gray-900/80">
      {isError && (
        <div className="flex w-full items-center justify-center">
          <ErrorPopup message={errorText} onDismiss={() => setIsError(null)} />
        </div>
      )}
      {match.data &&
        match.data.has_started === false &&
        match.data.creator_owner.trim() === session?.user.username.trim() && (
          <div className="m-5">
            <CosmicButton
              text="START MATCH & DISABLE NEW JOINS"
              color="bg-gradient-to-r from-green-600 to-blue-600"
              onClick={() => {
                handle_start_match();
                console.log("handle_start_match();");
              }}
            />
          </div>
        )}
      <ParticleEffect />
      <DataStream />
      <div className="relative w-full p-5">
        <div className="space-y-6">
          <Card className="w-full border-cyan-500/20 bg-gray-900/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-300">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Atom className="h-5 w-5 text-cyan-500" />
                </motion.div>
                Current Judge:
                {match.data?.current_judge && match.data && (
                  <div className=""> {match.data.current_judge}</div>
                )}
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
                      <AvatarImage
                        src={
                          "https://i1.sndcdn.com/artworks-46Iy8SxkMaxepPTL-u5icpA-t500x500.jpg"
                        }
                      />
                      <AvatarFallback className="bg-cyan-950 text-2xl">
                        {match.data?.current_judge && match.data && (
                          <div className=""> {match.data.current_judge}</div>
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-bold text-cyan-100">
                      {match.data?.current_judge && match.data && (
                        <div className=""> {match.data.current_judge}</div>
                      )}
                    </h3>

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
                  {match.data?.deck && match.data && (
                    <div>
                      <div className="m-2">DECK_ID: {match.data.deck}</div>
                      <div className="m-2">MATCH_ID: {match.data.id}</div>
                      <div className="m-2">MATCH_NAME: {match.data.name}</div>
                    </div>
                  )}
                </CardTitle>
              </div>
            </CardHeader>
          </Card>
        </div>
        <div className="m-5 space-y-6 lg:col-span-2">
          <Card className="border-cyan-500/20 bg-gray-900/80">
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-lg bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-3"
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
                <motion.div
                  className="relative text-center text-xl font-semibold text-white"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {match.data?.question && match.data && (
                    <div> {match.data.question}</div>
                  )}
                </motion.div>
              </motion.div>
            </>
          </Card>
          <Card className="border-cyan-500/20 bg-gray-900/80 text-white">
            <CardHeader>
              <CardTitle className="text-cyan-300">Players</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[300px]">
                <div className="mb-6">
                  <label className="mb-2 block text-lg font-semibold">
                    Answer
                  </label>
                  <input
                    type="text"
                    value={answer_text ?? ""}
                    onChange={(e) => setanswer_text(e.target.value)}
                    className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Answer"
                  />
                  <div className="m-5">
                    <CosmicButton
                      text="Send Answer"
                      color="bg-gradient-to-r from-green-600 to-blue-600"
                      onClick={() => {
                        handle_answer();
                        console.log("handle_answer();");
                      }}
                    />
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          {/* Player List */}
          <Card className="border-cyan-500/20 bg-gray-900/80">
            <CardHeader>
              <CardTitle className="text-cyan-300">Players</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="max-h-[300px]">
                {match.data?.players && match.data && (
                  <div className="">
                    {match.data?.players.map((player) => (
                      <div
                        key={player.id}
                        className="items-center justify-between py-2"
                      >
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 ring-2 ring-cyan-500">
                              <AvatarImage
                                src={
                                  "https://i1.sndcdn.com/artworks-46Iy8SxkMaxepPTL-u5icpA-t500x500.jpg"
                                }
                              />
                              <AvatarFallback>{player.username}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium text-cyan-100">
                              {player.username}
                            </div>
                          </div>
                          <div className="text-cyan-300">{player.score}</div>
                          {match.data &&
                            match.data.current_judge === player.username && (
                              <div className="text-cyan-300">
                                THIS PLAYER IS THE JUDGE
                              </div>
                            )}
                          {match.data &&
                            match.data.current_judge !== player.username &&
                            match.data.current_judge ===
                              session?.user.username && (
                              <div className="m-5">
                                <CosmicButton
                                  text="VOTE"
                                  onClick={() => {
                                    handle_judge_vote_for(player.id);
                                  }}
                                />
                              </div>
                            )}
                        </div>

                        <div className="m-5 text-cyan-300">
                          Answer:{player.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
