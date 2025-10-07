import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price with German locale (comma as decimal separator)
 * @param price - The price to format
 * @returns Formatted price string with 2 decimal places (e.g., "25,00")
 */
export function formatPrice(price: number | null | undefined): string {
  if (price == null) return '0,00';
  return price.toFixed(2).replace('.', ',');
}
