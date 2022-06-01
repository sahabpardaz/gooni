import moment, { Moment } from 'moment-jalaali';

import { Locale } from '../constant-types';
import { localizeFormat } from './moment-utils';
import { TimeRange } from './time-range-type';

/**
 *
 * convert a timerange object to datetime format.
 * @param {TimeRange} dateRange
 * @param {Locale} [locale]

 * @returns {TimeRange}
 */
export function formatDateTimeRange(dateRange: TimeRange, locale?: Locale) {
  const from = dateRange.from
    ? formatDateTime(dateRange.from.toDate(), locale)
    : null;
  const to = dateRange.to
    ? formatDateTime(dateRange.to.toDate(), locale)
    : null;
  return { from, to };
}

/**
 *
 * converts a timeRange object to date format.
 * @param {TimeRange} dateRange
 * @param {string} [format]
 * @param {Locale} [locale]
 * @returns {TimeRange}
 */
export function formatDateRange(
  dateRange: TimeRange,
  format?: string,
  locale?: Locale,
) {
  const from = dateRange.from
    ? formatDate(dateRange.from.toDate(), format, locale)
    : null;
  const to = dateRange.to
    ? formatDate(dateRange.to.toDate(), format, locale)
    : null;
  return { from, to };
}

/**
 *
 * convert input date to datetime format.
 * @param {(string | Date | Moment)} date
 * @param {Locale} [locale]
 * @returns {string}
 */
export function formatDateTime(date: string | Date | Moment, locale?: Locale) {
  return formatDate(date, 'YYYY/MM/DD HH:mm', locale);
}

/**
 *
 * convert input date to time HH:mm format.
 * @param {(string | Date | Moment)} date
 * @param {Locale} [locale]
 * @returns {string}
 */
export function formatTime(date: string | Date | Moment, locale?: Locale) {
  return formatDate(date, 'HH:mm', locale);
}

/**
 *
 * convert input date to format(YYYY/MM/DD).
 * @param {(string | Date | Moment)} date
 * @param {string} [format='YYYY/MM/DD']
 * @param {Locale} [locale=Locale.defaultLocale]
 * @returns {string}
 */
export function formatDate(
  date: string | Date | Moment,
  format: string = 'YYYY/MM/DD',
  locale: Locale = Locale.defaultLocale,
) {
  return moment(date).format(localizeFormat(format, locale));
}
