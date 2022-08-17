import { Paper, Typography } from '@mui/material';
import {
  DateRangePicker as DateRangePickerComponent,
  DateTimeRangePicker as DateTimeRangePickerComponent,
  TimeRange,
  TimeRangePicker as TimeRangePickerComponent,
} from '@my-sahab/mui';
import { Meta, Story } from '@storybook/react';
import { Fragment, useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';

export default {
  title: 'Pickers/Range Pickers',
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

type RangePickerComponentTypes =
  | typeof DateRangePickerComponent
  | typeof DateTimeRangePickerComponent
  | typeof TimeRangePickerComponent;

const templateFactory = <P extends RangePickerComponentTypes>(RangePicker: P) =>
  function WrappedTemplate(
    args: Omit<React.ComponentProps<P>, 'value' | 'onChange'>,
  ) {
    const [value, onChange] = useState<TimeRange>({ to: null, from: null });

    return (
      <Fragment>
        <Paper style={{ width: 400, margin: 32 }}>
          {/* @ts-ignore */}
          <RangePicker value={value} onChange={onChange} {...args} />
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

export const DateRangePicker: Story = templateFactory(
  DateRangePickerComponent,
).bind({});
DateRangePicker.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const DateTimeRangePicker: Story = templateFactory(
  DateTimeRangePickerComponent,
).bind({});
DateTimeRangePicker.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const TimeRangePicker: Story = templateFactory(
  TimeRangePickerComponent,
).bind({});
