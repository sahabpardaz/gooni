import { WrappedRangePickerInputProps, WrapRangePickerInput } from './wrapper';

export const TimeRangePickerInput = WrapRangePickerInput('TIME');
export type TimeRangeInputProps<In, Out = In> = WrappedRangePickerInputProps<
  'TIME',
  In,
  Out
>;

export const DateRangePickerInput = WrapRangePickerInput('DATE');
export type DateRangeInputProps<In, Out = In> = WrappedRangePickerInputProps<
  'DATE',
  In,
  Out
>;

export const DateTimeRangePickerInput = WrapRangePickerInput('DATETIME');
export type DateTimeRangeInputProps<
  In,
  Out = In,
> = WrappedRangePickerInputProps<'DATETIME', In, Out>;
