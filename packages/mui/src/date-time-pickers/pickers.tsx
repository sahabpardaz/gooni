import {
  DatePicker as MuiDatePicker,
  DateTimePicker as MuiDateTimePicker,
  TimePicker as MuiTimePicker,
} from '@mui/x-date-pickers';
import { WrappedPickerProps, WrapPicker } from './wrapper';

export * from '@mui/x-date-pickers';

export const TimePicker = WrapPicker(MuiTimePicker, true);
export type TimePickerProps<In, Out = In> = WrappedPickerProps<
  typeof MuiTimePicker,
  In,
  Out
>;

export const DatePicker = WrapPicker(MuiDatePicker);
export type DatePickerProps<In, Out = In> = WrappedPickerProps<
  typeof MuiDatePicker,
  In,
  Out
>;

export const DateTimePicker = WrapPicker(MuiDateTimePicker);
export type DateTimePickerProps<In, Out = In> = WrappedPickerProps<
  typeof MuiDateTimePicker,
  In,
  Out
>;
