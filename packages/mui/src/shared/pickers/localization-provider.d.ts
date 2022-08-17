import type { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { GeneralizedLocale } from './MultiLocalizationProvider';
import { RangeInputLabels, RangePickerLabels } from './types';

declare module '@mui/x-date-pickers' {
  export interface PickersLocaleText {
    localeButtonLabel?: Record<GeneralizedLocale, string>;
    errors?: Partial<Record<NonNullable<DateTimeValidationError>, string>>;
    rangePickerLabels?: RangePickerLabels;
    rangeInputLabels?: RangeInputLabels;
  }
}
