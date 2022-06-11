import { render, screen } from '@testing-library/react';

import { TimeRangeInput } from '.';
import { DefaultDateFns } from '../date-time-utils';
import { RangeInputI18nProvider } from '../pickers-common';
import { Props as TimeRangeInputProps } from './px-time-range-input';

type PartialSomeKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
const renderer = (
  props: PartialSomeKeys<TimeRangeInputProps, 'value' | 'onChange'> = {},
) => {
  const {
    value = { from: null, to: null },
    onChange = () => {},
    ...restProps
  } = props;

  render(
    <TimeRangeInput
      variant="outlined"
      value={value}
      onChange={onChange}
      {...restProps}
    />,
  );

  const timeRangeInput = screen.getByRole('textbox') as HTMLInputElement;

  return { timeRangeInput };
};

describe('TimeRangeInput', () => {
  it('should render empty input', () => {
    const { timeRangeInput } = renderer();

    expect(timeRangeInput?.value).toBe('');
  });

  it('should render form time', () => {
    const { timeRangeInput } = renderer({
      value: {
        from: DefaultDateFns.parse('9:30', 'HH:mm', new Date()),
        to: null,
      },
    });

    expect(timeRangeInput?.value).toBe('from 09:30');
  });

  it('should render to time', () => {
    const { timeRangeInput } = renderer({
      value: {
        to: DefaultDateFns.parse('9:30', 'HH:mm', new Date()),
        from: null,
      },
    });

    expect(timeRangeInput?.value).toBe('to 09:30');
  });

  it('should render from time to time', () => {
    const { timeRangeInput } = renderer({
      value: {
        from: DefaultDateFns.parse('09:30', 'HH:mm', new Date()),
        to: DefaultDateFns.parse('22:30', 'HH:mm', new Date()),
      },
    });

    expect(timeRangeInput?.value).toBe('from 09:30 to 22:30');
  });

  it('should render custom text fot from and to from provider', () => {
    render(
      <RangeInputI18nProvider value={{ from: 'az', to: 'ta' }}>
        <TimeRangeInput
          value={{
            from: DefaultDateFns.parse('09:30', 'HH:mm', new Date()),
            to: DefaultDateFns.parse('22:30', 'HH:mm', new Date()),
          }}
          onChange={() => {}}
        />
      </RangeInputI18nProvider>,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input?.value).toBe('az 09:30 ta 22:30');
  });

  it('should render custom text from provider', () => {
    render(
      <RangeInputI18nProvider
        value={{ customText: 'from time 09:00 to time 22:55' }}
      >
        <TimeRangeInput
          value={{
            from: DefaultDateFns.parse('09:30', 'HH:mm', new Date()),
            to: DefaultDateFns.parse('22:30', 'HH:mm', new Date()),
          }}
          onChange={() => {}}
        />
      </RangeInputI18nProvider>,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input?.value).toBe('from time 09:00 to time 22:55');
  });

  it('should render custom text function from provider', () => {
    render(
      <RangeInputI18nProvider
        value={{
          to: 'foo',
          from: 'baz',
          customText: (timeRange) =>
            `You can go from ${DefaultDateFns.format(
              timeRange.from!,
              'HH:mm',
            )} to ${DefaultDateFns.format(timeRange.to!, 'HH:mm')}`,
        }}
      >
        <TimeRangeInput
          value={{
            from: DefaultDateFns.parse('09:30', 'HH:mm', new Date()),
            to: DefaultDateFns.parse('22:30', 'HH:mm', new Date()),
          }}
          onChange={() => {}}
        />
      </RangeInputI18nProvider>,
    );
    const input = screen.getByRole('textbox') as HTMLInputElement;

    expect(input?.value).toBe('You can go from 09:30 to 22:30');
  });
});
