import { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';

declare module '@mui/x-date-pickers' {
  export interface PickersLocaleText {
    errors?: Partial<Record<NonNullable<DateTimeValidationError>, string>>;
  }
}
