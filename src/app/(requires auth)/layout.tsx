import { AuthRequired } from "~/components/AuthRequired";
import type { Metadata } from "next";
import "~/styles/globals.css";
import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "Multiversal Mishaps",
  description: "A cosmic adventure across dimensions",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-blue-900 via-purple-900 to-red-900">
      <div className="flex flex-col items-center">
        <div className="relative z-40 flex min-h-[80vh] w-full flex-col items-center justify-center px-4 sm:min-h-[60vh] sm:px-6 md:px-8">
          {session ? (
            <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg">
              {children}
            </div>
          ) : (
            <div className="w-full max-w-screen-sm px-4 text-center">
              <AuthRequired />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
