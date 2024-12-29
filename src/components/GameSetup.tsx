"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CosmicButton } from "./CosmicButton";
import { CosmicGameInterface } from "./CosmicGameInterface";
import { api } from "~/trpc/react";
import { ErrorPopup } from "./ErrorPopup";

export default function GameSetup() {
  const [gameID, setgameID] = useState<string | null>(null);
  const [game_name, setgame_name] = useState<string | null>(null);
  const [game_password, setgame_password] = useState<string | null>(null);
  const [player_password, setplayer_password] = useState<string | null>(null);
  const [game_has_launched, setgame_has_launched] = useState<boolean>(false);
  const [selectedDeck_id, setSelectedDeck_id] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean | null>(false);
  const [errorText, setErrorText] = useState("");
  // const [gameName, setGameName] = useState("");
  // const [password, setPassword] = useState("");
  const mydecks = api.deck.fetch_my_decks.useQuery(undefined, {
    staleTime: Infinity,
  });

  const create_match = api.game.create_match.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      if (data?.returned_new_match && data?.error === false) {
        setgame_has_launched(true);
        setgameID(data.returned_new_match?.id);
        setgame_name(data.returned_new_match.name);
        setgame_password(data.returned_new_match.password);
      } else {
        setIsError(true);
        setErrorText(
          data?.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });

  const handle_create_match = () => {
    if (game_name && game_password && player_password && selectedDeck_id) {
      setIsLoading(true);
      create_match.mutate({
        match_name: game_name,
        match_password: game_password,
        player_password: player_password,
        deck_id: selectedDeck_id,
      });
    }
  };

  const join_match = api.game.join_match.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
      setIsLoading(false);
      if (data?.existing_match && data?.error === false) {
        setgame_has_launched(true);
        setgameID(data.existing_match?.id);
        setgame_name(data.existing_match.name);
        setgame_password(data.existing_match.password);
      } else {
        setIsError(true);
        setErrorText(
          data?.error_description ?? "An unknown error has occurred.",
        );
      }
    },
  });

  const handle_join_match = () => {
    setIsLoading(true);
    join_match.mutate({
      match_name: "",
      match_id: "",
      match_password: "",
      player_password: "",
    });
  };

  // const handleStartGame = () => {
  //   console.log("Starting game with:", {
  //     playerCount,
  //     selectedDeck,
  //     winningScore,
  //     gameName,
  //     password,
  //   });
  // };

  return (
    <div className="mx-auto w-full text-white">
      {game_has_launched === true ? (
        <CosmicGameInterface
          gameID={gameID ?? ""}
          game_password={game_password ?? ""}
          player_password={player_password ?? ""}
          game_name={game_name ?? ""}
          game_has_launched={game_has_launched}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          {isError && (
            <div className="flex w-full items-center justify-center">
              <ErrorPopup
                message={errorText}
                onDismiss={() => setIsError(null)}
              />
            </div>
          )}
          <h1 className="mb-8 text-center text-4xl font-bold">SETUP</h1>
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold">
              Game Name
            </label>
            <input
              type="text"
              value={game_name ?? ""}
              onChange={(e) => setgame_name(e.target.value)}
              className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Game Name"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold">
              Game Password
            </label>
            <input
              type="password"
              value={game_password ?? ""}
              onChange={(e) => setgame_password(e.target.value.trim())}
              className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Game Password"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold">
              Player Password
            </label>
            <input
              type="password"
              value={player_password ?? ""}
              onChange={(e) => setplayer_password(e.target.value.trim())}
              className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Player password"
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold">
              Game ID (ONLY IF JOINING AN ALREADY EXISTING GAME)
            </label>
            <input
              type="password"
              value={gameID ?? ""}
              onChange={(e) => setgameID(e.target.value.trim())}
              className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Game ID"
            />
          </div>
          {/* <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold">
            Number of Players
          </label>
          <input
            type="range"
            min="3"
            max="10"
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            className="w-full"
          />
          <span className="mt-2 block text-center">{playerCount} players</span>
        </div> */}
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold">
              Select Deck (ONLY IF CREATING A NEW GAME)
            </label>
            {mydecks.data && mydecks.data.length > 0 ? (
              <select
                value={selectedDeck_id}
                onChange={(e) => setSelectedDeck_id(e.target.value)}
                className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose a deck</option>
                {mydecks.data.map((deck) => (
                  <option key={deck.id} value={deck.id}>
                    {deck.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-500">Loading...</p>
            )}
          </div>
          {/* <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold">
            Winning Score
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={winningScore}
            onChange={(e) => setWinningScore(Number(e.target.value))}
            className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}
          <div className="flex">
            {" "}
            <div className="mx-5">
              <CosmicButton
                text="Start Game"
                color="bg-gradient-to-r from-green-600 to-blue-600"
                onClick={() => {
                  handle_create_match();
                }}
              />
            </div>
            <div className="mx-5">
              <CosmicButton
                text="Join Game"
                color="bg-gradient-to-r from-green-600 to-blue-600"
                onClick={() => {
                  handle_join_match();
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
