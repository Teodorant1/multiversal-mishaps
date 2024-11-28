import { ButtonHTMLAttributes } from "react"

export interface CosmicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  text: string
}

