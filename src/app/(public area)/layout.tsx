import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { AnimatedCelestialBodies } from "~/components/AnimatedCelestialBodies";
import { CosmicButton } from "~/components/CosmicButton";
import { TRPCReactProvider } from "~/trpc/react";
import AuthProvider from "../_components/auth/Provider";
import { auth } from "~/server/auth";
import { HamburgerMenu } from "~/components/HamburgerMenu";

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
          <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
            <AnimatedCelestialBodies />
            <HamburgerMenu />

            <main className="relative z-40 min-h-[80vh] w-full px-4">
              <TRPCReactProvider>{children}</TRPCReactProvider>
            </main>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
