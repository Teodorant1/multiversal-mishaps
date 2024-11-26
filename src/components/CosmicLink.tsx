import Link from "next/link";

export function CosmicLink({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 transition-opacity duration-300 hover:opacity-30" />
    </Link>
  );
}
