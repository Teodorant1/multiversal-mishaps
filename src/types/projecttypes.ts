import { type ButtonHTMLAttributes } from "react";

export interface CosmicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  text: string;
  onClick?: () => void; // Optional click handler
}

export type AnimatedTextProps = {
  text: string;
};

export interface ChaoticTitleProps {
  title: string; // Define a prop for the title
}
