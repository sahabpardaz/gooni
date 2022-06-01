import { createTheme, Theme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  color?: 'primary' | 'secondary';
  children: ReactNode;
}
export { Props as ThemeColorSwapperProps };

export function ThemeColorSwapper(props: Props) {
  const { color = 'secondary', children } = props;

  const primary = color;
  const secondary = color === 'primary' ? 'secondary' : 'primary';

  const themeChanger = (outerTheme: Theme) =>
    createTheme(outerTheme, {
      palette: {
        primary: outerTheme.palette[primary],
        secondary: outerTheme.palette[secondary],
      },
    });

  return <ThemeProvider theme={themeChanger}>{children}</ThemeProvider>;
}
