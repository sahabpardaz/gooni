import {
  DateRangePickerInput,
  DateTimeRangePickerInput,
  TimeRange,
  TimeRangePickerInput,
} from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';

export default {
  title: 'Components/Pickers/Range Picker Inputs',
  decorators: [calendarDecorator()],
  argTypes: {
    color: {
      defaultValue: 'primary',
      options: ['primary', 'secondary'],
      control: {
        type: 'inline-radio',
      },
    },
  },
} as Meta;

type RangePickerInputComponentTypes =
  | typeof DateRangePickerInput
  | typeof DateTimeRangePickerInput
  | typeof TimeRangePickerInput;

const Template =
  <P extends RangePickerInputComponentTypes>(RangePickerInput: P) =>
  (args: Omit<React.ComponentProps<P>, 'value' | 'onChange'>) => {
    const [value, onChange] = useState<TimeRange>({ to: null, from: null }); // eslint-disable-line react-hooks/rules-of-hooks

    return (
      // @ts-ignore
      <RangePickerInput value={value} onChange={onChange} {...args} />
    );
  };

export const DateRangePickerInputStory: Story = Template(
  DateRangePickerInput,
).bind({});
DateRangePickerInputStory.storyName = 'Date Range Picker Input';
DateRangePickerInputStory.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const DateTimeRangePickerInputStory: Story = Template(
  DateTimeRangePickerInput,
).bind({});
DateTimeRangePickerInputStory.storyName = 'Date Time Range Picker Input';
DateTimeRangePickerInputStory.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const TimeRangePickerInputStory: Story = Template(
  TimeRangePickerInput,
).bind({});
TimeRangePickerInputStory.storyName = 'Time Range Picker Input';
