import moment, { Moment } from 'moment-jalaali';

import { CalendarTypes, defaultLocale } from '../constant-types';
import { TimeRange } from './time-range-type';
import { localizeFormat } from './moment-utils';

/**
 *
 * convert a timerange object to datetime format.
 * @param {TimeRange} dateRange
 * @param {CalendarTypes} [locale]

 * @returns {TimeRange}
 */
export function formatDateTimeRange(
  dateRange: TimeRange,
  locale?: CalendarTypes,
) {
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
 * @param {CalendarTypes} [locale]
 * @returns {TimeRange}
 */
export function formatDateRange(
  dateRange: TimeRange,
  format?: string,
  locale?: CalendarTypes,
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
 * @param {CalendarTypes} [locale]
 * @returns {string}
 */
export function formatDateTime(
  date: string | Date | Moment,
  locale?: CalendarTypes,
) {
  return formatDate(date, 'YYYY/MM/DD HH:mm', locale);
}

/**
 *
 * convert input date to time HH:mm format.
 * @param {(string | Date | Moment)} date
 * @param {CalendarTypes} [locale]
 * @returns {string}
 */
export function formatTime(
  date: string | Date | Moment,
  locale?: CalendarTypes,
) {
  return formatDate(date, 'HH:mm', locale);
}

/**
 *
 * convert input date to format(YYYY/MM/DD).
 * @param {(string | Date | Moment)} date
 * @param {string} [format='YYYY/MM/DD']
 * @param {CalendarTypes} [locale=defaultLocale.calendar]
 * @returns {string}
 */
export function formatDate(
  date: string | Date | Moment,
  format: string = 'YYYY/MM/DD',
  locale: CalendarTypes = defaultLocale.calendar,
) {
  return moment(date).format(localizeFormat(format, locale));
}
