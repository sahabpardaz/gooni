import DateFnsJalaliAdapter from '@date-io/date-fns-jalali';
import { LocalizationProvider, PickersLocaleText } from '@mui/x-date-pickers';
import { DatePicker, DatePickerProps } from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import { parseISO } from 'date-fns-jalali';
import { useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';

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
  const [value, setDateValue] = useState<Date | null>(parseISO('2019/1/1'));
  return <DatePicker value={value} onChange={setDateValue} {...args} />;
};

export const SimpleCalender: Story = Template.bind({});

export const CustomLocalization: Story<
  Omit<DatePickerProps<Date>, 'value' | 'onChange'> &
    Record<keyof PickersLocaleText<unknown>, string>
> = (args) => {
  const { okButtonLabel } = args;
  const [value, setDateValue] = useState<Date | null>(parseISO('2019/1/1'));
  return (
    <LocalizationProvider
      dateAdapter={DateFnsJalaliAdapter}
      localeText={{
        errors: { invalidDate: 'اشتباه انتخاب کردی' },
        okButtonLabel,
      }}
    >
      <DatePicker value={value} onChange={setDateValue} {...args} />
    </LocalizationProvider>
  );
};
CustomLocalization.argTypes = {
  okButtonLabel: {
    defaultValue: 'حله',
    type: 'string',
  },
};
