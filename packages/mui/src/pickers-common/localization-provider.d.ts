import type { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { PickerTypes } from 'src/date-time-pickers/wrapper';
import { GeneralizedLocale } from './MultiLocalizationProvider';

export interface RangePickerLabels {
  /**
   * translated for `resetLabel`
   */
  resetLabel?: string;
  /**
   * translated for `fromLabel`
   */
  fromLabel?: (pickerType: PickerTypes) => string;
  /**
   * translated for `toLabel`
   */
  toLabel?: (pickerType: PickerTypes) => string;
}

export interface RangeInputLabels {
  /**
   * translated for `from`
   */
  from?: string;
  /**
   * translated for `to`
   */
  to?: string;
  /**
   * custom text shown in input instead of default behavior
   */
  customText?: string | ((timeRange: TimeRange) => string);
}

declare module '@mui/x-date-pickers' {
  export interface PickersLocaleText {
    localeButtonLabel?: Record<GeneralizedLocale, string>;
    errors?: Partial<Record<NonNullable<DateTimeValidationError>, string>>;
    rangePickerLabels?: Partial<RangePickerLabels>;
    rangeInputLabels?: Partial<RangeInputLabels>;
  }
}
