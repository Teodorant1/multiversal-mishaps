"use client";
export const dynamic = "force-static";
import { AnimatedCelestialBodies } from "./AnimatedCelestialBodies";
import { CosmicButton } from "./CosmicButton";

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
      <div
        className="fixed inset-0"
        style={{ transform: "scale(1.75)", transformOrigin: "center center" }}
      >
        <AnimatedCelestialBodies />
      </div>
      <nav className="relative z-50 flex justify-center space-x-4 p-4">
        <CosmicButton href="/" text="Home" />
        <CosmicButton href="/game" text="Play Game" />
        <CosmicButton href="/decks" text="Manage Decks" />
        <CosmicButton href="/about" text="About" />
      </nav>
      <main className="relative z-40">{children}</main>
    </div>
  );
};
