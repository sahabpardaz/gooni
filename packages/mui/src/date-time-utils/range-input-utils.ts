import { RangeInputLabels } from 'src/pickers-common/localization-provider';
import { formatDateRange } from './date-time-utils';
import { TimeRange } from './time-range-type';

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
