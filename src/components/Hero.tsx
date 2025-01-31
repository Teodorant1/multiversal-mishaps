import { ChaoticTitle } from "./ChaoticTitle";
import { CosmicButton } from "./CosmicButton";
import { auth } from "~/server/auth";

export default async function Hero() {
  const session = await auth();
  console.log("hero_session", session);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-10 text-white">
      <ChaoticTitle title="Multiversal Mishaps" />

      <p className="mt-4 max-w-md text-center text-lg md:text-xl">
        Embark on a cosmic journey through the multiverse, where chaos and order
        collide in a card game of epic proportions!
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <CosmicButton href="/" text="Home" />

        <CosmicButton href="/faq" text="About" />
        {session && (
          <div className="flex flex-col">
            <CosmicButton href="/game_page" text="Play Game" />
            <CosmicButton href="/decks" text="Manage Decks" />
          </div>
        )}
      </div>
    </div>
  );
}
