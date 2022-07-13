import styled from '@emotion/styled';
import { DialogActions, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useLocaleText } from '@mui/x-date-pickers/internals/hooks/useUtils';
import {
  PickersActionBar,
  PickersActionBarProps,
} from '@mui/x-date-pickers/PickersActionBar';
import {
  GeneralizedLocale,
  useMultiLocalizationContext,
} from './MultiLocalizationProvider';

const DialogActionBar = styled('div')({
  display: 'flex',
  flexDirection: 'row-reverse',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
});

export const MultiLocalePickersActionBar = (props: PickersActionBarProps) => {
  const { currentLocale, locales, changeLocale } =
    useMultiLocalizationContext();
  const localeText = useLocaleText();

  const handleLocaleChange = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: GeneralizedLocale | null,
  ) => {
    value && changeLocale(value);
  };

  return (
    <DialogActionBar>
      <PickersActionBar {...props} />
      <DialogActions>
        <ToggleButtonGroup
          value={currentLocale}
          exclusive
          onChange={handleLocaleChange}
        >
          {locales.map((locale) => (
            <ToggleButton key={locale} value={locale}>
              {localeText.localeButtonLabel?.[locale]}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </DialogActions>
    </DialogActionBar>
  );
};
