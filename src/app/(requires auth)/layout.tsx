import { AuthRequired } from "~/components/AuthRequired";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { AnimatedCelestialBodies } from "~/components/AnimatedCelestialBodies";
import { CosmicButton } from "~/components/CosmicButton";
import { TRPCReactProvider } from "~/trpc/react";
import AuthProvider from "../_components/auth/Provider";
import { auth } from "~/server/auth";

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
  const session = await auth();

  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
            {session && (
              <>
                <AnimatedCelestialBodies />
                <nav className="relative z-50 flex items-center justify-between px-4 py-4">
                  {/* Left-aligned navigation links */}
                  <div className="flex space-x-4">
                    <CosmicButton href="/" text="Home" />
                    <CosmicButton href="/game-setup" text="Play Game" />
                    <CosmicButton href="/decks" text="Manage Decks" />
                    <CosmicButton
                      href="/deck-browser"
                      text="Browse Public Decks"
                    />
                    <CosmicButton href="/faq" text="About" />
                  </div>

                  {/* Right-aligned authentication buttons */}
                  <div className="flex space-x-4">
                    {session ? (
                      <>
                        <CosmicButton
                          href="/profile"
                          text={"Profile - " + session.user.username}
                        />
                        <CosmicButton
                          href="/api/auth/signout"
                          text="Sign Out"
                        />
                      </>
                    ) : (
                      <>
                        <CosmicButton href="/api/auth/signin" text="Sign In" />
                        <CosmicButton href="/signup" text="Sign Up" />
                      </>
                    )}
                  </div>
                  {/* BOTTOM-aligned main */}
                </nav>
              </>
            )}
            <div className="space-x-4">
              <div className="relative z-40 min-h-screen w-screen items-center justify-center text-white">
                {session ? (
                  <TRPCReactProvider>{children}</TRPCReactProvider>
                ) : (
                  <div className="text-center">
                    <AuthRequired message="DIMENSIONAL BARRIER DETECTED - AUTHENTICATION REQUIRED IN ORDER TO PENETRATE THE EVENT HORIZON" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
