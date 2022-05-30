import { Global as EmotionGlobalStyles } from '@emotion/react';
import { useTheme } from '@mui/material';
import { useEffect } from 'react';

export function GlobalStyles() {
  const theme = useTheme();

  const { direction } = theme;

  // material ui read dir attribute of body, so we should set that value
  // see more: https://github.com/mui-org/material-ui/blob/3f850eaa6d437afe86127343f0010703ed11ee85/packages/material-ui/src/Popper/Popper.js#L15
  useEffect(() => {
    document.body.setAttribute('dir', direction === 'rtl' ? 'rtl' : 'ltr');
  }, [direction]);

  return (
    <EmotionGlobalStyles
      styles={{
        html: {},
        body: {
          fontSize: '0.875rem',
          lineHeight: '1.43',
          direction: 'ltr', // automatically changes to `rtl` based on theme.
        },
      }}
    />
  );
}
