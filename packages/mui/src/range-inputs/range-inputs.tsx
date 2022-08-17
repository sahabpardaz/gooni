import { WrappedRangeInputProps, wrapRangeInput } from './wrapper';

export const TimeRangeInput = wrapRangeInput('TIME');
export type TimeRangeInputProps<In, Out = In> = WrappedRangeInputProps<
  'TIME',
  In,
  Out
>;

export const DateRangeInput = wrapRangeInput('DATE');
export type DateRangeInputProps<In, Out = In> = WrappedRangeInputProps<
  'DATE',
  In,
  Out
>;

export const DateTimeRangeInput = wrapRangeInput('DATETIME');
export type DateTimeRangeInputProps<In, Out = In> = WrappedRangeInputProps<
  'DATETIME',
  In,
  Out
>;
