/**
 * enum for calendar type (supports jalali and gregorian)
 * @readonly
 */
export enum CalendarTypes {
  /**
   * For Jalaali Calendar
   */
  jalaali = 'jalaali',
  /**
   * For Gregorian Calendar
   */
  gregorian = 'gregorian',
}

/**
 * enum for language types (supports Persian and English)
 * @readonly
 */
export enum LanguageTypes {
  /**
   * For Persian Language
   */
  fa = 'fa',
  /**
   * For English Language
   */
  en = 'en',
}

/**
 * Language and Calendar contract.
 * @readonly
 */
export interface Locale {
  /**
   * Calendar type
   */
  calendar: CalendarTypes;
  /**
   * Language type
   */
  language: LanguageTypes;
}

export const defaultLocale: Locale = {
  calendar: CalendarTypes.jalaali,
  language: LanguageTypes.fa,
};
