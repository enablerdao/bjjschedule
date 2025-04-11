import { format, parseISO, Locale } from 'date-fns';
import { enUS, ja, pt, es } from 'date-fns/locale';

// Map of locales
const locales: Record<string, Locale> = {
  en: enUS,
  ja: ja,
  pt: pt,
  es: es,
};

// Get current locale from browser or default to English
const getCurrentLocale = (): string => {
  if (typeof window === 'undefined') return 'en';
  
  const savedLocale = localStorage.getItem('language');
  if (savedLocale && Object.keys(locales).includes(savedLocale)) {
    return savedLocale;
  }
  
  const browserLocale = navigator.language.split('-')[0];
  return Object.keys(locales).includes(browserLocale) ? browserLocale : 'en';
};

/**
 * Format a date string to a localized date format
 * @param dateString ISO date string
 * @param formatStr Optional format string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, formatStr = 'PPP'): string => {
  try {
    const date = parseISO(dateString);
    const locale = locales[getCurrentLocale()];
    return format(date, formatStr, { locale });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format a time string to a localized time format
 * @param timeString ISO date string or HH:MM format
 * @param formatStr Optional format string
 * @returns Formatted time string
 */
export const formatTime = (timeString: string, formatStr = 'p'): string => {
  try {
    // Check if the timeString is in HH:MM format
    if (/^\d{1,2}:\d{2}$/.test(timeString)) {
      // For HH:MM format, just return as is for now
      // In a real app, you might want to convert this to a localized format
      return timeString;
    }
    
    // For ISO date strings
    const date = parseISO(timeString);
    const locale = locales[getCurrentLocale()];
    return format(date, formatStr, { locale });
  } catch (error) {
    console.error('Error formatting time:', error);
    return timeString;
  }
};

/**
 * Format a date range
 * @param startDateString ISO date string for start date
 * @param endDateString ISO date string for end date
 * @returns Formatted date range string
 */
export const formatDateRange = (startDateString: string, endDateString: string): string => {
  try {
    const startDate = parseISO(startDateString);
    const endDate = parseISO(endDateString);
    const locale = locales[getCurrentLocale()];
    
    // If same day, only show date once
    if (format(startDate, 'yyyy-MM-dd') === format(endDate, 'yyyy-MM-dd')) {
      return `${format(startDate, 'PPP', { locale })} ${format(startDate, 'p', { locale })} - ${format(endDate, 'p', { locale })}`;
    }
    
    // Different days
    return `${format(startDate, 'PPP p', { locale })} - ${format(endDate, 'PPP p', { locale })}`;
  } catch (error) {
    console.error('Error formatting date range:', error);
    return `${startDateString} - ${endDateString}`;
  }
};