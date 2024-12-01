//"use client";
import { ChaoticTitle } from "./ChaoticTitle";
import { CosmicButton } from "./CosmicButton";
import { auth } from "~/server/auth";

export default async function Hero() {
  const session = await auth();
  {
    console.log("hero_session", session);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-white">
      <ChaoticTitle title={"Multiversal Mishaps"} />
      <></>{" "}
      <p className="mt-4 max-w-2xl text-center text-xl">
        Embark on a cosmic journey through the multiverse, where chaos and order
        collide in a card game of epic proportions!
      </p>
      <div className="flex">
        <div className="m-5">
          <CosmicButton href="/" text="Home" />
        </div>
        <div className="m-5">
          <CosmicButton href="/game" text="Play Game" />
        </div>
        <div className="m-5">
          <CosmicButton href="/decks" text="Manage Decks" />
        </div>
        <div className="m-5">
          <CosmicButton href="/about" text="About" />
        </div>
      </div>
    </div>
  );
}
