import React, { useEffect } from 'react';
import { GlobalStyles as TssGlobalStyles } from 'tss-react';
import { useTheme } from '@mui/material';

export function GlobalStyles() {
  const theme = useTheme();

  const { direction } = theme;

  // material ui read dir attribute of body, so we should set that value
  // see more: https://github.com/mui-org/material-ui/blob/3f850eaa6d437afe86127343f0010703ed11ee85/packages/material-ui/src/Popper/Popper.js#L15
  useEffect(() => {
    document.body.setAttribute('dir', direction === 'rtl' ? 'rtl' : 'ltr');
  }, [direction]);

  return (
    <TssGlobalStyles
      styles={{
        html: {},
        body: {
          direction: 'ltr', // automatically changes to `rtl` based on theme.
        },
      }}
    />
  );
}
