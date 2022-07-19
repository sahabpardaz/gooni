import {
  alpha,
  DialogActions,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from '@mui/material';
import { styled } from '@mui/system';
import { useLocaleText } from '@mui/x-date-pickers/internals';
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

const ToggleButton = styled(MuiToggleButton)(({ theme, color: colorProp }) => {
  const color = colorProp === 'standard' || !colorProp ? 'primary' : colorProp;
  return {
    borderColor: theme.palette[color].main,
    padding: theme.spacing(0.75, 1),
    color: theme.palette[color].main,
    '&:hover': {
      backgroundColor: alpha(
        theme.palette[color].main,
        theme.palette.action.hoverOpacity,
      ),
    },
    '&.Mui-selected': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette[color].main,
      '&:hover': {
        backgroundColor: theme.palette[color].main,
      },
    },
  };
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
        <MuiToggleButtonGroup
          value={currentLocale}
          exclusive
          onChange={handleLocaleChange}
        >
          {locales.map((locale) => (
            <ToggleButton key={locale} value={locale}>
              {localeText.localeButtonLabel?.[locale]}
            </ToggleButton>
          ))}
        </MuiToggleButtonGroup>
      </DialogActions>
    </DialogActionBar>
  );
};
