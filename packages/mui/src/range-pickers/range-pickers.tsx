import { WrappedRangePickerProps, wrapRangePicker } from './wrapper';

export const TimeRangePicker = wrapRangePicker('TIME');
export type TimeRangePickerProps<In, Out = In> = WrappedRangePickerProps<
  'TIME',
  In,
  Out
>;

export const DateRangePicker = wrapRangePicker('DATE');
export type DateRangePickerProps<In, Out = In> = WrappedRangePickerProps<
  'DATE',
  In,
  Out
>;

export const DateTimeRangePicker = wrapRangePicker('DATETIME');
export type DateTimeRangePickerProps<In, Out = In> = WrappedRangePickerProps<
  'DATETIME',
  In,
  Out
>;
