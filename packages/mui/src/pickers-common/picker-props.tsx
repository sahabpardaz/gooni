import { TextField } from '@mui/material';
import {
  DateTimePickerProps,
  MuiPickersAdapterContext,
  PickersLocaleText,
} from '@mui/x-date-pickers';
import { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { ReactNode, useContext, useState } from 'react';

type RenderInput = DateTimePickerProps<unknown, unknown>['renderInput'];

export type RenderInputFactoryProps = {
  error: { reason: DateTimeValidationError; message: ReactNode } | undefined;
};

export const pickerDefaultRenderInputFactory =
  ({ error }: RenderInputFactoryProps): RenderInput =>
  (params) =>
    (
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        error={!!error}
        helperText={error?.message}
        {...params}
      />
    );

export function usePickerProps<In, Out>() {
  const pickerLocalization =
    useContext(MuiPickersAdapterContext)?.localeText ||
    ({} as PickersLocaleText<unknown>);
  const [error, setError] = useState<RenderInputFactoryProps['error']>();
  const onError: DateTimePickerProps<In, Out>['onError'] = (reason) => {
    setError(
      !reason
        ? undefined
        : { reason, message: pickerLocalization?.errors?.[reason] ?? reason },
    );
  };

  return {
    onError,
    renderInput: pickerDefaultRenderInputFactory({ error }),
  };
}
