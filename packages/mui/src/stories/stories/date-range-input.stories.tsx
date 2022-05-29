import { Meta } from '@storybook/react';
import jMoment from 'moment-jalaali';
import React, { useCallback, useState } from 'react';

import { DateRangeInput, RangeInputI18nProvider, TimeRange } from '../..';
import { storyWrapperDecorator } from '../decorators';

const useDateRangeInput = () => {
  const [value, setValue] = useState<TimeRange>({ from: null, to: null });
  const onChange = useCallback((value: TimeRange) => {
    setValue(value);
  }, []);
  return { value, onChange };
};

export default {
  title: 'DateRange Input',
  decorators: [storyWrapperDecorator()],
} as Meta;

export const Simple = () => {
  const { value, onChange } = useDateRangeInput();
  return (
    <DateRangeInput
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="dense"
    />
  );
};

export const SimpleWithContext = () => {
  const { value, onChange } = useDateRangeInput();
  return (
    <RangeInputI18nProvider value={{ from: 'از', to: 'تا' }}>
      <DateRangeInput
        value={value}
        onChange={onChange}
        variant="outlined"
        margin="dense"
      />
    </RangeInputI18nProvider>
  );
};

export const LimitToDate = () => {
  const { value, onChange } = useDateRangeInput();
  const fromDate = jMoment(value.from);
  // to Date can be at most, 7 days far from the from date
  const days = 7;
  const toMaxDate = fromDate.add(days, 'days');

  return (
    <RangeInputI18nProvider value={{ from: 'از', to: 'تا' }}>
      <DateRangeInput
        value={value}
        onChange={onChange}
        variant="outlined"
        margin="dense"
        dateRangePickerProps={{
          toDatePickerProps: { maxDate: toMaxDate },
        }}
      />
    </RangeInputI18nProvider>
  );
};

export const ColorPrimary = () => {
  const { value, onChange } = useDateRangeInput();
  return (
    <DateRangeInput
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="dense"
      color="primary"
    />
  );
};

export const ColorSecondary = () => {
  const { value, onChange } = useDateRangeInput();
  return (
    <DateRangeInput
      value={value}
      onChange={onChange}
      variant="outlined"
      margin="dense"
    />
  );
};
