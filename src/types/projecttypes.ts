import { type ButtonHTMLAttributes } from "react";
import { type DateRange } from "react-day-picker";

export interface CosmicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  fullWidth?: boolean;
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export type AnimatedTextProps = {
  text: string;
};

export interface ChaoticTitleProps {
  title: string;
}

export type QuestionType = "Question" | "Situation";
export type Deck = {
  id: string;
  name: string;
  questions: { type: QuestionType; content: string }[];
};

export interface ErrorPopupProps {
  message: string;
  duration?: number;
  onDismiss?: () => void;
}
export interface CosmicCalendarProps {
  onDateRangeSelect: (range: DateRange | undefined) => void;
  dateRange: DateRange | undefined;
}
export interface RandomProps {
  size: number;
  duration: number;
  delay: number;
  yOffset: number;
  color: string;
}
export interface AuthRequiredProps {
  message?: string;
}

export interface ClientLayoutProps {
  children: React.ReactNode;
}
export interface CosmicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  text: string;
}
export interface CosmicGameInterfaceProps {
  gameID: string;
  game_name: string;
  game_password: string;
  player_password: string;
  game_has_launched: boolean;
}
