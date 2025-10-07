import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { AnimatedCelestialBodies } from "~/components/AnimatedCelestialBodies";
import { TRPCReactProvider } from "~/trpc/react";
import AuthProvider from "../_components/auth/Provider";
import { HamburgerMenu } from "~/components/HamburgerMenu";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Multiversal Mishaps",
  description: "A cosmic adventure across dimensions",
  // themeColor: "#000000",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className}`}>
          <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
            <AnimatedCelestialBodies />
            <HamburgerMenu />

            <div className="flex flex-col items-center">
              <main className="relative z-40 flex min-h-[80vh] w-full flex-col items-center justify-center px-4 sm:min-h-[60vh] sm:px-6 md:px-8">
                <div className="w-full max-w-screen-lg">
                  <TRPCReactProvider>{children}</TRPCReactProvider>
                </div>
              </main>
            </div>
          </div>
        </body>
      </AuthProvider>
    </html>
  );
}
