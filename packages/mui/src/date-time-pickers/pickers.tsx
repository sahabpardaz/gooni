import { WrappedPickerProps, WrapPicker } from './wrapper';

export const TimePicker = WrapPicker('TIME');
export type TimePickerProps<In, Out = In> = WrappedPickerProps<'TIME', In, Out>;

export const DatePicker = WrapPicker('DATE');
export type DatePickerProps<In, Out = In> = WrappedPickerProps<'DATE', In, Out>;

export const DateTimePicker = WrapPicker('DATETIME');
export type DateTimePickerProps<In, Out = In> = WrappedPickerProps<
  'DATETIME',
  In,
  Out
>;
