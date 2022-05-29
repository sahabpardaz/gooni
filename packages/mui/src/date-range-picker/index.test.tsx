import { fireEvent, render } from '@testing-library/react';
import Moment from 'moment';
import React from 'react';

import { CalendarTypes, LanguageTypes } from '../constant-types';
import { TimeRange } from '../date-time-utils';
import { RangePickerI18nProvider } from '../pickers-common';
import { DateRangePicker, DateRangePickerProps } from './index';

const calenderEnabledDaySelector =
  'button.MuiPickersDay-root:not(.MuiPickersDay-hiddenDaySpacingFiller):not(.Mui-disabled)';
const calenderDisabledDaySelector =
  'button.MuiPickersDay-root:not(.MuiPickersDay-hiddenDaySpacingFiller).Mui-disabled';
const getWrapper = (
  value: TimeRange = { to: null, from: null },
  onChange: Function = () => {},
  props: Omit<DateRangePickerProps, 'value' | 'onChange'> = {},
) => {
  return render(
    <DateRangePicker value={value} onChange={onChange as any} {...props} />,
  );
};
describe('DateRangePicker', () => {
  it('should render two input with proper value', () => {
    const wrapper = getWrapper({
      from: Moment('2018/1/1'),
      to: Moment('2018/1/2'),
    });
    const from = wrapper.queryAllByDisplayValue('۹۶/۱۰/۱۱');
    const to = wrapper.queryAllByDisplayValue('۹۶/۱۰/۱۲');
    expect(from).toHaveLength(1);
    expect(to).toHaveLength(1);
  });

  it('should render msg when beginning is after the end', () => {
    const wrapper = getWrapper({
      to: Moment('2018/1/1'),
      from: Moment('2018/1/2'),
    });
    const result = wrapper.queryAllByText(
      'Date should not be before minimal date',
      { selector: 'p.Mui-error' },
    );
    expect(result).toHaveLength(1);
  });

  it('should call onChange when click on reset', () => {
    const onChange = jest.fn();
    const wrapper = getWrapper(
      {
        from: Moment('2018/1/1'),
        to: Moment('2018/1/2'),
      },
      onChange,
    );

    const reset = wrapper.queryAllByText('Reset', { selector: 'button' });
    fireEvent.click(reset[0] as Element);
    expect(onChange).toHaveBeenCalled();
  });

  it('should override default labels', () => {
    const wrapper = getWrapper(
      {
        from: Moment('2018/1/1'),
        to: Moment('2018/1/2'),
      },
      () => {},
      {
        labels: {
          resetLabel: 'foo',
        },
      },
    );

    const label = wrapper.queryAllByText('foo');
    expect(label).toHaveLength(1);
  });

  it('should render date in gregorian format', () => {
    const wrapper = getWrapper(
      {
        from: Moment('2018/1/1'),
        to: Moment('2018/1/2'),
      },
      () => {},
      {
        localeLanguage: LanguageTypes.en,
        localeCalendar: CalendarTypes.gregorian,
      },
    );

    const from = wrapper.queryAllByDisplayValue('01/01/2018');
    const to = wrapper.queryAllByDisplayValue('01/02/2018');
    expect(from).toHaveLength(1);
    expect(to).toHaveLength(1);
  });

  it('should call onChange when select a datetime in the from part', () => {
    const onChange = jest.fn();
    const wrapper = getWrapper(
      {
        from: Moment('2018/1/1'),
        to: null,
      },
      onChange,
    );

    const from = wrapper.queryAllByDisplayValue('۹۶/۱۰/۱۱');
    fireEvent.click(from[0]);
    const day = wrapper.baseElement.querySelector(calenderEnabledDaySelector);
    fireEvent.click(day as Element);
    expect(onChange).toHaveBeenCalled();
  });

  it('should call onChange when select a datetime in the to part', () => {
    const onChange = jest.fn();
    const wrapper = getWrapper(
      {
        from: Moment('2018/1/1'),
        to: Moment('2018/1/2'),
      },
      onChange,
    );

    const to = wrapper.queryAllByDisplayValue('۹۶/۱۰/۱۲');
    fireEvent.click(to[0]);
    const day = wrapper.baseElement.querySelector(calenderEnabledDaySelector);
    fireEvent.click(day as Element);
    expect(onChange).toHaveBeenCalled();
  });

  it('should render as child in provider', () => {
    const wrapper = render(
      <RangePickerI18nProvider value={{ resetLabel: 'foo' }}>
        <DateRangePicker
          value={{
            from: Moment('2018/1/1'),
            to: Moment('2018/1/2'),
          }}
          onChange={() => {}}
        />
      </RangePickerI18nProvider>,
    );
    const label = wrapper.queryAllByText('foo');
    expect(label).toHaveLength(1);
  });

  it('should show disabled buttons', () => {
    const wrapper = getWrapper({
      from: Moment('2018/1/1'),
      to: Moment('2018/1/5'),
    });

    const from = wrapper.queryAllByDisplayValue('۹۶/۱۰/۱۱');
    fireEvent.click(from[0]);
    const disabledDays = wrapper.baseElement.querySelectorAll(
      calenderDisabledDaySelector,
    );

    expect(disabledDays).toHaveLength(15);
  });
});
