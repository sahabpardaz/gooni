import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { Moment } from 'moment';
import { TimePicker as PxTimePicker, TimePickerProps } from '@px/mui';

export default {
  title: 'Time Picker',
} as Meta;

export const TimePicker: Story<TimePickerProps> = ({ ampm, views, color }) => {
  const [time, setTime] = React.useState<Moment | null>(null);

  const handleChange = (date: Moment | null) => {
    setTime(date);
  };

  return (
    <PxTimePicker
      color={color}
      value={time}
      onChange={handleChange}
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
