import momentBase from 'moment';
import momentJalaali from 'moment-jalaali';

import { CalendarTypes, defaultLocale } from '../constant-types';

export const moment: Function =
  defaultLocale.calendar === CalendarTypes.jalaali ? momentJalaali : momentBase;

/**
 *
 * localize format string in Jalali or Gregorian.
 *
 * @param {string} format
 * @param {CalendarTypes} [locale=defaultLocale.calendar]
 * @returns {string}
 */
export function localizeFormat(
  format: string,
  locale: CalendarTypes = defaultLocale.calendar,
) {
  format = format.replace(/[ij]/g, '');
  let prefix = '';
  if (locale === 'jalaali') {
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
