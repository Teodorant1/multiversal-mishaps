"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CosmicButton } from "~/components/CosmicButton";
import { useSession } from "next-auth/react";

export function HamburgerMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 flex w-full flex-col px-4 py-4 md:flex-row">
      <div className="flex items-center justify-between">
        <button
          className="text-white focus:outline-none md:hidden"
          onClick={() => setIsOpen(false)}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>
      <div
        className={`flex flex-col gap-4 md:flex md:flex-row ${isOpen ? "block" : "hidden"}`}
      >
        <CosmicButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          href="/"
          text="Home"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          href="/game_page"
          text="Play Game"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          href="/decks"
          text="Manage Decks"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          href="/deck-browser"
          text="Browse Public Decks"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          href="/faq"
          text="About"
        />
        <CosmicButton
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          href="/about-creator"
          text="About Creator"
        />
      </div>
      <div
        className={`flex flex-col items-end justify-end md:ml-auto md:flex ${isOpen ? "block" : "hidden"}`}
      >
        {session ? (
          <div className="flex w-full flex-col md:flex-row">
            <CosmicButton
              href="/api/auth/signout"
              text={"Sign Out - " + session.user.username}
            />
          </div>
        ) : (
          <div className="flex w-full flex-col md:flex-row">
            <CosmicButton href="/api/auth/signin" text="Sign In" />
            <CosmicButton href="/signup" text="Sign Up" />
          </div>
        )}
      </div>
    </nav>
  );
}
