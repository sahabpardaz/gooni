import { WrappedPickerProps, wrapPicker } from './wrapper';

export const TimePicker = wrapPicker('TIME');
export type TimePickerProps<In, Out = In> = WrappedPickerProps<'TIME', In, Out>;

export const DatePicker = wrapPicker('DATE');
export type DatePickerProps<In, Out = In> = WrappedPickerProps<'DATE', In, Out>;

export const DateTimePicker = wrapPicker('DATETIME');
export type DateTimePickerProps<In, Out = In> = WrappedPickerProps<
  'DATETIME',
  In,
  Out
>;
