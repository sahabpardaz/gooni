import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

import { GlobalStyles } from '../core/styles/GlobalStyles';
import { RTLProvider } from '../core/rtl';
import { StoryDummy } from './helpers';
import { ltrTheme, rtlTheme } from '../core/theme';

export const themeDecorator: DecoratorFunction<StoryFnReactReturnType> = (
  storyFn,
  context,
) => {
  const direction = context?.globals.locale ?? 'en';
  const theme = direction === 'fa' ? rtlTheme : ltrTheme;
  return (
    <RTLProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        <StoryDummy storyFn={storyFn} />
      </ThemeProvider>
    </RTLProvider>
  );
};
