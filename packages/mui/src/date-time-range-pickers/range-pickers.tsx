import { WrappedRangePickerProps, WrapRangePicker } from './wrapper';

export const TimeRangePicker = WrapRangePicker('TIME');
export type TimeRangePickerProps<In, Out = In> = WrappedRangePickerProps<
  'TIME',
  In,
  Out
>;

export const DateRangePicker = WrapRangePicker('DATE');
export type DateRangePickerProps<In, Out = In> = WrappedRangePickerProps<
  'DATE',
  In,
  Out
>;

export const DateTimeRangePicker = WrapRangePicker('DATETIME');
export type DateTimeRangePickerProps<In, Out = In> = WrappedRangePickerProps<
  'DATETIME',
  In,
  Out
>;
