import {
  DateRangePickerInput as DateRangePickerInputComponent,
  DateTimeRangePickerInput as DateTimeRangePickerInputComponent,
  TimeRange,
  TimeRangePickerInput as TimeRangePickerInputComponent,
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
  | typeof DateRangePickerInputComponent
  | typeof DateTimeRangePickerInputComponent
  | typeof TimeRangePickerInputComponent;

const Template = <P extends RangePickerInputComponentTypes>(
  RangePickerInput: P,
) =>
  function WrappedTemplate(
    args: Omit<React.ComponentProps<P>, 'value' | 'onChange'>,
  ) {
    const [value, onChange] = useState<TimeRange>({ to: null, from: null });

    return (
      // @ts-ignore
      <RangePickerInput value={value} onChange={onChange} {...args} />
    );
  };

export const DateRangePickerInput: Story = Template(
  DateRangePickerInputComponent,
).bind({});
DateRangePickerInput.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const DateTimeRangePickerInput: Story = Template(
  DateTimeRangePickerInputComponent,
).bind({});
DateTimeRangePickerInput.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const TimeRangePickerInput: Story = Template(
  TimeRangePickerInputComponent,
).bind({});
