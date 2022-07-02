import styled from '@emotion/styled';
import { Button, DialogActions } from '@mui/material';
import { useLocaleText } from '@mui/x-date-pickers/internals/hooks/useUtils';
import {
  PickersActionBar,
  PickersActionBarProps,
} from '@mui/x-date-pickers/PickersActionBar';
import { Locale } from 'src/constant-types';

export interface MultiLocalePickersActionBarProps
  extends PickersActionBarProps {
  locale: Locale;
  onLocaleChange: () => void;
}

const DialogActionBar = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
}));

export const MultiLocalePickersActionBar = (
  props: MultiLocalePickersActionBarProps,
) => {
  const { locale, onLocaleChange, ...pickersActionBarProps } = props;

  const localeText = useLocaleText();

  return (
    <DialogActionBar>
      <PickersActionBar {...pickersActionBarProps} />
      <DialogActions>
        <Button onClick={onLocaleChange}>
          {localeText.changeLocaleButtonLabel &&
            localeText.changeLocaleButtonLabel[locale]}
        </Button>
      </DialogActions>
    </DialogActionBar>
  );
};
