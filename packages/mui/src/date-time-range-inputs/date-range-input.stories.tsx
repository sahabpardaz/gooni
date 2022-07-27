import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';
import { TimeRange } from 'src/shared/pickers';
import { DateRangeInput } from './range-inputs';

export default {
  title: 'Date Picker/Date Range Input',
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

const Template: Story = (args) => {
  const [value, onChange] = useState<TimeRange>({ to: null, from: null });

  return <DateRangeInput value={value} onChange={onChange} {...args} />;
};

export const PrimaryColor: Story = Template.bind({});
PrimaryColor.args = { color: 'primary' };
