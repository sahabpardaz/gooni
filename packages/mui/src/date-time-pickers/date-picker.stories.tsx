import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';
import { DatePicker, DatePickerProps } from './pickers';

export default {
  title: 'Date Picker/Date Picker',
  decorators: [calendarDecorator()],
  argTypes: {
    color: {
      defaultValue: 'primary',
      options: ['primary', 'secondary'],
      control: {
        type: 'inline-radio',
      },
    },
    multiLocale: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template = (args: Omit<DatePickerProps<Date>, 'value' | 'onChange'>) => {
  const [value, setDateValue] = useState<Date | null>(null);

  return <DatePicker value={value} onChange={setDateValue} {...args} />;
};

export const PrimaryColor: Story = Template.bind({});
PrimaryColor.args = { color: 'primary' };
