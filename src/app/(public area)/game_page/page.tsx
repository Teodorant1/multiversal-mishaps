"use client";
import { CosmicFuturisticGame } from "~/components/cosmic-futuristic-game";
import GameSetup from "~/components/GameSetup";
// import { CosmicGameInterface } from "~/components/CosmicGameInterface";
import { useState } from "react";
import { CosmicGameInterface } from "~/components/CosmicGameInterface";

const cosmicQuestions = [
  {
    id: "1",
    text: "How might we harness the power of quasars for interstellar travel?",
  },
  {
    id: "2",
    text: "What undiscovered properties of dark matter could revolutionize our understanding of the universe?",
  },
  {
    id: "3",
    text: "In a multiverse of infinite possibilities, how do our choices shape reality?",
  },
  {
    id: "4",
    text: "How could we communicate with civilizations existing in higher dimensions?",
  },
  {
    id: "5",
    text: "What cosmic events could trigger the birth of a new universe?",
  },
];

export default function CosmicFuturisticGamePage() {
  const [gameID, setgameID] = useState<string | null>(null);
  const [game_password, setgame_password] = useState<string | null>(null);
  const [player_password, setplayer_password] = useState<string | null>(null);
  const [game_has_launched, setgame_has_launched] = useState<boolean | null>(
    false,
  );

  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-cyan-300">
        Cosmic Futuristic Game
      </h1>
      <GameSetup />
      {/* <CosmicFuturisticGame questions={cosmicQuestions} /> */}
      <CosmicGameInterface
        gameID={""}
        game_password={""}
        player_password={""}
        game_has_launched={""}
      />
    </div>
  );
}
