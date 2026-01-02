import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(date: string | Date, options?: {
  includeTime?: boolean;
  format?: 'short' | 'long';
}) {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (options?.includeTime) {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: options.format === 'long' ? 'long' : 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: options?.format === 'long' ? 'long' : 'short',
    day: 'numeric'
  });
}

export function formatTimestamp(timestamp: string | Date) {
  return formatDate(timestamp, { includeTime: true });
}