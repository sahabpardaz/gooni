import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';
import { TimePicker, TimePickerProps } from './pickers';

export default {
  title: 'Time Picker/Time Picker',
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

const Template = (args: Omit<TimePickerProps<Date>, 'value' | 'onChange'>) => {
  const [value, setDateValue] = useState<Date | null>(null);

  return <TimePicker value={value} onChange={setDateValue} {...args} />;
};

export const PrimaryColor: Story = Template.bind({});
PrimaryColor.args = { color: 'primary' };
