/**
 * enum for language types (supports Persian and English)
 * @readonly
 */
export enum Locale {
  /**
   * For Persian Language & Jalaali Calender
   */
  fa = 'fa',
  /**
   * For English Language & Gregorian Calender
   */
  en = 'en',
}

export namespace Locale {
  export const defaultLocale: Locale = Locale.fa;
}
