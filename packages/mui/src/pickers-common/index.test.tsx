import { ThemeProvider, useTheme } from '@mui/material';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import {
  RangeInputI18nProvider,
  RangePickerI18nProvider,
  ThemeColorSwapper,
  useRangeInputI18nContext,
  useRangePickerI18nContext,
} from '.';
import { RangeInputLabels } from '../date-time-utils';
import { RangePickerLabel } from './px-range-picker-i18n-provider';

function WrapperRangePickerI18nProvider(props: React.PropsWithChildren<{}>) {
  const labels: RangePickerLabel = {
    fromLabel: 'fromTime',
    toLabel: 'toTime',
    resetLabel: 'removeTimes',
  };

  return (
    <RangePickerI18nProvider value={labels}>
      {props.children}
    </RangePickerI18nProvider>
  );
}

function WrapperInputRangePickerI18nProvider(
  props: React.PropsWithChildren<{}>,
) {
  const labels: RangeInputLabels = {
    from: 'fromTime',
    to: 'toTime',
    customText: 'custom',
  };

  return (
    <RangeInputI18nProvider value={labels}>
      {props.children}
    </RangeInputI18nProvider>
  );
}

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

describe('pickers-common', () => {
  describe('useRangePickerI18nContext', () => {
    it('should be empty object when its provider is not used', () => {
      const { result } = renderHook(useRangePickerI18nContext);

      const context = result.current;

      expect(context).toEqual({});
    });

    it('should take label from provider', () => {
      const { result } = renderHook(useRangePickerI18nContext, {
        wrapper: WrapperRangePickerI18nProvider,
      });

      const { toLabel, fromLabel, resetLabel } = result.current;

      expect(toLabel).toBe('toTime');
      expect(fromLabel).toBe('fromTime');
      expect(resetLabel).toBe('removeTimes');
    });
  });

  describe('useRangeInputI18nContext', () => {
    it('should be empty object when its provider is not used', () => {
      const { result } = renderHook(useRangeInputI18nContext);

      const context = result.current;

      expect(context).toEqual({});
    });

    it('should take label from provider', () => {
      const { result } = renderHook(useRangeInputI18nContext, {
        wrapper: WrapperInputRangePickerI18nProvider,
      });

      const { to, from, customText } = result.current;

      expect(to).toBe('toTime');
      expect(from).toBe('fromTime');
      expect(customText).toBe('custom');
    });
  });

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
});
