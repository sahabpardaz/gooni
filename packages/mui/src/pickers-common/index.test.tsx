import * as React from 'react';
import { ThemeProvider, useTheme } from '@mui/material';
import { renderHook } from '@testing-library/react-hooks';

import {
  PickerI18nProvider,
  PickerThemeProvider,
  RangeInputI18nProvider,
  RangePickerI18nProvider,
  usePickerI18nContext,
  useRangeInputI18nContext,
  useRangePickerI18nContext,
} from '.';
import { PickerLabel } from './px-picker-i18n-provider';
import { RangeInputLabels } from '../date-time-utils';
import { RangePickerLabel } from './px-range-picker-i18n-provider';

function WrapperPickerI18nProvider(props: React.PropsWithChildren<{}>) {
  const labels: PickerLabel = {
    cancelText: 'cancelText',
    clearText: 'clearText',
  };

  return (
    <PickerI18nProvider value={labels}>{props.children}</PickerI18nProvider>
  );
}

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

function getWrapperPickerThemeProvider(color?: 'secondary' | 'primary') {
  return function WrapperPickerThemeProvider(
    props: React.PropsWithChildren<{}>,
  ) {
    return (
      <ThemeProvider
        theme={{
          palette: {
            primary: { main: outerPrimary },
            secondary: { main: outerSecondary },
          },
        }}
      >
        <PickerThemeProvider color={color}>
          {props.children}
        </PickerThemeProvider>
      </ThemeProvider>
    );
  };
}

describe('pickers-common', () => {
  describe('UsePickerI18nContext', () => {
    it('should be default value when its provider is not used', () => {
      const { result } = renderHook(usePickerI18nContext);

      const context = result.current;

      expect(Object.keys(context.errors!)).toEqual([
        'invalidDate',
        'maxDate',
        'minDate',
      ]);
    });

    it('should take label from provider', () => {
      const { result } = renderHook(usePickerI18nContext, {
        wrapper: WrapperPickerI18nProvider,
      });

      const { cancelText, clearText, okText } = result.current;

      expect(cancelText).toBe('cancelText');
      expect(clearText).toBe('clearText');
      expect(okText).toBe(undefined);
    });
  });

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

  describe('PickerThemeProvider', () => {
    it('should primary color be secondary color', () => {
      const { result } = renderHook(useTheme, {
        wrapper: getWrapperPickerThemeProvider(),
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
        wrapper: getWrapperPickerThemeProvider('primary'),
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
