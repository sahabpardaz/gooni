import momentBase from 'moment';
import momentJalaali from 'moment-jalaali';
import { Locale } from '../constant-types';

export const moment: Function =
  Locale.defaultLocale === Locale.fa ? momentJalaali : momentBase;

/**
 *
 * localize format string in Jalali or Gregorian.
 *
 * @param {string} format
 * @param {Locale} [locale=Locale.defaultLocale]
 * @returns {string}
 */
export function localizeFormat(
  format: string,
  locale: Locale = Locale.defaultLocale,
) {
  format = format.replace(/[ij]/g, '');
  let prefix = '';
  if (locale === Locale.fa) {
    format = format
      .replace(/jY+/g, `${prefix}$&`)
      .replace(/jM+/g, `${prefix}$&`)
      .replace(/jD+/g, `${prefix}$&`);
    prefix = 'j';
  }

  return format
    .replace(/Y+/g, `${prefix}$&`)
    .replace(/M+/g, `${prefix}$&`)
    .replace(/D+/g, `${prefix}$&`);
}
