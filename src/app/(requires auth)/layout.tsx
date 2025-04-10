import { AuthRequired } from "~/components/AuthRequired";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "~/styles/globals.css";
import { AnimatedCelestialBodies } from "~/components/AnimatedCelestialBodies";
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
          <div className="relative min-h-screen min-w-max overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
            {session && (
              <>
                <AnimatedCelestialBodies />
                <HamburgerMenu />
              </>
            )}
            <div className="flex flex-col items-center">
              <div className="relative z-40 flex min-h-[80vh] w-full flex-col items-center justify-center px-4 sm:min-h-[60vh] sm:px-6 md:px-8">
                {session ? (
                  <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg">
                    <TRPCReactProvider>{children}</TRPCReactProvider>
                  </div>
                ) : (
                  <div className="w-full max-w-screen-sm px-4 text-center">
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
