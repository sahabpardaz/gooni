import { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { GeneralizedLocale } from './MultiLocalizationProvider';

declare module '@mui/x-date-pickers' {
  export interface PickersLocaleText {
    changeLocaleButtonLabel?: Record<GeneralizedLocale, string>;
    errors?: Partial<Record<NonNullable<DateTimeValidationError>, string>>;
  }
}
