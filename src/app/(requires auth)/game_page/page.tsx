"use client";
export const dynamic = "force-static";
import GameSetup from "~/components/GameSetup";

export default function CosmicFuturisticGamePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-cyan-300">
        MULTIVERSAL MISHAPS GAME
      </h1>
      <GameSetup />
    </div>
  );
}
