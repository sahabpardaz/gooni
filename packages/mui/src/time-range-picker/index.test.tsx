import * as React from 'react';
import { TextField } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';

import { RangePickerI18nProvider } from '../pickers-common';
import {
  Props as TimeRangePickerProps,
  TimeRangePicker,
} from './px-time-range-picker';
import { moment } from '../date-time-utils';

const renderer = (props: Partial<TimeRangePickerProps> = {}) => {
  const {
    value = { from: null, to: null },
    onChange = () => {},
    ...restProps
  } = props;

  render(
    <TimeRangePicker
      value={value}
      onChange={onChange}
      {...restProps}
      toTimePickerProps={{
        renderInput: (params) => (
          <TextField
            inputProps={{ 'aria-label': 'to input' }}
            InputLabelProps={{ 'aria-label': 'to input label' }}
            {...params}
          />
        ),
      }}
      fromTimePickerProps={{
        renderInput: (params) => (
          <TextField
            inputProps={{ 'aria-label': 'from input' }}
            InputLabelProps={{ 'aria-label': 'from input label' }}
            {...params}
          />
        ),
      }}
    />,
  );

  const [fromInput, toInput] = screen.getAllByRole('textbox') as [
    HTMLInputElement,
    HTMLInputElement,
  ];

  const fromInputLabel = screen.getByLabelText(/from input label/);

  const toInputLabel = screen.getByLabelText(/to input label/);

  const resetBtn = screen.getByTestId(/resetBtn/);

  return { fromInput, toInput, fromInputLabel, toInputLabel, resetBtn };
};

describe('TimeRangePicker', () => {
  it('should render two empty input', () => {
    const { fromInput, toInput } = renderer();

    expect(fromInput?.value).toBe('');
    expect(toInput?.value).toBe('');
  });

  it('should render two input with proper time', () => {
    const { fromInput, toInput } = renderer({
      value: {
        from: moment('10:54', 'HH:mm'),
        to: moment('23:30', 'HH:mm'),
      },
    });

    expect(fromInput?.value).toBe('۱۰:۵۴ قبل از ظهر');
    expect(toInput?.value).toBe('۱۱:۳۰ بعد از ظهر');
  });

  it('should call onChange when click on reset', () => {
    const mocked = jest.fn();
    const { resetBtn } = renderer({
      value: {
        from: moment('10:54', 'HH:mm'),
        to: moment('23:30', 'HH:mm'),
      },
      onChange: mocked,
    });

    fireEvent.click(resetBtn as HTMLButtonElement);

    expect(mocked).toHaveBeenCalledTimes(1);
  });

  it('should override default labels', () => {
    const { fromInputLabel, toInputLabel, resetBtn } = renderer({
      labels: {
        fromLabel: 'from',
        toLabel: 'to',
        resetLabel: 'foo',
      },
    });

    expect(fromInputLabel.textContent).toBe('from');
    expect(toInputLabel.textContent).toBe('to');
    expect(resetBtn.textContent).toBe('foo');
  });

  it('should call onChange when select from time', () => {
    const mocked = jest.fn();
    const { fromInput } = renderer({
      onChange: mocked,
      value: {
        from: moment('06:54', 'HH:mm'),
        to: moment('23:30', 'HH:mm'),
      },
    });

    fireEvent.click(fromInput as HTMLInputElement);

    const time = screen.getByText(/^۱۰$/);
    const okBtn = screen.getByRole('button', { name: /OK/ });

    fireEvent.click(time as HTMLElement);

    fireEvent.click(okBtn as HTMLButtonElement);

    expect(mocked).toHaveBeenCalledTimes(1);
  });

  it('should take labels from provider', () => {
    render(
      <RangePickerI18nProvider
        value={{
          fromLabel: 'start time',
          toLabel: 'end time',
          resetLabel: 'remove times',
        }}
      >
        <TimeRangePicker
          value={{ from: null, to: null }}
          onChange={() => {}}
          toTimePickerProps={{
            renderInput: (params) => (
              <TextField
                inputProps={{ 'aria-label': 'to input' }}
                InputLabelProps={{ 'aria-label': 'to input label' }}
                {...params}
              />
            ),
          }}
          fromTimePickerProps={{
            renderInput: (params) => (
              <TextField
                inputProps={{ 'aria-label': 'to input' }}
                InputLabelProps={{ 'aria-label': 'from input label' }}
                {...params}
              />
            ),
          }}
        />
      </RangePickerI18nProvider>,
    );

    const fromLabel = screen.getByLabelText(/from input label/);
    const toTime = screen.getByLabelText(/to input label/);
    const resetBtn = screen.getByTestId(/resetBtn/);

    expect(fromLabel.textContent).toBe('start time');
    expect(toTime.textContent).toBe('end time');
    expect(resetBtn.textContent).toBe('remove times');
  });
});
