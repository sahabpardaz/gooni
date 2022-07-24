import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';
import { DateTimePicker, DateTimePickerProps } from './pickers';

export default {
  title: 'Date Time Picker/Date Time Picker',
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

const Template = (
  args: Omit<DateTimePickerProps<Date>, 'value' | 'onChange'>,
) => {
  const [value, setDateValue] = useState<Date | null>(null);

  return <DateTimePicker value={value} onChange={setDateValue} {...args} />;
};

export const PrimaryColor: Story = Template.bind({});
PrimaryColor.args = { color: 'primary' };
