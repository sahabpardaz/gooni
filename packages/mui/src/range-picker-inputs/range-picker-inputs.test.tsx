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
        localeOptions={[Locale.en, Locale.fa]}
        {...providerProps}
      >
        {/* @ts-ignore */}
        <RangePickerInput value={value} onChange={onChange} {...rest} />
      </MultiLocalizationProvider>,
    );

    const rangePickerInput = screen.getByRole('textbox') as HTMLInputElement;

    return { rangePickerInput };
  };

interface TestType<P extends RangePickerInputComponentTypes> {
  name: string;
  pickerProps?: Partial<React.ComponentProps<P>>;
  providerProps?: Partial<MultiLocalizationProviderProps>;
  expected: string | boolean;
}

interface TestSuiteTableType<P extends RangePickerInputComponentTypes> {
  name: string;
  RangePickerInput: P;
  tests: TestType<P>[];
  multiLocaleTest: TestType<P>;
}

describe.each<TestSuiteTableType<RangePickerInputComponentTypes>>([
  {
    name: 'Date Range Picker Input',
    RangePickerInput: DateRangePickerInput,
    tests: [
      {
        name: 'should render empty input',
        expected: '',
      },
      {
        name: 'should render correct value when there is only from value provided',
        pickerProps: { value: { from: new Date('2022/07/30'), to: null } },
        expected: 'From 1401/05/08',
      },
      {
        name: 'should render correct value when there is only to value provided',
        pickerProps: { value: { from: null, to: new Date('2022/07/30') } },
        expected: 'To 1401/05/08',
      },
      {
        name: 'should render correct value when both from and to are provided',
        pickerProps: {
          value: { from: new Date('2022/07/29'), to: new Date('2022/07/30') },
        },
        expected: 'From 1401/05/07 To 1401/05/08',
      },
      {
        name: 'should take custom label from provider',
        pickerProps: {
          value: { from: new Date('2022/07/29'), to: new Date('2022/07/30') },
        },
        providerProps: {
          localeText: { rangeInputLabels: { from: 'Start', to: 'End' } },
        },
        expected: 'Start 1401/05/07 End 1401/05/08',
      },
      {
        name: 'should render customText from custom label of provider',
        pickerProps: {
          value: { from: new Date('2022/07/29'), to: new Date('2022/07/30') },
        },
        providerProps: {
          localeText: {
            rangeInputLabels: {
              customText: (range) =>
                `Start Range ${formatDate(range.from!)} End Range ${formatDate(
                  range.to!,
                )}`,
            },
          },
        },
        expected: 'Start Range 1401/05/07 End Range 1401/05/08',
      },
    ],
    multiLocaleTest: {
      name: 'should render multi locale toggle buttons when multiLocale is true',
      pickerProps: { multiLocale: true },
      expected: true,
    },
  },
  {
    name: 'Date Time Range Picker Input',
    RangePickerInput: DateTimeRangePickerInput,
    tests: [
      {
        name: 'should render empty input',
        expected: '',
      },
      {
        name: 'should render correct value when there is only from value provided',
        pickerProps: {
          value: { from: new Date('2022-07-30T03:30:00'), to: null },
        },
        expected: 'From 1401/05/08 03:30',
      },
      {
        name: 'should render correct value when there is only to value provided',
        pickerProps: {
          value: { from: null, to: new Date('2022-07-30T03:30:00') },
        },
        expected: 'To 1401/05/08 03:30',
      },
      {
        name: 'should render correct value when both from and to are provided',
        pickerProps: {
          value: {
            from: new Date('2022-07-29T03:30:00'),
            to: new Date('2022-07-30T03:30:00'),
          },
        },
        expected: 'From 1401/05/07 03:30 To 1401/05/08 03:30',
      },
      {
        name: 'should take custom label from provider',
        pickerProps: {
          value: {
            from: new Date('2022-07-29T03:30:00'),
            to: new Date('2022-07-30T03:30:00'),
          },
        },
        providerProps: {
          localeText: { rangeInputLabels: { from: 'Start', to: 'End' } },
        },
        expected: 'Start 1401/05/07 03:30 End 1401/05/08 03:30',
      },
      {
        name: 'should render customText from custom label of provider',
        pickerProps: {
          value: {
            from: new Date('2022-07-29T03:30:00'),
            to: new Date('2022-07-30T03:30:00'),
          },
        },
        providerProps: {
          localeText: {
            rangeInputLabels: {
              customText: (range) =>
                `Start Range ${formatDateTime(
                  range.from!,
                )} End Range ${formatDateTime(range.to!)}`,
            },
          },
        },
        expected: 'Start Range 1401/05/07 03:30 End Range 1401/05/08 03:30',
      },
    ],
    multiLocaleTest: {
      name: 'should render multi locale toggle buttons when multiLocale is true',
      pickerProps: { multiLocale: true },
      expected: true,
    },
  },
  {
    name: 'Time Range Picker Input',
    RangePickerInput: TimeRangePickerInput,
    tests: [
      {
        name: 'should render empty input',
        expected: '',
      },
      {
        name: 'should render correct value when there is only from value provided',
        pickerProps: {
          value: { from: new Date('2022-07-30T03:30:00'), to: null },
        },
        expected: 'From 03:30',
      },
      {
        name: 'should render correct value when there is only to value provided',
        pickerProps: {
          value: { from: null, to: new Date('2022-07-30T03:30:00') },
        },
        expected: 'To 03:30',
      },
      {
        name: 'should render correct value when both from and to are provided',
        pickerProps: {
          value: {
            from: new Date('2022-07-29T03:30:00'),
            to: new Date('2022-07-30T03:40:00'),
          },
        },
        expected: 'From 03:30 To 03:40',
      },
      {
        name: 'should take custom label from provider',
        pickerProps: {
          value: {
            from: new Date('2022-07-29T03:30:00'),
            to: new Date('2022-07-30T03:40:00'),
          },
        },
        providerProps: {
          localeText: { rangeInputLabels: { from: 'Start', to: 'End' } },
        },
        expected: 'Start 03:30 End 03:40',
      },
      {
        name: 'should render customText from custom label of provider',
        pickerProps: {
          value: {
            from: new Date('2022-07-29T03:30:00'),
            to: new Date('2022-07-30T03:40:00'),
          },
        },
        providerProps: {
          localeText: {
            rangeInputLabels: {
              customText: (range) =>
                `Start Range ${formatTime(range.from!)} End Range ${formatTime(
                  range.to!,
                )}`,
            },
          },
        },
        expected: 'Start Range 03:30 End Range 03:40',
      },
    ],
    multiLocaleTest: {
      name: 'should not render multi locale toggle buttons when defaultMultiLocale of provider is true',
      providerProps: { defaultMultiLocale: true },
      expected: false,
    },
  },
])('$name', ({ RangePickerInput, tests, multiLocaleTest }) => {
  const renderer = rendererFactory(RangePickerInput);
  it.each(tests)('$name', ({ pickerProps, providerProps, expected }) => {
    const { rangePickerInput } = renderer(pickerProps, providerProps);

    expect(rangePickerInput.value).toBe(expected);
  });

  it.each([
    { input: 'from', ...multiLocaleTest },
    { input: 'to', ...multiLocaleTest },
  ])(
    '$name ($input input)',
    async ({ input, pickerProps, providerProps, expected }) => {
      const { rangePickerInput } = renderer(pickerProps, providerProps);
      await userEvent.click(rangePickerInput);

      const [, fromInput, toInput] = screen.getAllByRole('textbox');

      await userEvent.click(input === 'from' ? fromInput : toInput);

      let multiLocaleToggleButtonGroup = screen.queryByTestId(
        'multi-locale-toggle-button-group',
      );

      expected
        ? expect(multiLocaleToggleButtonGroup).toBeTruthy()
        : expect(multiLocaleToggleButtonGroup).toBeNull();
    },
  );
});
