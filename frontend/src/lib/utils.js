import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
  {/* add */}
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
