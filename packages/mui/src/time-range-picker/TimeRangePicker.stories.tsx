import {
  RangePickerI18nProvider,
  RangePickerLabel,
  TimeRange,
  TimeRangePicker as PxTimeRangePicker,
  TimeRangePickerProps,
} from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';

export default {
  title: 'Time Picker/Time Range Picker',
  decorators: [calendarDecorator()],
} as Meta;

interface StoryProps extends RangePickerLabel, TimeRangePickerProps {}
export const TimeRangePicker: Story<StoryProps> = (args) => {
  const { toLabel, fromLabel, resetLabel } = args;

  const [timeRange, setTimeRange] = React.useState<TimeRange>({
    from: null,
    to: null,
  });

  const handleChange = (date: TimeRange) => {
    setTimeRange(date);
  };

  return (
    <RangePickerI18nProvider value={{ toLabel, fromLabel, resetLabel }}>
      <PxTimeRangePicker onChange={handleChange} value={timeRange} />
    </RangePickerI18nProvider>
  );
};

TimeRangePicker.argTypes = {
  toLabel: {
    defaultValue: 'to Time',
    control: 'text',
  },
  fromLabel: {
    defaultValue: 'from Time',
    control: 'text',
  },
  resetLabel: {
    defaultValue: 'reset',
    control: 'text',
  },
};
