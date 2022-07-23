import { Paper, Typography } from '@mui/material';
import { DateRangePicker, TimeRange } from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import { Fragment, useState } from 'react';
import { calendarDecorator } from '../decorators';

export default {
  title: 'Date Picker/DateRangePicker',
  decorators: [calendarDecorator()],
} as Meta;

const Template: Story = (args) => {
  const [value, onChange] = useState<TimeRange>({ to: null, from: null });

  return (
    <Fragment>
      <Paper style={{ width: 400, margin: 32 }}>
        <DateRangePicker value={value} onChange={onChange} {...args} />
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

export const SecondaryColor: Story = Template.bind({});
SecondaryColor.args = { color: 'secondary' };
