import { WrappedRangeInputProps, WrapRangeInput } from './wrapper';

export const TimeRangeInput = WrapRangeInput('TIME');
export type TimeRangeInputProps<In, Out = In> = WrappedRangeInputProps<
  'TIME',
  In,
  Out
>;

export const DateRangeInput = WrapRangeInput('DATE');
export type DateRangeInputProps<In, Out = In> = WrappedRangeInputProps<
  'DATE',
  In,
  Out
>;

export const DateTimeRangeInput = WrapRangeInput('DATETIME');
export type DateTimeRangeInputProps<In, Out = In> = WrappedRangeInputProps<
  'DATETIME',
  In,
  Out
>;
