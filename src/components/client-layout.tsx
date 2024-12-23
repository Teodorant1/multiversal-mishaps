"use client";

import { AnimatedCelestialBodies } from "~/components/AnimatedCelestialBodies";
import { CosmicButton } from "~/components/CosmicButton";
import { type ClientLayoutProps } from "~/types/projecttypes";

export function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-violet-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
      <nav className="relative z-50 flex justify-center space-x-4 p-4">
        <CosmicButton href="/" text="Home" />
        <CosmicButton href="/game" text="Play Game" />
        <CosmicButton href="/decks" text="Manage Decks" />
        <CosmicButton href="/about" text="About" />
        <CosmicButton href="/contact" text="Contact" />
      </nav>
      <div
        className="fixed inset-0 z-0"
        style={{ transform: "scale(1.75)", transformOrigin: "center center" }}
      >
        <AnimatedCelestialBodies />
      </div>
      <main className="relative z-40">{children}</main>
    </div>
  );
}
