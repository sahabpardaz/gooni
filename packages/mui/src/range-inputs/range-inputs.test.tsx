import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Locale } from 'src/constant-types';
import { formatDate, formatDateTime, formatTime } from 'src/date-time-utils';
import {
  DateRangeInput,
  DateTimeRangeInput,
  TimeRangeInput,
} from 'src/range-inputs';
import {
  MultiLocalizationProvider,
  MultiLocalizationProviderProps,
} from 'src/shared/pickers';

type RangeInputComponentTypes =
  | typeof DateRangeInput
  | typeof DateTimeRangeInput
  | typeof TimeRangeInput;

const rendererFactory =
  <P extends RangeInputComponentTypes>(RangeInput: P) =>
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
        <RangeInput value={value} onChange={onChange} {...rest} />
      </MultiLocalizationProvider>,
    );

    const rangeInput = screen.getByRole('textbox') as HTMLInputElement;

    return { rangeInput };
  };

interface TestType {
  name: string;
  pickerProps: Partial<React.ComponentProps<RangeInputComponentTypes>>;
  providerProps: Partial<MultiLocalizationProviderProps>;
  expected: string | boolean;
}

interface TestSuiteTableType {
  name: string;
  RangeInput: RangeInputComponentTypes;
  tests: TestType[];
  multiLocaleTest: TestType;
}

const dateRangeInputTests: TestType[] = [
  {
    name: 'should render empty input',
    pickerProps: {},
    providerProps: {},
    expected: '',
  },
  {
    name: 'should render correct value when there is only from value provided',
    pickerProps: { value: { from: new Date('2022/07/30'), to: null } },
    providerProps: {},
    expected: 'From 1401/05/08',
  },
  {
    name: 'should render correct value when there is only to value provided',
    pickerProps: { value: { from: null, to: new Date('2022/07/30') } },
    providerProps: {},
    expected: 'To 1401/05/08',
  },
  {
    name: 'should render correct value when both from and to are provided',
    pickerProps: {
      value: { from: new Date('2022/07/29'), to: new Date('2022/07/30') },
    },
    providerProps: {},
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
];

const dateTimeRangeInputTests: TestType[] = [
  {
    name: 'should render empty input',
    pickerProps: {},
    providerProps: {},
    expected: '',
  },
  {
    name: 'should render correct value when there is only from value provided',
    pickerProps: {
      value: { from: new Date('2022-07-30T03:30:00'), to: null },
    },
    providerProps: {},
    expected: 'From 1401/05/08 03:30',
  },
  {
    name: 'should render correct value when there is only to value provided',
    pickerProps: {
      value: { from: null, to: new Date('2022-07-30T03:30:00') },
    },
    providerProps: {},
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
    providerProps: {},
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
];

const timeRangeInputTests: TestType[] = [
  {
    name: 'should render empty input',
    pickerProps: {},
    providerProps: {},
    expected: '',
  },
  {
    name: 'should render correct value when there is only from value provided',
    pickerProps: {
      value: { from: new Date('2022-07-30T03:30:00'), to: null },
    },
    providerProps: {},
    expected: 'From 03:30',
  },
  {
    name: 'should render correct value when there is only to value provided',
    pickerProps: {
      value: { from: null, to: new Date('2022-07-30T03:30:00') },
    },
    providerProps: {},
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
    providerProps: {},
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
];

describe.each<TestSuiteTableType>([
  {
    name: 'Date Range Input',
    RangeInput: DateRangeInput,
    tests: dateRangeInputTests,
    multiLocaleTest: {
      name: 'should render multi locale toggle buttons when multiLocale is true',
      pickerProps: { multiLocale: true },
      providerProps: {},
      expected: true,
    },
  },
  {
    name: 'Date Time Range Input',
    RangeInput: DateTimeRangeInput,
    tests: dateTimeRangeInputTests,
    multiLocaleTest: {
      name: 'should render multi locale toggle buttons when multiLocale is true',
      pickerProps: { multiLocale: true },
      providerProps: {},
      expected: true,
    },
  },
  {
    name: 'Time Range Input',
    RangeInput: TimeRangeInput,
    tests: timeRangeInputTests,
    multiLocaleTest: {
      name: 'should not render multi locale toggle buttons when defaultMultiLocale of provider is true',
      pickerProps: {},
      providerProps: { defaultMultiLocale: true },
      expected: false,
    },
  },
])('$name', ({ RangeInput, tests, multiLocaleTest }) => {
  const renderer = rendererFactory(RangeInput);
  it.each(tests)('$name', ({ pickerProps, providerProps, expected }) => {
    const { rangeInput } = renderer(pickerProps, providerProps);

    expect(rangeInput.value).toBe(expected);
  });

  it.each([
    { input: 'from', ...multiLocaleTest },
    { input: 'to', ...multiLocaleTest },
  ])(
    '$name ($input input)',
    async ({ input, pickerProps, providerProps, expected }) => {
      const { rangeInput } = renderer(pickerProps, providerProps);
      await userEvent.click(rangeInput);

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
