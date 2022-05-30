import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import {
  CalendarTypes,
  defaultLocale,
  LanguageTypes,
  RangePickerI18nProvider,
  RangePickerLabel,
  TimeRange,
  TimeRangePicker as PxTimeRangePicker,
  TimeRangePickerProps,
} from '../..';

export default {
  title: 'Time Picker/Time Range Picker',
} as Meta;

interface StoryProps extends RangePickerLabel, TimeRangePickerProps {}
export const TimeRangePicker: Story<StoryProps> = (args) => {
  const { toLabel, fromLabel, resetLabel, localeCalender, localeLanguage } =
    args;

  const [timeRange, setTimeRange] = React.useState<TimeRange>({
    from: null,
    to: null,
  });

  const handleChange = (date: TimeRange) => {
    setTimeRange(date);
  };

  return (
    <RangePickerI18nProvider value={{ toLabel, fromLabel, resetLabel }}>
      <PxTimeRangePicker
        onChange={handleChange}
        value={timeRange}
        localeLanguage={localeLanguage}
        localeCalender={localeCalender}
      />
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
  localeLanguage: {
    defaultValue: defaultLocale.language,
    options: LanguageTypes,
    control: {
      type: 'inline-radio',
    },
  },
  localeCalender: {
    defaultValue: defaultLocale.calendar,
    options: CalendarTypes,
    control: {
      type: 'inline-radio',
    },
  },
};
