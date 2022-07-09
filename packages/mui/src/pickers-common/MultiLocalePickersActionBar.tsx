import styled from '@emotion/styled';
import { DialogActions, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLocaleText } from '@mui/x-date-pickers/internals/hooks/useUtils';
import {
  PickersActionBar,
  PickersActionBarProps,
} from '@mui/x-date-pickers/PickersActionBar';
import { useMultiLocalizationContext } from './MultiLocalizationProvider';

const DialogActionBar = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
}));

export const MultiLocalePickersActionBar = (props: PickersActionBarProps) => {
  const { currentLocale, localeOptions, changeLocale } =
    useMultiLocalizationContext();
  const localeText = useLocaleText();

  return (
    <DialogActionBar>
      <PickersActionBar {...props} />
      <DialogActions>
        <ToggleButtonGroup
          value={currentLocale}
          exclusive
          onChange={changeLocale}
        >
          {localeOptions.map((option) => (
            <ToggleButton key={option} value={option}>
              {localeText.changeLocaleButtonLabel?.[option]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </DialogActions>
    </DialogActionBar>
  );
};
