import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import {
  RangeInputI18nProvider,
  RangePickerI18nProvider,
  TimeRange,
  TimeRangeInput as PxTimeRangeInput,
} from '../..';

export default {
  title: 'Time Picker/Time Range Input',
  // decorators: [calendarDecorator()],
} as Meta;

interface TimeRangeInputStoryProps {
  inputToLabel: string;
  inputFromLabel: string;
  pickerToLabel: string;
  pickerFromLabel: string;
}

export const TimeRangeInput: Story<TimeRangeInputStoryProps> = ({
  inputToLabel,
  inputFromLabel,
  pickerToLabel,
  pickerFromLabel,
}) => {
  const [timeRange, setTimeRange] = React.useState<TimeRange>({
    to: null,
    from: null,
  });

  return (
    <RangeInputI18nProvider value={{ to: inputToLabel, from: inputFromLabel }}>
      <RangePickerI18nProvider
        value={{ fromLabel: pickerFromLabel, toLabel: pickerToLabel }}
      >
        <PxTimeRangeInput fullWidth value={timeRange} onChange={setTimeRange} />
      </RangePickerI18nProvider>
    </RangeInputI18nProvider>
  );
};

TimeRangeInput.argTypes = {
  inputToLabel: {
    defaultValue: 'to',
    control: 'text',
  },
  inputFromLabel: {
    defaultValue: 'from',
    control: 'text',
  },
  pickerToLabel: {
    defaultValue: 'to',
    control: 'text',
  },
  pickerFromLabel: {
    defaultValue: 'from',
    control: 'text',
  },
};
