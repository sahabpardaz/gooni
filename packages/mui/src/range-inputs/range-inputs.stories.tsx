import {
  DateRangeInput as DateRangeInputComponent,
  DateTimeRangeInput as DateTimeRangeInputComponent,
  TimeRange,
  TimeRangeInput as TimeRangeInputComponent,
} from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';

export default {
  title: 'Pickers/Range Inputs',
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

type RangeInputComponentTypes =
  | typeof DateRangeInputComponent
  | typeof DateTimeRangeInputComponent
  | typeof TimeRangeInputComponent;

const templateFactory = <P extends RangeInputComponentTypes>(RangeInput: P) =>
  function WrappedTemplate(
    args: Omit<React.ComponentProps<P>, 'value' | 'onChange'>,
  ) {
    const [value, onChange] = useState<TimeRange>({ to: null, from: null });

    return (
      // @ts-ignore
      <RangeInput value={value} onChange={onChange} {...args} />
    );
  };

export const DateRangeInput: Story = templateFactory(
  DateRangeInputComponent,
).bind({});
DateRangeInput.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const DateTimeRangeInput: Story = templateFactory(
  DateTimeRangeInputComponent,
).bind({});
DateTimeRangeInput.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const TimeRangeInput: Story = templateFactory(
  TimeRangeInputComponent,
).bind({});
