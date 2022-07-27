import DateFnsBaseAdapter from '@date-io/date-fns';
import DateFnsJalaliAdapterBase from '@date-io/date-fns-jalali';
import * as DateFnsBase from 'date-fns';
import * as DateFnsJalali from 'date-fns-jalali';
import { RangeInputLabels } from 'src/shared/pickers';
import { Locale } from '../constant-types';
import { TimeRange } from '../shared/pickers/types';

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

/**
 * Contract for range input formatter.
 * @type RangeInputFormatter
 */
export type RangeInputFormatter = (value: TimeRange) => {
  to: string | null;
  from: string | null;
};

/**
 * Converts `value` to text.
 * You can override this behavior by passing `customText` to `labels`.
 *
 * @public
 * @param {TimeRange} timeRange
 * @param {RangeInputLabels} labels
 * @param {RangeInputFormatter} formatter
 * @returns {string}
 */
export function getRangeInputValue(
  timeRange: TimeRange,
  labels: RangeInputLabels,
  formatter: RangeInputFormatter = formatDateRange,
): string {
  if (!!labels.customText) {
    return typeof labels.customText == 'function'
      ? labels.customText(timeRange)
      : labels.customText;
  }
  const value = formatter(timeRange);

  return (
    (value.from ? `${labels.from} ${value.from} ` : '') +
    (value.to ? `${labels.to} ${value.to}` : '')
  ).trim();
}
