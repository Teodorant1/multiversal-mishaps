"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CosmicButton } from "./CosmicButton";
import { CosmicGameInterface } from "./CosmicGameInterface";
import { api } from "~/trpc/react";
import { ErrorPopup } from "./ErrorPopup";

export default function GameSetup() {
  const [gameID, setgameID] = useState<string | null>("");
  const [game_name, setgame_name] = useState<string | null>(null);
  const [game_password, setgame_password] = useState<string | null>("");
  const [player_password, setplayer_password] = useState<string | null>("");
  const [game_has_launched, setgame_has_launched] = useState<boolean>(false);
  const [selectedDeck_id, setSelectedDeck_id] = useState("default");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean | null>(false);
  const [errorText, setErrorText] = useState("");
  const [filterText, setFilterText] = useState("");

  // const [gameName, setGameName] = useState("");
  // const [password, setPassword] = useState("");
  const mydecks = api.deck.fetch_my_decks.useQuery(undefined, {
    staleTime: Infinity,
  });
  const available_matches = api.game.get_available_matches.useQuery(undefined, {
    staleTime: Infinity,
  });
  const filteredMatches = available_matches.data?.filter((game) =>
    game.name?.toLowerCase().includes(filterText.toLowerCase()),
  );
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
    setIsLoading(true);
    create_match.mutate({
      match_name: game_name ?? "",
      match_password: game_password ?? "",
      player_password: player_password ?? "",
      deck_id: selectedDeck_id,
    });
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

  const handle_join_match = (
    id: string,
    name: string,
    match_password: string,
    player_password: string,
  ) => {
    setIsLoading(true);
    join_match.mutate({
      match_id: id,
      match_name: name ?? "",
      match_password: match_password ?? "",
      player_password: player_password ?? "",
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
              type="text"
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
              type="text"
              value={player_password ?? ""}
              onChange={(e) => setplayer_password(e.target.value.trim())}
              className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Player password"
            />
          </div>
          {/* <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold">
              Game ID (ONLY IF JOINING AN ALREADY EXISTING GAME)
            </label>
            <input
              type="text"
              value={gameID ?? ""}
              onChange={(e) => setgameID(e.target.value.trim())}
              className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Game ID"
            />
          </div> */}
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
              <div className="text-gray-500">Loading...</div>
            )}
          </div>
          <h1 className="mx-auto text-cyan-300">OR CHOOSE A PUBLIC DECK</h1>
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-cyan-300">
              Public Deck ID (from /deck-browser)
            </label>
            <input
              type="text"
              value={selectedDeck_id}
              onChange={(e) => setSelectedDeck_id(e.target.value)}
              className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Public Deck ID "
            />
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
          {/* Open Games List */}
          <div className="mb-6">
            <h2 className="mb-4 text-xl font-bold">Open Games</h2>
            <div className="mb-6">
              <label className="mb-2 block text-lg font-semibold">
                Filter Games
              </label>
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full rounded-md bg-gray-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter text to filter games"
              />
            </div>
            {filteredMatches && filteredMatches.length > 0 ? (
              <ul className="space-y-4">
                {filteredMatches.map((game) => (
                  <li
                    key={game.id}
                    className="flex rounded-md bg-gray-700 p-3"
                    onClick={() => {
                      setgameID(game.id);
                      setgame_name(game.name);
                    }}
                  >
                    <div className="left-1 flex-grow text-cyan-300">
                      NAME:{game.name}
                    </div>

                    <div className="left-1 flex-grow text-cyan-300">
                      ID:{game.id}
                    </div>
                    <div className="flex items-center space-x-2">
                      {
                        (gameID === game.id,
                        game_name === game.name && (
                          <input
                            type="text"
                            placeholder="Enter Password"
                            value={game_password ?? ""}
                            onChange={(e) => setgame_password(e.target.value)}
                            className="rounded-md bg-gray-800 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ))
                      }
                      <CosmicButton
                        text="Join Match"
                        color="bg-gradient-to-r from-green-600 to-blue-600"
                        onClick={() =>
                          handle_join_match(
                            game.id,
                            game.name ?? "",
                            game_password ?? "",
                            player_password ?? "",
                          )
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-gray-500">No games match your filter.</div>
            )}
            {/* {available_matches.data && available_matches.data.length > 0 ? (
              <ul className="space-y-4">
                {available_matches.data.map((game) => (
                  <li
                    key={game.id}
                    className="flex items-center justify-between rounded-md bg-gray-700 p-3"
                    onClick={() => {
                      setgameID(game.id);
                      setgame_name(game.name);
                    }}
                  >
                    <span className="flex-grow">{game.name}</span>
                    <div className="flex items-center space-x-2">
                      {
                        (gameID === game.id,
                        game_name === game.name && (
                          <input
                            type="text"
                            placeholder="Enter Password"
                            value={game_password ?? ""}
                            onChange={(e) => setgame_password(e.target.value)}
                            className="rounded-md bg-gray-800 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ))
                      }
                      <CosmicButton
                        text="Join Match"
                        color="bg-gradient-to-r from-green-600 to-blue-600"
                        onClick={() =>
                          handle_join_match(
                            game.id,
                            game.name!,
                            game_password!,
                            player_password!,
                          )
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No open games available.</p>
            )} */}
          </div>
          <div className="flex">
            <div className="mx-5">
              <CosmicButton
                text="Start Game"
                color="bg-gradient-to-r from-green-600 to-blue-600"
                onClick={() => {
                  handle_create_match();
                }}
              />
            </div>
            {/* <div className="mx-5">
              <CosmicButton
                text="Join Game"
                color="bg-gradient-to-r from-green-600 to-blue-600"
                onClick={() => {
                  handle_join_match();
                }}
              />
            </div> */}
          </div>
        </motion.div>
      )}
    </div>
  );
}
