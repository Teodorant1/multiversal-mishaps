"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { AnimatedCelestialBodies } from "~/components/AnimatedCelestialBodies";
import { CosmicButton } from "~/components/CosmicButton";
import { TRPCReactProvider } from "~/trpc/react";
import AuthProvider from "../_components/auth/Provider";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multiversal Mishaps",
  description: "A cosmic adventure across dimensions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
            <AnimatedCelestialBodies />
            <nav className="relative z-30 px-4 py-4">
              <div className="flex items-center justify-between">
                <button
                  className="text-white focus:outline-none md:hidden"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
              </div>

              <div
                className={`flex-col flex-wrap items-center justify-between md:flex ${isOpen ? "block" : "hidden"}`}
              >
                <CosmicButton href="/" text="Home" />
                <CosmicButton href="/game_page" text="Play Game" />
                <CosmicButton href="/decks" text="Manage Decks" />
                <CosmicButton href="/deck-browser" text="Browse Public Decks" />
                <CosmicButton href="/faq" text="About" />
                <CosmicButton href="/about-creator" text="About Creator" />
                {session ? (
                  <>
                    <CosmicButton
                      href="/profile"
                      text={"Profile - " + session.user.username}
                    />
                    <CosmicButton href="/api/auth/signout" text="Sign Out" />
                  </>
                ) : (
                  <>
                    <CosmicButton href="/api/auth/signin" text="Sign In" />
                    <CosmicButton href="/signup" text="Sign Up" />
                  </>
                )}
              </div>
            </nav>
            <main className="relative z-40 min-h-[80vh] w-full px-4">
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </main>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
