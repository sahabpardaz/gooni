import { Paper, Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Fragment, useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';
import { TimeRange } from 'src/date-time-utils';
import { TimeRangePicker } from './range-pickers';

export default {
  title: 'Time Picker/Time Range Picker',
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

const Template: Story = (args) => {
  const [value, onChange] = useState<TimeRange>({ to: null, from: null });

  return (
    <Fragment>
      <Paper style={{ width: 400, margin: 32 }}>
        <TimeRangePicker value={value} onChange={onChange} {...args} />
      </Paper>

      <Paper style={{ width: 400, margin: 32, padding: 16 }}>
        <Typography variant="body1">From time:</Typography>
        <Typography variant="body2">
          {value.from ? value.from.toISOString() : <br />}
        </Typography>
        <br />
        <Typography variant="body1">To time:</Typography>
        <Typography variant="body2">
          {value.to ? value.to.toISOString() : <br />}
        </Typography>
      </Paper>
    </Fragment>
  );
};

export const PrimaryColor: Story = Template.bind({});
PrimaryColor.args = { color: 'primary' };
