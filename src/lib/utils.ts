import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const countryToLocale: Record<string, string> = {
  'united states': 'en-US',
  'germany': 'de-DE',
  'japan': 'ja-JP',
  'france': 'fr-FR',
  'united kingdom': 'en-GB',
  'canada': 'en-CA',
  'china': 'zh-CN',
  'india': 'hi-IN',
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string, country: string, showCurrency: boolean = true): string {
  const locale = countryToLocale[country] || 'en-US';
  return new Intl.NumberFormat(locale, {
      style: showCurrency ? 'currency' : 'decimal',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
  }).format(amount);
}

export const getStockStatusKey = (date=new Date()) => {
  const todayDateTime = date;
  const startOfToday = new Date(todayDateTime.getFullYear(), todayDateTime.getMonth(),todayDateTime.getDate());
  return startOfToday.toISOString();
}
