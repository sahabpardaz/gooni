import { TextField } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Locale } from 'src/constant-types';
import {
  DateRangePicker,
  DateTimeRangePicker,
  TimeRangePicker,
} from 'src/range-pickers';
import {
  MultiLocalizationProvider,
  MultiLocalizationProviderProps,
} from 'src/shared/pickers';

type RangePickerComponentTypes =
  | typeof DateRangePicker
  | typeof DateTimeRangePicker
  | typeof TimeRangePicker;

const rendererFactory =
  <P extends RangePickerComponentTypes>(RangePicker: P) =>
  (
    pickerProps: Partial<React.ComponentProps<P>> = {},
    providerProps: Partial<MultiLocalizationProviderProps> = {},
  ) => {
    const {
      value = { from: null, to: null },
      onChange = () => {},
      fromPickerProps,
      toPickerProps,
      ...rest
    } = pickerProps;

    render(
      <MultiLocalizationProvider
        localeOptions={[Locale.fa, Locale.en]}
        {...providerProps}
      >
        {/* @ts-ignore */}
        <RangePicker
          value={value}
          onChange={onChange}
          fromPickerProps={{
            renderInput: (params) => (
              <TextField
                InputLabelProps={{ 'aria-label': 'from input label' }}
                {...params}
              />
            ),
            ...fromPickerProps,
          }}
          toPickerProps={{
            renderInput: (params) => (
              <TextField
                InputLabelProps={{ 'aria-label': 'to input label' }}
                {...params}
              />
            ),
            ...toPickerProps,
          }}
          {...rest}
        />
      </MultiLocalizationProvider>,
    );

    const [fromInput, toInput] = screen.getAllByRole('textbox') as [
      HTMLInputElement,
      HTMLInputElement,
    ];

    const fromLabel = screen.getByLabelText(/from input label/);
    const toLabel = screen.getByLabelText(/to input label/);
    const resetBtn = screen.getByTestId(/resetBtn/) as HTMLButtonElement;

    return { fromInput, toInput, fromLabel, toLabel, resetBtn };
  };

describe('date range picker', () => {
  const renderer = rendererFactory(DateRangePicker);
  it('should render two empty inputs', () => {
    const { fromInput, toInput } = renderer();

    expect(fromInput?.value).toBe('');
    expect(toInput?.value).toBe('');
  });

  it('should render two input with proper date', () => {
    const { fromInput, toInput } = renderer({
      value: {
        from: new Date('2022/07/30'),
        to: new Date('2022/07/31'),
      },
    });

    expect(fromInput?.value).toBe('۱۴۰۱/۰۵/۰۸');
    expect(toInput?.value).toBe('۱۴۰۱/۰۵/۰۹');
  });

  it('should call onChange when click on reset & reset input values', async () => {
    const mocked = vi.fn();
    const { resetBtn } = renderer({
      value: {
        from: new Date('2022/07/30'),
        to: new Date('2022/07/31'),
      },
      onChange: mocked,
    });

    await userEvent.click(resetBtn);

    expect(mocked).toHaveBeenCalledTimes(1);
    expect(mocked).toHaveBeenCalledWith({ from: null, to: null });
  });

  it('should take labels from provider', () => {
    const { fromLabel, toLabel, resetBtn } = renderer();

    expect(fromLabel.textContent).toBe('از تاریخ');
    expect(toLabel.textContent).toBe('تا تاریخ');
    expect(resetBtn.textContent).toBe('بازنشانی');
  });

  it('should take overrided labels from provider', () => {
    const { fromLabel, toLabel, resetBtn } = renderer(
      {},
      {
        localeText: {
          rangePickerLabels: {
            fromLabel: (pickerType) => 'تاریخ شروع',
            toLabel: (pickerType) => 'تاریخ پایان',
            resetLabel: 'حذف ورودی‌ها',
          },
        },
      },
    );

    expect(fromLabel.textContent).toBe('تاریخ شروع');
    expect(toLabel.textContent).toBe('تاریخ پایان');
    expect(resetBtn.textContent).toBe('حذف ورودی‌ها');
  });

  it('should render invalid input when beginning is after the end', async () => {
    const { fromInput, toInput } = renderer({
      value: { from: new Date('2022/07/30'), to: new Date('2022/07/29') },
    });

    expect(fromInput).toBeInvalid();
    expect(toInput).toBeInvalid();
  });

  describe('should render multi locale toggle buttons when multiLocale is true', () => {
    it('on from input', async () => {
      const { fromInput } = renderer({ multiLocale: true });
      await userEvent.click(fromInput);

      let fromMultiLocaleToggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(fromMultiLocaleToggleButtonGroup).toBeTruthy();
    });
    it('on to input', async () => {
      const { toInput } = renderer({ multiLocale: true });
      await userEvent.click(toInput);

      let toMultiLocaleToggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(toMultiLocaleToggleButtonGroup).toBeTruthy();
    });
  });
});

describe('date time range picker', () => {
  const renderer = rendererFactory(DateTimeRangePicker);
  it('should render two empty inputs', () => {
    const { fromInput, toInput } = renderer();

    expect(fromInput?.value).toBe('');
    expect(toInput?.value).toBe('');
  });

  it('should render two input with proper date', () => {
    const { fromInput, toInput } = renderer({
      value: {
        from: new Date('2022-07-30T03:30:00'),
        to: new Date('2022-07-31T04:30:00'),
      },
    });

    expect(fromInput?.value).toBe('۱۴۰۱/۰۵/۰۸ ۰۳:۳۰ ق.ظ.');
    expect(toInput?.value).toBe('۱۴۰۱/۰۵/۰۹ ۰۴:۳۰ ق.ظ.');
  });

  it('should call onChange when click on reset & reset input values', async () => {
    const mocked = vi.fn();
    const { resetBtn } = renderer({
      value: {
        from: new Date('2022-07-30T03:30:00'),
        to: new Date('2022-07-30T03:31:00'),
      },
      onChange: mocked,
    });

    await userEvent.click(resetBtn);

    expect(mocked).toHaveBeenCalledTimes(1);
    expect(mocked).toHaveBeenCalledWith({ from: null, to: null });
  });

  it('should take labels from provider', () => {
    const { fromLabel, toLabel, resetBtn } = renderer();

    expect(fromLabel.textContent).toBe('از تاریخ');
    expect(toLabel.textContent).toBe('تا تاریخ');
    expect(resetBtn.textContent).toBe('بازنشانی');
  });

  it('should take overrided labels from provider', () => {
    const { fromLabel, toLabel, resetBtn } = renderer(
      {},
      {
        localeText: {
          rangePickerLabels: {
            fromLabel: (pickerType) => 'تاریخ شروع',
            toLabel: (pickerType) => 'تاریخ پایان',
            resetLabel: 'حذف ورودی‌ها',
          },
        },
      },
    );

    expect(fromLabel.textContent).toBe('تاریخ شروع');
    expect(toLabel.textContent).toBe('تاریخ پایان');
    expect(resetBtn.textContent).toBe('حذف ورودی‌ها');
  });

  it('should render invalid input when beginning is after the end', async () => {
    const { fromInput, toInput } = renderer({
      value: {
        from: new Date('2022-07-30T03:30:00'),
        to: new Date('2022-07-30T03:29:00'),
      },
    });

    expect(fromInput).toBeInvalid();
    expect(toInput).toBeInvalid();
  });

  describe('should render multi locale toggle buttons when multiLocale is true', () => {
    it('on from input', async () => {
      const { fromInput } = renderer({ multiLocale: true });
      await userEvent.click(fromInput);

      let fromMultiLocaleToggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(fromMultiLocaleToggleButtonGroup).toBeTruthy();
    });
    it('on to input', async () => {
      const { toInput } = renderer({ multiLocale: true });
      await userEvent.click(toInput);

      let toMultiLocaleToggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(toMultiLocaleToggleButtonGroup).toBeTruthy();
    });
  });
});

describe('time range picker', () => {
  const renderer = rendererFactory(TimeRangePicker);
  it('should render two empty inputs', () => {
    const { fromInput, toInput } = renderer();

    expect(fromInput?.value).toBe('');
    expect(toInput?.value).toBe('');
  });

  it('should render two input with proper date', () => {
    const { fromInput, toInput } = renderer({
      value: {
        from: new Date('2022-07-30T03:30:00'),
        to: new Date('2022-07-30T04:30:00'),
      },
    });

    expect(fromInput?.value).toBe('۰۳:۳۰ ق.ظ.');
    expect(toInput?.value).toBe('۰۴:۳۰ ق.ظ.');
  });

  it('should call onChange when click on reset & reset input values', async () => {
    const mocked = vi.fn();
    const { resetBtn } = renderer({
      value: {
        from: new Date('2022-07-30T03:30:00'),
        to: new Date('2022-07-30T03:31:00'),
      },
      onChange: mocked,
    });

    await userEvent.click(resetBtn);

    expect(mocked).toHaveBeenCalledTimes(1);
    expect(mocked).toHaveBeenCalledWith({ from: null, to: null });
  });

  it('should take labels from provider', () => {
    const { fromLabel, toLabel, resetBtn } = renderer();

    expect(fromLabel.textContent).toBe('از زمان');
    expect(toLabel.textContent).toBe('تا زمان');
    expect(resetBtn.textContent).toBe('بازنشانی');
  });

  it('should take overrided labels from provider', () => {
    const { fromLabel, toLabel, resetBtn } = renderer(
      {},
      {
        localeText: {
          rangePickerLabels: {
            fromLabel: (pickerType) => 'زمان شروع',
            toLabel: (pickerType) => 'زمان پایان',
            resetLabel: 'حذف ورودی‌ها',
          },
        },
      },
    );

    expect(fromLabel.textContent).toBe('زمان شروع');
    expect(toLabel.textContent).toBe('زمان پایان');
    expect(resetBtn.textContent).toBe('حذف ورودی‌ها');
  });

  it('should render invalid input when beginning is after the end', async () => {
    const { fromInput, toInput } = renderer({
      value: {
        from: new Date('2022-07-30T03:30:00'),
        to: new Date('2022-07-30T03:29:00'),
      },
    });

    expect(fromInput).toBeInvalid();
    expect(toInput).toBeInvalid();
  });

  describe('should render multi locale toggle buttons when defaultMultiLocale of provider is true', () => {
    it('on from input', async () => {
      const { fromInput } = renderer({}, { defaultMultiLocale: true });
      await userEvent.click(fromInput);

      let fromMultiLocaleToggleButtonGroup = screen.queryByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(fromMultiLocaleToggleButtonGroup).toBeNull();
    });
    it('on to input', async () => {
      const { toInput } = renderer({}, { defaultMultiLocale: true });
      await userEvent.click(toInput);

      let toMultiLocaleToggleButtonGroup = screen.queryByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(toMultiLocaleToggleButtonGroup).toBeNull();
    });
  });
});
