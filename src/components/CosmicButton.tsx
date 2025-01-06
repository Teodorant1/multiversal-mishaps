"use client";

import Link from "next/link";
import { type CosmicButtonProps } from "~/types/projecttypes";

export function CosmicButton({
  href,
  text,
  onClick,
  fullWidth,
  ...props
}: CosmicButtonProps) {
  const buttonClass = `mx-auto relative overflow-hidden rounded-full bg-gradient-to-r from-violet-700 to-blue-700 px-3 sm:px-4 py-1.5 sm:py-2 text-base sm:text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 max-w-full truncate focus:outline-none focus:ring-2 focus:ring-cyan-500 active:scale-95 ${
    fullWidth ? "w-full" : ""
  }`;

  const innerContent = (
    <>
      <span className="relative z-10 truncate">{text}</span>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 hover:opacity-30 focus:opacity-30" />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {innerContent}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {innerContent}
    </button>
  );
}
