import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { AnimatedCelestialBodies } from "~/components/AnimatedCelestialBodies";
import { CosmicButton } from "~/components/CosmicButton";
// import { CosmicLink } from "~/components/CosmicLink";
import { TRPCReactProvider } from "~/trpc/react";
import AuthProvider from "./_components/auth/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multiversal Mishaps",
  description: "A cosmic adventure across dimensions",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        {" "}
        <body className={inter.className}>
          <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
            <AnimatedCelestialBodies />
            <nav className="relative z-50 flex justify-center space-x-4 p-4">
              <CosmicButton href="/" text="Home" />
              <CosmicButton href="/game" text="Play Game" />
              <CosmicButton href="/decks" text="Manage Decks" />
              <CosmicButton href="/about" text="About" />
            </nav>

            <main className="relative z-40">
              {" "}
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </main>
          </div>
        </body>{" "}
      </AuthProvider>{" "}
    </html>
  );
}
