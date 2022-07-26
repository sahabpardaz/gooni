import { ThemeProvider, useTheme } from '@mui/material';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';
import { ThemeColorSwapper } from './theme-color-swapper';

const outerPrimary = '#f2f2f2';
const outerSecondary = '#bbbbbb';

function getWrapperThemeColorSwapper(color?: 'secondary' | 'primary') {
  return function WrapperThemeColorSwapper(props: React.PropsWithChildren<{}>) {
    return (
      <ThemeProvider
        theme={{
          palette: {
            primary: { main: outerPrimary },
            secondary: { main: outerSecondary },
          },
        }}
      >
        <ThemeColorSwapper color={color}>{props.children}</ThemeColorSwapper>
      </ThemeProvider>
    );
  };
}

describe('ThemeColorSwapper', () => {
  it('should primary color be secondary color', () => {
    const { result } = renderHook(useTheme, {
      wrapper: getWrapperThemeColorSwapper(),
    });

    const {
      palette: { primary, secondary },
    } = result.current;

    const primaryColor = primary.main;
    const secondaryColor = secondary.main;

    expect(primaryColor).toEqual(outerSecondary);
    expect(secondaryColor).toEqual(outerPrimary);
  });

  it('should take primary as param and return outer primary color', () => {
    const { result } = renderHook(useTheme, {
      wrapper: getWrapperThemeColorSwapper('primary'),
    });

    const {
      palette: { primary, secondary },
    } = result.current;

    const primaryColor = primary.main;
    const secondaryColor = secondary.main;

    expect(primaryColor).toEqual(outerPrimary);
    expect(secondaryColor).toEqual(outerSecondary);
  });
});
