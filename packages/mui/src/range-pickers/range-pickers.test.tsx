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
  RangePickerLabels,
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
        localeOptions={[Locale.en, Locale.fa]}
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
    const resetBtn = screen.getByTestId(/reset-btn/) as HTMLButtonElement;

    return { fromInput, toInput, fromLabel, toLabel, resetBtn };
  };

interface TestType<P extends RangePickerComponentTypes> {
  name: string;
  pickerProps?: Partial<React.ComponentProps<P>>;
  providerProps?: Partial<MultiLocalizationProviderProps>;
  expected: string | boolean;
}

interface TestSuiteTableType<P extends RangePickerComponentTypes> {
  name: string;
  RangePicker: P;
  inputs: { value: Date; text: string }[];
  defaultLabels: RangePickerLabels;
  customLabels: RangePickerLabels;
  multiLocaleTest: TestType<P>;
}

describe.each<TestSuiteTableType<RangePickerComponentTypes>>([
  {
    name: 'Date Range Picker',
    RangePicker: DateRangePicker,
    inputs: [
      {
        value: new Date('2022/07/30'),
        text: '07/30/2022',
      },
      {
        value: new Date('2022/07/31'),
        text: '07/31/2022',
      },
    ],
    defaultLabels: {
      fromLabel: 'From date',
      toLabel: 'To date',
      resetLabel: 'RESET',
    },
    customLabels: {
      fromLabel: 'Start Date',
      toLabel: 'End Date',
      resetLabel: 'Remove Inputs',
    },
    multiLocaleTest: {
      name: 'should render multi locale toggle buttons when multiLocale is true',
      pickerProps: { multiLocale: true },
      providerProps: {},
      expected: true,
    },
  },
  {
    name: 'Date Time Range Picker',
    RangePicker: DateTimeRangePicker,
    inputs: [
      {
        value: new Date('2022-07-30T03:30:00'),
        text: '07/30/2022 03:30 am',
      },
      {
        value: new Date('2022-07-31T04:30:00'),
        text: '07/31/2022 04:30 am',
      },
    ],
    defaultLabels: {
      fromLabel: 'From datetime',
      toLabel: 'To datetime',
      resetLabel: 'RESET',
    },
    customLabels: {
      fromLabel: 'Start Datetime',
      toLabel: 'End Datetime',
      resetLabel: 'Remove Inputs',
    },
    multiLocaleTest: {
      name: 'should render multi locale toggle buttons when multiLocale is true',
      pickerProps: { multiLocale: true },
      providerProps: {},
      expected: true,
    },
  },
  {
    name: 'Time Range Picker',
    RangePicker: TimeRangePicker,
    inputs: [
      {
        value: new Date('2022-07-30T03:30:00'),
        text: '03:30 am',
      },
      {
        value: new Date('2022-07-31T04:30:00'),
        text: '04:30 am',
      },
    ],
    defaultLabels: {
      fromLabel: 'From time',
      toLabel: 'To time',
      resetLabel: 'RESET',
    },
    customLabels: {
      fromLabel: 'Start Time',
      toLabel: 'End Time',
      resetLabel: 'Remove Inputs',
    },
    multiLocaleTest: {
      name: 'should not render multi locale toggle buttons when defaultMultiLocale of provider is true',
      pickerProps: {},
      providerProps: { defaultMultiLocale: true },
      expected: false,
    },
  },
])(
  '$name',
  ({ RangePicker, inputs, defaultLabels, customLabels, multiLocaleTest }) => {
    const renderer = rendererFactory(RangePicker);

    it('should render two empty inputs', () => {
      const { fromInput, toInput } = renderer();

      expect(fromInput?.value).toBe('');
      expect(toInput?.value).toBe('');
    });

    it('should render two input with proper text', () => {
      const { fromInput, toInput } = renderer({
        value: {
          from: inputs[0].value,
          to: inputs[1].value,
        },
      });

      expect(fromInput?.value).toBe(inputs[0].text);
      expect(toInput?.value).toBe(inputs[1].text);
    });

    it('should call onChange when click on reset & reset input values', async () => {
      const mocked = vi.fn();
      const { resetBtn } = renderer({
        value: {
          from: inputs[0].value,
          to: inputs[1].value,
        },
        onChange: mocked,
      });

      await userEvent.click(resetBtn);

      expect(mocked).toHaveBeenCalledTimes(1);
      expect(mocked).toHaveBeenCalledWith({ from: null, to: null });
    });

    it('should take labels from provider', () => {
      const { fromLabel, toLabel, resetBtn } = renderer();

      expect(fromLabel.textContent).toBe(defaultLabels.fromLabel);
      expect(toLabel.textContent).toBe(defaultLabels.toLabel);
      expect(resetBtn.textContent).toBe(defaultLabels.resetLabel);
    });

    it('should take overrided labels from provider', () => {
      const { fromLabel, toLabel, resetBtn } = renderer(
        {},
        {
          localeText: {
            rangePickerLabels: customLabels,
          },
        },
      );

      expect(fromLabel.textContent).toBe(customLabels.fromLabel);
      expect(toLabel.textContent).toBe(customLabels.toLabel);
      expect(resetBtn.textContent).toBe(customLabels.resetLabel);
    });

    it('should render invalid input when beginning is after the end', async () => {
      const { fromInput, toInput } = renderer({
        value: { from: inputs[1].value, to: inputs[0].value },
      });

      expect(fromInput).toBeInvalid();
      expect(toInput).toBeInvalid();
    });

    it.each([
      { input: 'from', ...multiLocaleTest },
      { input: 'to', ...multiLocaleTest },
    ])(
      '$name ($input input)',
      async ({ input, pickerProps, providerProps, expected }) => {
        const { fromInput, toInput } = renderer(pickerProps, providerProps);
        await userEvent.click(input === 'from' ? fromInput : toInput);

        let multiLocaleToggleButtonGroup = screen.queryByTestId(
          'multi-locale-toggle-button-group',
        );

        expected
          ? expect(multiLocaleToggleButtonGroup).toBeTruthy()
          : expect(multiLocaleToggleButtonGroup).toBeNull();
      },
    );
  },
);
