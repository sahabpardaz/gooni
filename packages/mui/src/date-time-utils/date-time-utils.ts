import DateFnsBaseAdapter from '@date-io/date-fns';
import DateFnsJalaliAdapterBase from '@date-io/date-fns-jalali';
import * as DateFnsBase from 'date-fns';
import * as DateFnsJalali from 'date-fns-jalali';
import { Locale } from '../constant-types';
import { TimeRange } from './time-range-type';

class DateFnsJalaliAdapter extends DateFnsJalaliAdapterBase {
  public getWeekdays = () => {
    const now = new Date();
    return DateFnsJalali.eachDayOfInterval({
      start: DateFnsJalali.startOfWeek(now, { locale: this.locale }),
      end: DateFnsJalali.endOfWeek(now, { locale: this.locale }),
    }).map((day) => this.formatByString(day, 'EEEEE'));
  };

  public formatByString = (date: Date, formatString: string) => {
    return this.formatNumber(
      DateFnsJalali.format(date, formatString, { locale: this.locale }),
    );
  };
}

export const getLocalizedDateFns = (locale: Locale = Locale.defaultLocale) =>
  locale === Locale.fa ? DateFnsJalali : DateFnsBase;

export const getLocalizedDateFnsAdapter = (
  locale: Locale = Locale.defaultLocale,
) => (locale === Locale.fa ? DateFnsJalaliAdapter : DateFnsBaseAdapter);

/**
 *
 * convert a timerange object to datetime format.
 * @param {TimeRange} dateRange
 * @param {Locale} [locale]

 * @returns {TimeRange}
 */
export function formatDateTimeRange(dateRange: TimeRange, locale?: Locale) {
  const from = dateRange.from ? formatDateTime(dateRange.from, locale) : null;
  const to = dateRange.to ? formatDateTime(dateRange.to, locale) : null;
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
    ? formatDate(dateRange.from, format, locale)
    : null;
  const to = dateRange.to ? formatDate(dateRange.to, format, locale) : null;
  return { from, to };
}

/**
 *
 * convert input date to datetime format.
 * @param {(string | Date)} date
 * @param {Locale} [locale]
 * @returns {string}
 */
export function formatDateTime(date: string | Date, locale?: Locale) {
  return formatDate(date, 'yyyy/MM/dd HH:mm', locale);
}

/**
 *
 * convert input date to time HH:mm format.
 * @param {(string | Date)} date
 * @param {Locale} [locale]
 * @returns {string}
 */
export function formatTime(date: string | Date, locale?: Locale) {
  return formatDate(date, 'HH:mm', locale);
}

/**
 *
 * convert input date to format(yyyy/MM/dd).
 * @param {(string | Date)} date
 * @param {string} [format='yyyy/MM/dd']
 * @param {Locale} [locale=Locale.defaultLocale]
 * @returns {string}
 */
export function formatDate(
  date: string | Date,
  format: string = 'yyyy/MM/dd',
  locale: Locale = Locale.defaultLocale,
) {
  return getLocalizedDateFns(locale).format(new Date(date), format);
}
