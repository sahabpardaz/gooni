import { TimeRange } from './time-range-type';
import { formatDateRange } from './date-time-utils';

/**
 * Contract for range input label translation.
 *
 * @interface RangeInputLabel
 */
export interface RangeInputLabels {
  /**
   * translated for `from`
   *
   * @type {string}
   */
  from?: string;
  /**
   * translated for `to`
   *
   * @type {string}
   */
  to?: string;
  /**
   * custom text shown in input instead of default behavior
   *
   *  @type {string | function}
   */
  customText?: string | ((timeRange: TimeRange) => string);
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
    if (typeof labels.customText == 'function') {
      return labels.customText(timeRange);
    }
    return labels.customText;
  }
  const value = formatter(timeRange);

  if (!value.from && !value.to) {
    return '';
  }

  if (!value.from) {
    return `${labels.to} ${value.to}`;
  }

  if (!value.to) {
    return `${labels.from} ${value.from}`;
  }

  return `${labels.from} ${value.from} ${labels.to} ${value.to}`;
}
