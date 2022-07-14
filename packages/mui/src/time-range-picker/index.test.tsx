import { TextField } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent, {
  PointerEventsCheckLevel,
} from '@testing-library/user-event';
import { Locale } from '../constant-types';
import { getLocalizedDateFns } from '../date-time-utils';
import {
  DefaultMuiPickerLocalization,
  RangePickerI18nProvider,
} from '../pickers-common';
import {
  TimeRangePicker,
  type Props as TimeRangePickerProps,
} from './px-time-range-picker';

const DefaultDateFns = getLocalizedDateFns();

const renderer = (props: Partial<TimeRangePickerProps> = {}) => {
  const {
    value = { from: null, to: null },
    onChange = () => {},
    ...restProps
  } = props;

  render(
    <DefaultMuiPickerLocalization locale={Locale.defaultLocale}>
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
      />
    </DefaultMuiPickerLocalization>,
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
        from: DefaultDateFns.parse('10:54', 'HH:mm', new Date()),
        to: DefaultDateFns.parse('23:30', 'HH:mm', new Date()),
      },
    });

    expect(fromInput?.value).toBe('۱۰:۵۴ ق.ظ.');
    expect(toInput?.value).toBe('۱۱:۳۰ ب.ظ.');
  });

  it('should call onChange when click on reset', () => {
    const mocked = vi.fn();
    const { resetBtn } = renderer({
      value: {
        from: DefaultDateFns.parse('10:54', 'HH:mm', new Date()),
        to: DefaultDateFns.parse('23:30', 'HH:mm', new Date()),
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

  it('should call onChange when select from time', async () => {
    const mocked = vi.fn();
    const { fromInput } = renderer({
      onChange: mocked,
      value: {
        from: DefaultDateFns.parse('06:54', 'HH:mm', new Date()),
        to: DefaultDateFns.parse('23:30', 'HH:mm', new Date()),
      },
    });

    await userEvent.click(fromInput);

    const time = screen.getByRole('option', { name: /۱۰/ });
    const okBtn = screen.getByRole('button', { name: /انتخاب/ });

    await userEvent.pointer(
      [
        { target: time },
        {
          keys: '[MouseLeft]',
          target: time.parentElement!.parentElement!.firstElementChild!,
        },
      ],
      {
        pointerEventsCheck: PointerEventsCheckLevel.Never,
      },
    );
    await userEvent.click(okBtn);

    expect(mocked).toHaveBeenCalled();
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
        <DefaultMuiPickerLocalization locale={Locale.defaultLocale}>
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
        </DefaultMuiPickerLocalization>
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
