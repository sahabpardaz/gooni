import {
  DatePicker as DatePickerComponent,
  DateTimePicker as DateTimePickerComponent,
  TimePicker as TimePickerComponent,
} from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import React, { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';

export default {
  title: 'Components/Pickers/Simple Pickers',
  decorators: [calendarDecorator()],
} as Meta;

type PickerComponentTypes =
  | typeof DatePickerComponent
  | typeof DateTimePickerComponent
  | typeof TimePickerComponent;

const Template = <P extends PickerComponentTypes>(Picker: P) =>
  function WrappedTemplate(
    args: Omit<React.ComponentProps<P>, 'value' | 'onChange'>,
  ) {
    const [value, setDateValue] = useState<Date | null>(null);

    return (
      // @ts-ignore
      <Picker value={value} onChange={setDateValue} {...args} />
    );
  };

export const DatePicker: Story = Template(DatePickerComponent).bind({});
DatePicker.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const DateTimePicker: Story = Template(DateTimePickerComponent).bind({});
DateTimePicker.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const TimePicker: Story = Template(TimePickerComponent).bind({});
