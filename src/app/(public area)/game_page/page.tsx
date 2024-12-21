import { CosmicFuturisticGame } from "~/components/cosmic-futuristic-game";
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 p-8">
      <h1 className="mb-8 text-center text-4xl font-bold text-cyan-300">
        Cosmic Futuristic Game
      </h1>
      <CosmicFuturisticGame questions={cosmicQuestions} />
    </div>
  );
}
