import * as React from 'react';
import { ThemeProvider, useTheme } from '@mui/material';

interface OwnProps {
  color?: 'primary' | 'secondary';
}

type Props = React.PropsWithChildren<OwnProps>;

export function PickerThemeProvider(props: Props) {
  const { color = 'secondary', children } = props;

  const outerTheme = useTheme();

  const primary = color;
  const secondary = color === 'primary' ? 'secondary' : 'primary';

  const theme = {
    ...outerTheme,
    palette: {
      ...outerTheme.palette,
      primary: outerTheme.palette[primary],
      secondary: outerTheme.palette[secondary],
    },
  };

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
