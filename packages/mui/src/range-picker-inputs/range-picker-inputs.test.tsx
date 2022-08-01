import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Locale } from 'src/constant-types';
import { formatDate, formatDateTime, formatTime } from 'src/date-time-utils';
import {
  DateRangePickerInput,
  DateTimeRangePickerInput,
  TimeRangePickerInput,
} from 'src/range-picker-inputs';
import {
  MultiLocalizationProvider,
  MultiLocalizationProviderProps,
} from 'src/shared/pickers';

type RangePickerInputComponentTypes =
  | typeof DateRangePickerInput
  | typeof DateTimeRangePickerInput
  | typeof TimeRangePickerInput;

const rendererFactory =
  <P extends RangePickerInputComponentTypes>(RangePickerInput: P) =>
  (
    pickerProps: Partial<React.ComponentProps<P>> = {},
    providerProps: Partial<MultiLocalizationProviderProps> = {},
  ) => {
    const {
      value = { from: null, to: null },
      onChange = () => {},
      ...rest
    } = pickerProps;

    render(
      <MultiLocalizationProvider
        localeOptions={[Locale.fa, Locale.en]}
        {...providerProps}
      >
        {/* @ts-ignore */}
        <RangePickerInput value={value} onChange={onChange} {...rest} />
      </MultiLocalizationProvider>,
    );

    const rangePickerInput = screen.getByRole('textbox') as HTMLInputElement;

    return { rangePickerInput };
  };

describe('date range picker input', () => {
  const renderer = rendererFactory(DateRangePickerInput);
  it('should render empty input', () => {
    const { rangePickerInput } = renderer();

    expect(rangePickerInput.value).toBe('');
  });

  it('should render correct value when there is only from value provided', () => {
    const { rangePickerInput } = renderer({
      value: { from: new Date('2022/07/30'), to: null },
    });

    expect(rangePickerInput.value).toBe('از 1401/05/08');
  });

  it('should render correct value when there is only to value provided', () => {
    const { rangePickerInput } = renderer({
      value: { from: null, to: new Date('2022/07/30') },
    });

    expect(rangePickerInput.value).toBe('تا 1401/05/08');
  });

  it('should render correct value when both from and to are provided', () => {
    const { rangePickerInput } = renderer({
      value: { from: new Date('2022/07/29'), to: new Date('2022/07/30') },
    });

    expect(rangePickerInput.value).toBe('از 1401/05/07 تا 1401/05/08');
  });

  it('should take custom label from provider', () => {
    const { rangePickerInput } = renderer(
      { value: { from: new Date('2022/07/29'), to: new Date('2022/07/30') } },
      { localeText: { rangeInputLabels: { from: 'شروع', to: 'پایان' } } },
    );

    expect(rangePickerInput.value).toBe('شروع 1401/05/07 پایان 1401/05/08');
  });

  it('should render customText from custom label of provider', () => {
    const { rangePickerInput } = renderer(
      { value: { from: new Date('2022/07/29'), to: new Date('2022/07/30') } },
      {
        localeText: {
          rangeInputLabels: {
            customText: (range) =>
              `شروع بازه ${formatDate(range.from!)} پایان بازه ${formatDate(
                range.to!,
              )}`,
          },
        },
      },
    );

    expect(rangePickerInput.value).toBe(
      'شروع بازه 1401/05/07 پایان بازه 1401/05/08',
    );
  });

  describe('should render multi locale toggle buttons when multiLocale is true', () => {
    it('on from input', async () => {
      const { rangePickerInput } = renderer({ multiLocale: true });
      await userEvent.click(rangePickerInput);

      const [, fromInput] = screen.getAllByRole('textbox') as [
        HTMLInputElement,
        HTMLInputElement,
        HTMLInputElement,
      ];

      await userEvent.click(fromInput);

      let fromMultiLocaleToggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(fromMultiLocaleToggleButtonGroup).toBeTruthy();
    });

    it('on to input', async () => {
      const { rangePickerInput } = renderer({ multiLocale: true });
      await userEvent.click(rangePickerInput);

      const [, , toInput] = screen.getAllByRole('textbox') as [
        HTMLInputElement,
        HTMLInputElement,
        HTMLInputElement,
      ];

      await userEvent.click(toInput);

      let toMultiLocaleToggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(toMultiLocaleToggleButtonGroup).toBeTruthy();
    });
  });
});

describe('date time range picker input', () => {
  const renderer = rendererFactory(DateTimeRangePickerInput);
  it('should render empty input', () => {
    const { rangePickerInput } = renderer();

    expect(rangePickerInput.value).toBe('');
  });

  it('should render correct value when there is only from value provided', () => {
    const { rangePickerInput } = renderer({
      value: { from: new Date('2022-07-30T03:30:00'), to: null },
    });

    expect(rangePickerInput.value).toBe('از 1401/05/08 03:30');
  });

  it('should render correct value when there is only to value provided', () => {
    const { rangePickerInput } = renderer({
      value: { from: null, to: new Date('2022-07-30T03:30:00') },
    });

    expect(rangePickerInput.value).toBe('تا 1401/05/08 03:30');
  });

  it('should render correct value when both from and to are provided', () => {
    const { rangePickerInput } = renderer({
      value: {
        from: new Date('2022-07-29T03:30:00'),
        to: new Date('2022-07-30T03:30:00'),
      },
    });

    expect(rangePickerInput.value).toBe(
      'از 1401/05/07 03:30 تا 1401/05/08 03:30',
    );
  });

  it('should take custom label from provider', () => {
    const { rangePickerInput } = renderer(
      {
        value: {
          from: new Date('2022-07-29T03:30:00'),
          to: new Date('2022-07-30T03:30:00'),
        },
      },
      { localeText: { rangeInputLabels: { from: 'شروع', to: 'پایان' } } },
    );

    expect(rangePickerInput.value).toBe(
      'شروع 1401/05/07 03:30 پایان 1401/05/08 03:30',
    );
  });

  it('should render customText from custom label of provider', () => {
    const { rangePickerInput } = renderer(
      {
        value: {
          from: new Date('2022-07-29T03:30:00'),
          to: new Date('2022-07-30T03:30:00'),
        },
      },
      {
        localeText: {
          rangeInputLabels: {
            customText: (range) =>
              `شروع بازه ${formatDateTime(
                range.from!,
              )} پایان بازه ${formatDateTime(range.to!)}`,
          },
        },
      },
    );

    expect(rangePickerInput.value).toBe(
      'شروع بازه 1401/05/07 03:30 پایان بازه 1401/05/08 03:30',
    );
  });

  describe('should render multi locale toggle buttons when multiLocale is true', () => {
    it('on from input', async () => {
      const { rangePickerInput } = renderer({ multiLocale: true });
      await userEvent.click(rangePickerInput);

      const [, fromInput] = screen.getAllByRole('textbox') as [
        HTMLInputElement,
        HTMLInputElement,
        HTMLInputElement,
      ];

      await userEvent.click(fromInput);

      let fromMultiLocaleToggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(fromMultiLocaleToggleButtonGroup).toBeTruthy();
    });

    it('on to input', async () => {
      const { rangePickerInput } = renderer({ multiLocale: true });
      await userEvent.click(rangePickerInput);

      const [, , toInput] = screen.getAllByRole('textbox') as [
        HTMLInputElement,
        HTMLInputElement,
        HTMLInputElement,
      ];

      await userEvent.click(toInput);

      let toMultiLocaleToggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(toMultiLocaleToggleButtonGroup).toBeTruthy();
    });
  });
});

describe('time range picker input', () => {
  const renderer = rendererFactory(TimeRangePickerInput);
  it('should render empty input', () => {
    const { rangePickerInput } = renderer();

    expect(rangePickerInput.value).toBe('');
  });

  it('should render correct value when there is only from value provided', () => {
    const { rangePickerInput } = renderer({
      value: { from: new Date('2022-07-30T03:30:00'), to: null },
    });

    expect(rangePickerInput.value).toBe('از 03:30');
  });

  it('should render correct value when there is only to value provided', () => {
    const { rangePickerInput } = renderer({
      value: { from: null, to: new Date('2022-07-30T03:30:00') },
    });

    expect(rangePickerInput.value).toBe('تا 03:30');
  });

  it('should render correct value when both from and to are provided', () => {
    const { rangePickerInput } = renderer({
      value: {
        from: new Date('2022-07-29T03:30:00'),
        to: new Date('2022-07-30T03:30:00'),
      },
    });

    expect(rangePickerInput.value).toBe('از 03:30 تا 03:30');
  });

  it('should take custom label from provider', () => {
    const { rangePickerInput } = renderer(
      {
        value: {
          from: new Date('2022-07-29T03:30:00'),
          to: new Date('2022-07-30T03:30:00'),
        },
      },
      { localeText: { rangeInputLabels: { from: 'شروع', to: 'پایان' } } },
    );

    expect(rangePickerInput.value).toBe('شروع 03:30 پایان 03:30');
  });

  it('should render customText from custom label of provider', () => {
    const { rangePickerInput } = renderer(
      {
        value: {
          from: new Date('2022-07-29T03:30:00'),
          to: new Date('2022-07-30T03:30:00'),
        },
      },
      {
        localeText: {
          rangeInputLabels: {
            customText: (range) =>
              `شروع بازه ${formatTime(range.from!)} پایان بازه ${formatTime(
                range.to!,
              )}`,
          },
        },
      },
    );

    expect(rangePickerInput.value).toBe('شروع بازه 03:30 پایان بازه 03:30');
  });

  describe('should render multi locale toggle buttons when defaultMultiLocale of provider is true', () => {
    it('on from input', async () => {
      const { rangePickerInput } = renderer({}, { defaultMultiLocale: true });
      await userEvent.click(rangePickerInput);

      const [, fromInput] = screen.getAllByRole('textbox') as [
        HTMLInputElement,
        HTMLInputElement,
        HTMLInputElement,
      ];

      await userEvent.click(fromInput);

      let fromMultiLocaleToggleButtonGroup = screen.queryByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(fromMultiLocaleToggleButtonGroup).toBeNull();
    });

    it('on to input', async () => {
      const { rangePickerInput } = renderer({}, { defaultMultiLocale: true });
      await userEvent.click(rangePickerInput);

      const [, , toInput] = screen.getAllByRole('textbox') as [
        HTMLInputElement,
        HTMLInputElement,
        HTMLInputElement,
      ];

      await userEvent.click(toInput);

      let toMultiLocaleToggleButtonGroup = screen.queryByTestId(
        'multi-locale-toggle-button-group',
      );

      expect(toMultiLocaleToggleButtonGroup).toBeNull();
    });
  });
});
