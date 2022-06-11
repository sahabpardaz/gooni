import { Meta, Story } from '@storybook/react';
import * as React from 'react';

import { TimePicker as PxTimePicker, TimePickerProps } from '../..';
import { calendarDecorator } from '../decorators';

export default {
  title: 'Time Picker',
  decorators: [calendarDecorator()],
} as Meta;

export const TimePicker: Story<TimePickerProps<Date>> = ({
  ampm,
  views,
  color,
}) => {
  const [time, setTime] = React.useState<Date | null>(null);

  return (
    <PxTimePicker
      color={color}
      value={time}
      onChange={setTime}
      ampm={ampm}
      views={views}
    />
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
