import { createTheme, ThemeProvider, useTheme } from '@mui/material';
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

  const outerTheme = useTheme();
  const theme = createTheme(outerTheme, {
    palette: {
      primary: outerTheme.palette[primary],
      secondary: outerTheme.palette[secondary],
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
