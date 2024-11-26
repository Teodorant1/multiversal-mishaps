import Link from "next/link";
import { type CosmicButtonProps } from "~/types/projecttypes";

export const CosmicButton = ({
  href,
  text,
  onClick,
  ...props
}: CosmicButtonProps) => {
  // const buttonClass =
  //   "relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-2 px-4 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg";
  const innerContent = (
    <>
      <span className="relative z-10">{text}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 opacity-0 transition-opacity duration-300 hover:opacity-30" />
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      className="relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
      onClick={onClick}
      {...props}
    >
      {innerContent}
    </button>
  );
};
