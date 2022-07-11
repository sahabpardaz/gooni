import {
  alpha,
  createTheme,
  Direction,
  PaletteMode,
  ThemeOptions,
} from '@mui/material';
import { grey, red } from '@mui/material/colors';

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    grey: true;
  }
}
declare module '@mui/material' {
  interface Color {
    main: string;
    dark: string;
  }
}

export function getThemeOptions(
  direction: Direction,
  paletteType: PaletteMode,
) {
  const themeOptions: ThemeOptions = {
    direction,
    palette: {
      grey: {
        dark: grey[400],
        main: grey[300],
      },
      primary: {
        dark: '#0F7DAA',
        main: '#1297CE',
        light: '#27B2EC',
      },
      error: red,
      background: { default: grey[100] },
      mode: paletteType,
    },
    typography: {
      fontFamily: 'Shabnam, "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            if (ownerState.color !== 'grey') return {};
            switch (ownerState.variant) {
              case 'contained':
                return {
                  color: theme.palette.getContrastText(theme.palette.grey[300]),
                };
              case 'outlined':
                return {
                  color: theme.palette.text.primary,
                  borderColor:
                    theme.palette.mode === 'light'
                      ? 'rgba(0, 0, 0, 0.23)'
                      : 'rgba(255, 255, 255, 0.23)',
                  '&.Mui-disabled': {
                    border: `1px solid ${theme.palette.action.disabledBackground}`,
                  },
                  '&:hover': {
                    borderColor:
                      theme.palette.mode === 'light'
                        ? 'rgba(0, 0, 0, 0.23)'
                        : 'rgba(255, 255, 255, 0.23)',
                    backgroundColor: alpha(
                      theme.palette.text.primary,
                      theme.palette.action.hoverOpacity,
                    ),
                  },
                };
              case 'text':
                return {
                  color: theme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: alpha(
                      theme.palette.text.primary,
                      theme.palette.action.hoverOpacity,
                    ),
                  },
                };

              default:
                return {};
            }
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            const color =
              ownerState.color === 'standard' || !ownerState.color
                ? 'primary'
                : ownerState.color;
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
          },
        },
      },
    },
  };
  return themeOptions;
}

export const rtlTheme = createTheme(getThemeOptions('rtl', 'light'));
export const ltrTheme = createTheme(getThemeOptions('ltr', 'light'));

export const darkRtlTheme = createTheme(getThemeOptions('rtl', 'dark'));
export const darkLtrTheme = createTheme(getThemeOptions('ltr', 'dark'));
