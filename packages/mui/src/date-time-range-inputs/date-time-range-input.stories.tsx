import { Meta, Story } from '@storybook/react';
import { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';
import { TimeRange } from 'src/shared/pickers';
import { DateTimeRangeInput } from './range-inputs';

export default {
  title: 'Date Time Picker/Date Time Range Input',
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

  return <DateTimeRangeInput value={value} onChange={onChange} {...args} />;
};

export const PrimaryColor: Story = Template.bind({});
PrimaryColor.args = { color: 'primary' };
