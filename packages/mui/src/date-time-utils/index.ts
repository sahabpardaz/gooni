// read more about doc comment syntax in https://api-extractor.com/pages/tsdoc/doc_comment_syntax/

/**
 * date time utils
 *
 * @remarks
 * provide {@link DateTimeUtils} function that returns `date-time-utils` string
 *
 * @packageDocumentation
 */

export {
  formatDate,
  formatDateRange,
  formatDateTime,
  formatDateTimeRange,
  formatTime,
  getLocalizedDateFns,
  getLocalizedDateFnsAdapter,
  getRangeInputValue,
  type RangeInputFormatter,
} from './date-time-utils';
export * from './types';
