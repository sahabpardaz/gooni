import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { TssCacheProvider } from 'tss-react';
import { muiCacheRtl, tssCacheRtl } from '../core/emotion';
import { GlobalStyles } from '../core/styles/GlobalStyles';
import { ltrTheme, rtlTheme } from '../core/theme';

export const themeDecorator: DecoratorFunction<StoryFnReactReturnType> = (
  Story,
  context,
) => {
  const direction = context?.globals.locale ?? 'en';
  const theme = direction === 'fa' ? rtlTheme : ltrTheme;
  return (
    <TssCacheProvider value={tssCacheRtl}>
      <CacheProvider value={muiCacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </CacheProvider>
    </TssCacheProvider>
  );
};
