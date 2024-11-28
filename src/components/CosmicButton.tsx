"use client"

import Link from "next/link"
import { type CosmicButtonProps } from "~/types/projecttypes"

export function CosmicButton({
  href,
  text,
  onClick,
  ...props
}: CosmicButtonProps) {
  const buttonClass = "relative overflow-hidden rounded-full bg-gradient-to-r from-violet-700 to-blue-700 px-4 py-2 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
  
  const innerContent = (
    <>
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 opacity-0 transition-opacity duration-300 hover:opacity-30" />
    </>
  )

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {innerContent}
      </Link>
    )
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {innerContent}
    </button>
  )
}

