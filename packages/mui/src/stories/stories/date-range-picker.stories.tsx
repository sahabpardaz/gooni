import React, { Fragment, useState } from 'react';
import { Meta } from '@storybook/react';
import { Paper, Typography } from '@mui/material';

import {
  CalendarTypes,
  DateRangePicker,
  LanguageTypes,
  RangePickerI18nProvider,
  TimeRange,
} from '../..';
import { calendarDecorator, useCalendarContext } from '../decorators';

export default {
  title: 'DateRangePicker',
  decorators: [calendarDecorator()],
} as Meta;

export const JalaaliCalendar = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, onChange] = useState<TimeRange>({ to: null, from: null });

  return (
    <Fragment>
      <Paper style={{ width: 400, margin: 32 }}>
        <DateRangePicker value={value} onChange={onChange} />
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

export const EnglishGregorianCalendar = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('en');
  const [value, onChange] = useState<TimeRange>({ to: null, from: null });
  return (
    <Fragment>
      <Paper style={{ width: 400, margin: 32 }}>
        <DateRangePicker
          value={value}
          onChange={onChange}
          localeCalendar={CalendarTypes.gregorian}
          localeLanguage={LanguageTypes.en}
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

export const JalaaliCalendarWithLabels = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, onChange] = useState<TimeRange>({ to: null, from: null });

  return (
    <RangePickerI18nProvider value={{ resetLabel: 'خالی کردن' }}>
      <Paper style={{ width: 400, margin: 32 }}>
        <DateRangePicker
          value={value}
          onChange={onChange}
          labels={{ fromLabel: 'ابتدا' }}
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
    </RangePickerI18nProvider>
  );
};

export const PrimaryColor = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, onChange] = useState<TimeRange>({ to: null, from: null });

  return (
    <Paper style={{ width: 400, margin: 32 }}>
      <DateRangePicker value={value} onChange={onChange} color="primary" />
    </Paper>
  );
};

export const SecondaryColor = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, onChange] = useState<TimeRange>({ to: null, from: null });

  return (
    <Paper style={{ width: 400, margin: 32 }}>
      <DateRangePicker value={value} onChange={onChange} />
    </Paper>
  );
};
