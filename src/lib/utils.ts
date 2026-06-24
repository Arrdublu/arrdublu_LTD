import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Currency, ExchangeRates } from "./types"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number, // Assume amount is always in USD
  targetCurrency: Currency,
  rates: ExchangeRates
): string {
  const rate = rates[targetCurrency] || 1;
  const convertedAmount = amount * rate;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: targetCurrency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertedAmount);
}
