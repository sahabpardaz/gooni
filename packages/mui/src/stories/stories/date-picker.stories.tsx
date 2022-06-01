import { Meta, Story } from '@storybook/react';
import { DateTime } from 'luxon';
import { useState } from 'react';
import { DatePicker, DatePickerProps } from '../..';
import { calendarDecorator } from '../decorators';

export default {
  title: 'Date Picker/Date Picker',
  decorators: [calendarDecorator()],
} as Meta;

const Template = (
  args: Omit<DatePickerProps<DateTime>, 'value' | 'onChange'>,
) => {
  const [value, setDateValue] = useState<DateTime | null>(
    DateTime.fromISO('2019/1/1'),
  );
  return <DatePicker value={value} onChange={setDateValue} {...args} />;
};

export const ColorPrimary: Story = Template.bind({});
ColorPrimary.args = { color: 'primary' };

export const ColorSecondary: Story = Template.bind({});
ColorPrimary.args = { color: 'secondary' };

export const EnglishCalender: Story = Template.bind({});
EnglishCalender.decorators = [calendarDecorator('en')];

export const PersianCalender: Story = Template.bind({});
PersianCalender.decorators = [calendarDecorator('fa')];
