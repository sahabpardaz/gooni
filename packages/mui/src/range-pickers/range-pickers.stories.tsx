import { Paper, Typography } from '@mui/material';
import { Meta, Story } from '@storybook/react';
import { Fragment, useState } from 'react';
import { calendarDecorator } from 'src/@storybook/decorators';
import { TimeRange } from 'src/shared/pickers';
import {
  DateRangePicker,
  DateTimeRangePicker,
  TimeRangePicker,
} from './range-pickers';

export default {
  title: 'Components/Pickers/Range Pickers',
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
  | typeof DateRangePicker
  | typeof DateTimeRangePicker
  | typeof TimeRangePicker;

const Template =
  <P extends RangePickerComponentTypes>(RangePicker: P) =>
  (args: Omit<React.ComponentProps<P>, 'value' | 'onChange'>) => {
    const [value, onChange] = useState<TimeRange>({ to: null, from: null }); // eslint-disable-line react-hooks/rules-of-hooks

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

export const DateRangePickerStory: Story = Template(DateRangePicker).bind({});
DateRangePickerStory.storyName = 'Date Range Picker';
DateRangePickerStory.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const DateTimeRangePickerStory: Story = Template(
  DateTimeRangePicker,
).bind({});
DateTimeRangePickerStory.storyName = 'Date Time Range Picker';
DateTimeRangePickerStory.argTypes = {
  multiLocale: {
    control: {
      type: 'boolean',
    },
  },
};

export const TimeRangePickerStory: Story = Template(TimeRangePicker).bind({});
TimeRangePickerStory.storyName = 'Time Range Picker';
