import styled from '@emotion/styled';
import { Button, DialogActions } from '@mui/material';
import { useLocaleText } from '@mui/x-date-pickers/internals/hooks/useUtils';
import {
  PickersActionBar,
  PickersActionBarProps,
} from '@mui/x-date-pickers/PickersActionBar';
import { Locale } from 'src/constant-types';

interface Props extends PickersActionBarProps {
  locale: Locale;
  onLocaleChange: () => void;
}

export { Props as MultiLocalePickersActionBarProps };

const DialogActionBar = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
}));

export const MultiLocalePickersActionBar = (props: Props) => {
  const { locale, onLocaleChange, ...pickersActionBarProps } = props;

  const localeText = useLocaleText();

  return (
    <DialogActionBar>
      <PickersActionBar {...pickersActionBarProps} />
      <DialogActions>
        <Button onClick={onLocaleChange}>
          {localeText.changeLocaleButtonLabel?.[locale]}
        </Button>
      </DialogActions>
    </DialogActionBar>
  );
};
