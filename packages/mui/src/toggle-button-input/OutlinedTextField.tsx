import { OutlinedTextFieldProps, TextField } from '@mui/material';
import React from 'react';

interface OwnProps
  extends Omit<OutlinedTextFieldProps, 'variant' | 'onChange'> {
  onChange?: (value: string) => void;
}
export type Props = React.PropsWithChildren<OwnProps>;

export function OutlinedTextField(props: Props) {
  const { onChange, ...others } = props;
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChange?.(e.currentTarget.value);
    },
    [onChange],
  );
  return <TextField {...others} onChange={handleChange} variant="outlined" />;
}
