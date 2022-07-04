import { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { Locale } from 'src/constant-types';

declare module '@mui/x-date-pickers' {
  export interface PickersLocaleText {
    changeLocaleButtonLabel?: Record<Locale, string>;
    errors?: Partial<Record<NonNullable<DateTimeValidationError>, string>>;
  }
}
