import { Paper, Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Fragment, useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';
import { TimeRange } from 'src/date-time-utils';
import { DateTimeRangePicker } from './range-pickers';

export default {
  title: 'Date Time Picker/Date Time Range Picker',
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

  return (
    <Fragment>
      <Paper style={{ width: 400, margin: 32 }}>
        <DateTimeRangePicker
          value={value}
          onChange={onChange}
          {...args}
          pickerProps={{ hideTabs: true }}
        />
      </Paper>

      <Paper style={{ width: 400, margin: 32, padding: 16 }}>
        <Typography variant="body1">From date:</Typography>
        <Typography variant="body2">
          {value.from ? value.from.toISOString() : <br />}
        </Typography>
        <br />
        <Typography variant="body1">To date:</Typography>
        <Typography variant="body2">
          {value.to ? value.to.toISOString() : <br />}
        </Typography>
      </Paper>
    </Fragment>
  );
};

export const PrimaryColor: Story = Template.bind({});
PrimaryColor.args = { color: 'primary' };
