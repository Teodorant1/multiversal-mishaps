"use client";

import { useState } from "react";
import { DeckBrowser } from "~/components/DeckBrowser";
const exampleDecks = [
  {
    id: "1",
    name: "Cosmic Queries",
    author: "Stardust Sage",
    questions: [
      {
        id: "1",
        text: "What lies beyond the edge of the observable universe?",
      },
      { id: "2", text: "How do black holes affect the fabric of spacetime?" },
      { id: "3", text: "What is the nature of dark matter and dark energy?" },
    ],
  },
  {
    id: "2",
    name: "Eldritch Enigmas",
    author: "Lovecraftian Librarian",
    questions: [
      {
        id: "1",
        text: "What secrets lie dormant in the sunken city of R'lyeh?",
      },
      { id: "2", text: "How does one decipher the cryptic Necronomicon?" },
      {
        id: "3",
        text: "What unspeakable horrors await in the depths of the Miskatonic University library?",
      },
    ],
  },
];

export default function DeckBrowserPage() {
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-cyan-300">
        Deck Browser
      </h1>
      <div className="mx-auto mb-8 max-w-2xl">
        <select
          value={selectedDeckIndex}
          onChange={(e) => setSelectedDeckIndex(Number(e.target.value))}
          className="w-full rounded-md bg-gray-800 p-2 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        >
          {exampleDecks.map((deck, index) => (
            <option key={deck.id} value={index}>
              {deck.name} by {deck.author}
            </option>
          ))}
        </select>
      </div>
      <DeckBrowser deck={exampleDecks[selectedDeckIndex]!} />
    </div>
  );
}
