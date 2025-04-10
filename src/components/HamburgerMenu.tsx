"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CosmicButton } from "~/components/CosmicButton";
import { useSession } from "next-auth/react";

export function HamburgerMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-30 flex w-full flex-col px-4 py-4 md:flex-row">
      <div className="flex flex-wrap items-center justify-between">
        <button
          className="text-white focus:outline-none md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      <div
        className={`flex w-full flex-wrap gap-4 md:flex md:flex-wrap ${isOpen ? "block" : "hidden"}`}
      >
        <CosmicButton
          onClick={() => {
            setIsOpen(false);
          }}
          href="/"
          text="Home"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(false);
          }}
          href="/game_page"
          text="Play Game"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(false);
          }}
          href="/decks"
          text="Manage Decks"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(false);
          }}
          href="/deck-browser"
          text="Browse Public Decks"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(false);
          }}
          href="/faq"
          text="About"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(false);
          }}
          href="/about-creator"
          text="About Creator"
        />

        {session && (
          <CosmicButton
            href="/api/auth/signout"
            text={"Sign Out - " + session.user.username}
          />
        )}

        {!session && <CosmicButton href="/api/auth/signin" text="Sign In" />}
        {!session && (
          <CosmicButton
            onClick={() => {
              setIsOpen(false);
            }}
            href="/signup"
            text="Sign Up"
          />
        )}
      </div>
    </nav>
  );
}
