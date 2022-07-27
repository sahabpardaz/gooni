import type { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { RangeInputLabels, RangePickerLabels } from 'src/date-time-utils';
import { GeneralizedLocale } from './MultiLocalizationProvider';

declare module '@mui/x-date-pickers' {
  export interface PickersLocaleText {
    localeButtonLabel?: Record<GeneralizedLocale, string>;
    errors?: Partial<Record<NonNullable<DateTimeValidationError>, string>>;
    rangePickerLabels?: RangePickerLabels;
    rangeInputLabels?: RangeInputLabels;
  }
}
