import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import AnimatedCelestialBodies from "~/components/AnimatedCelestialBodies";
import CosmicButton from "~/components/CosmicButton";

export const metadata: Metadata = {
  title: "Multiversal-Mishaps",
  description: "Multiversal-Mishaps boardgame App",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 text-white">
        {/* Navbar with Animated Celestial Bodies */}
        <div className="fixed left-0 right-0 top-0 z-10 flex h-[128px] items-center bg-opacity-50 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 shadow-lg backdrop-blur-sm">
          <AnimatedCelestialBodies />
          <div className="absolute inset-0 flex items-center justify-between px-8">
            {/* Add your buttons here */}

            <CosmicButton
              text="Start Adventure"
              color="bg-gradient-to-r from-pink-600 to-purple-600"
            />
            <CosmicButton
              text="Learn More"
              color="bg-gradient-to-r from-blue-600 to-green-600"
            />
            <button className="rounded bg-black px-4 py-2 text-lg font-medium text-white hover:bg-slate-900">
              Home
            </button>
            <button className="rounded bg-black px-4 py-2 text-lg font-medium text-white hover:bg-slate-900">
              About
            </button>
            <button className="rounded bg-black px-4 py-2 text-lg font-medium text-white hover:bg-slate-900">
              Contact
            </button>
          </div>
        </div>

        {/* Main Page Content */}
        <TRPCReactProvider>
          <div className="pt-[128px]">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
