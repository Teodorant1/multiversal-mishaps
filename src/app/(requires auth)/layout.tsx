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
    <div>
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
  );
}
