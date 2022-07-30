import { DatePicker, DateTimePicker, TimePicker } from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';

export default {
  title: 'Components/Pickers/Simple Pickers',
  decorators: [calendarDecorator()],
} as Meta;

type PickerComponentTypes =
  | typeof DatePicker
  | typeof DateTimePicker
  | typeof TimePicker;

const Template =
  <P extends PickerComponentTypes>(Picker: P) =>
  (args: Omit<React.ComponentProps<P>, 'value' | 'onChange'>) => {
    const [value, setDateValue] = useState<Date | null>(null); // eslint-disable-line react-hooks/rules-of-hooks

    return (
      // @ts-ignore
      <Picker value={value} onChange={setDateValue} {...args} />
    );
  };

export const DatePickerStory: Story = Template(DatePicker).bind({});
DatePickerStory.storyName = 'Date Picker';
DatePickerStory.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const DateTimePickerStory: Story = Template(DateTimePicker).bind({});
DateTimePickerStory.storyName = 'Date Time Picker';
DateTimePickerStory.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const TimePickerStory: Story = Template(TimePicker).bind({});
TimePickerStory.storyName = 'Time Picker';
