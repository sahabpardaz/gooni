import { Meta } from '@storybook/react';
import Moment from 'moment';
import { useState } from 'react';

import {
  CalendarTypes,
  DatePicker,
  LanguageTypes,
  PickerI18nProvider,
} from '../..';
import { calendarDecorator, useCalendarContext } from '../decorators';

export default {
  title: 'Date Picker',
  decorators: [calendarDecorator()],
} as Meta;

export const Simple = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, setDateValue] = useState<Moment.Moment | null>(
    Moment('2019/1/1'),
  );
  return <DatePicker value={value} onChange={setDateValue} />;
};

export const ColorPrimary = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, setDateValue] = useState<Moment.Moment | null>(
    Moment('2019/1/1'),
  );
  return <DatePicker value={value} onChange={setDateValue} color="primary" />;
};

export const ColorSecondary = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, setDateValue] = useState<Moment.Moment | null>(
    Moment('2019/1/1'),
  );
  return <DatePicker value={value} onChange={setDateValue} />;
};

export const SimpleGregorian = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('en');
  const [value, setDateValue] = useState<Moment.Moment | null>(
    Moment('2019/1/1'),
  );
  return (
    <DatePicker
      value={value}
      onChange={setDateValue}
      localeLanguage={LanguageTypes.en}
      localeCalendar={CalendarTypes.gregorian}
    />
  );
};

export const SimpleWithLabel = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, setDateValue] = useState<Moment.Moment | null>(
    Moment('2019/1/1'),
  );
  return (
    <DatePicker
      value={value}
      localeLanguage={LanguageTypes.fa}
      localeCalendar={CalendarTypes.jalaali}
      onChange={setDateValue}
      {...{
        cancelText: 'کنسل',
        okText: 'انتخاب',
        clearText: 'پاک کردن',
        errorsText: {
          invalidDate: 'تاریخ انتخابی اشتباه است.',
          maxDate: 'تاریخ انتخابی نباید بیشتر از حد مشخص شده باشد.',
          minDate: 'تاریخ انتخابی نباید کمتر از حد مشخص شده باشد.',
        },
      }}
    />
  );
};

export const SimpleWithLabelsPropsAndContext = () => {
  const { changeLanguage } = useCalendarContext();
  changeLanguage('fa');
  const [value, setDateValue] = useState<Moment.Moment | null>(
    Moment('2019/1/1'),
  );
  return (
    <PickerI18nProvider value={{ cancelText: 'لغو کرن' }}>
      <DatePicker
        value={value}
        localeLanguage={LanguageTypes.fa}
        localeCalendar={CalendarTypes.jalaali}
        onChange={setDateValue}
        {...{
          clearText: 'پاک کردن',
          invalidDateMessage: 'تاریخ انتخابی اشتباه است.',
          maxDateMessage: 'تاریخ انتخابی نباید بیشتر از حد مشخص شده باشد.',
          minDateMessage: 'تاریخ انتخابی نباید کمتر از حد مشخص شده باشد.',
        }}
      />
    </PickerI18nProvider>
  );
};
