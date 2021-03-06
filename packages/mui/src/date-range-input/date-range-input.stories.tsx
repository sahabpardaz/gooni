import {
  DateRangeInput,
  RangeInputI18nProvider,
  TimeRange,
} from '@my-sahab/mui';
import { Meta } from '@storybook/react';
import { addDays } from 'date-fns-jalali';
import { useCallback, useState } from 'react';
import {
  calendarDecorator,
  storyWrapperDecorator,
} from 'src/@storybook/decorators';

const useDateRangeInput = () => {
  const [value, setValue] = useState<TimeRange>({ from: null, to: null });
  const onChange = useCallback((value: TimeRange) => {
    setValue(value);
  }, []);
  return { value, onChange };
};

export default {
  title: 'Date Picker/DateRange Input',
  decorators: [storyWrapperDecorator(), calendarDecorator()],
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
  // to Date can be at most, 7 days far from the from date
  const days = 7;
  const toMaxDate = value.from ? addDays(value.from, days) : undefined;

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
