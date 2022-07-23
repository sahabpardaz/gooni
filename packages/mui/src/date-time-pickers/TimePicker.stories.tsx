import {
  ThemeColorSwapper,
  ThemeColorSwapperProps,
  TimePicker as PxTimePicker,
  TimePickerProps,
} from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';

export default {
  title: 'Time Picker',
  decorators: [calendarDecorator()],
} as Meta;

export const TimePicker: Story<
  TimePickerProps<Date> & ThemeColorSwapperProps
> = ({ ampm, views, color }) => {
  const [time, setTime] = React.useState<Date | null>(null);

  return (
    <ThemeColorSwapper color={color}>
      <PxTimePicker value={time} onChange={setTime} ampm={ampm} views={views} />
    </ThemeColorSwapper>
  );
};

TimePicker.argTypes = {
  ampm: {
    control: 'boolean',
    defaultValue: false,
  },
  views: {
    defaultValue: ['hours', 'minutes'],
    options: ['hours', 'minutes', 'seconds'],
    control: {
      type: 'inline-check',
    },
  },
  color: {
    defaultValue: 'primary',
    options: ['primary', 'secondary'],
    control: {
      type: 'inline-radio',
    },
  },
};
