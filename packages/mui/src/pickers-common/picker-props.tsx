import React, { ReactNode, useState } from 'react';
import { DateTimePickerProps } from '@mui/lab';
import { TextField } from '@mui/material';

import { PickerLabel, usePickerI18nContext } from './px-picker-i18n-provider';

type RenderInput = DateTimePickerProps['renderInput'];

export type RenderInputFactoryProps = {
  error: { reason: string; message: ReactNode } | undefined;
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

export function usePickerProps(props: { errorsText: PickerLabel['errors'] }) {
  const contextLabel = usePickerI18nContext();

  const [error, setError] = useState<RenderInputFactoryProps['error']>();
  const onError: DateTimePickerProps['onError'] = (reason, value) => {
    setError(
      !reason
        ? undefined
        : {
            reason,
            message:
              props.errorsText?.[reason] ??
              contextLabel.errors?.[reason] ??
              reason,
          },
    );
  };

  return {
    ...contextLabel,
    onError,
    renderInput: pickerDefaultRenderInputFactory({ error }),
  };
}
