import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Locale } from 'src/constant-types';
import {
  MultiLocalizationProvider,
  MultiLocalizationProviderProps,
} from 'src/shared/pickers';
import { DatePicker, DateTimePicker, TimePicker } from 'src/simple-pickers';

type PickerComponentTypes =
  | typeof DatePicker
  | typeof DateTimePicker
  | typeof TimePicker;

const rendererFactory =
  <P extends PickerComponentTypes>(Picker: P) =>
  (
    pickerProps: Partial<React.ComponentProps<P>> = {},
    providerProps: Partial<MultiLocalizationProviderProps> = {},
  ) => {
    const { value = null, onChange = () => {}, ...rest } = pickerProps;

    render(
      <MultiLocalizationProvider
        localeOptions={[Locale.en, Locale.fa]}
        {...providerProps}
      >
        {/* @ts-ignore */}
        <Picker value={value} onChange={onChange} {...rest} />
      </MultiLocalizationProvider>,
    );

    const pickerInput = screen.getByRole('textbox') as HTMLInputElement;

    return { pickerInput };
  };

describe('date picker', () => {
  const renderer = rendererFactory(DatePicker);
  it('should render empty input', () => {
    const { pickerInput } = renderer();

    expect(pickerInput.value).toBe('');
  });

  it('should render input with proper value', () => {
    const { pickerInput } = renderer({ value: new Date('2022/07/30') });

    expect(pickerInput.value).toBe('07/30/2022');
  });

  describe('multiLocale feature', () => {
    describe('multiLocale prop of picker & defaultMultiLocale prop of provider', () => {
      it.each([
        {
          multiLocale: undefined,
          defaultMultiLocale: undefined,
          expected: false,
        },
        { multiLocale: false, defaultMultiLocale: undefined, expected: false },
        { multiLocale: true, defaultMultiLocale: undefined, expected: true },
        { multiLocale: undefined, defaultMultiLocale: false, expected: false },
        { multiLocale: false, defaultMultiLocale: false, expected: false },
        { multiLocale: true, defaultMultiLocale: false, expected: true },
        { multiLocale: undefined, defaultMultiLocale: true, expected: true },
        { multiLocale: false, defaultMultiLocale: true, expected: false },
        { multiLocale: true, defaultMultiLocale: true, expected: true },
      ])(
        'show multiLocale toggle button: $expected, when multiLocale=$multiLocale & defaultMultiLocale=$defaultMultiLocale',
        async ({ multiLocale, defaultMultiLocale, expected }) => {
          const { pickerInput } = renderer(
            multiLocale !== undefined ? { multiLocale } : {},
            defaultMultiLocale !== undefined ? { defaultMultiLocale } : {},
          );

          await userEvent.click(pickerInput);

          const multiLocaleToggleButtonGroup = screen.queryByTestId(
            'multi-locale-toggle-button-group',
          );

          expected
            ? expect(multiLocaleToggleButtonGroup).toBeTruthy()
            : expect(multiLocaleToggleButtonGroup).toBeNull();
        },
      );
    });

    it('should render & change locale correctly', async () => {
      const { pickerInput } = renderer({ multiLocale: true });

      await userEvent.click(pickerInput);

      const toggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      const jalaliButton = within(toggleButtonGroup).getByRole('button', {
        name: 'Jalali',
      });
      const gregorianButton = within(toggleButtonGroup).getByRole('button', {
        name: 'Gregorian',
      });

      expect(gregorianButton).toHaveAttribute('aria-pressed', 'true');
      expect(jalaliButton).toHaveAttribute('aria-pressed', 'false');

      await userEvent.click(jalaliButton);

      expect(gregorianButton).toHaveAttribute('aria-pressed', 'false');
      expect(jalaliButton).toHaveAttribute('aria-pressed', 'true');
    });
  });
});

describe('date time picker', () => {
  const renderer = rendererFactory(DateTimePicker);
  it('should render empty input', () => {
    const { pickerInput } = renderer();

    expect(pickerInput.value).toBe('');
  });
  it('should render input with proper value', () => {
    const { pickerInput } = renderer({
      value: new Date('2022-07-30T03:30:00'),
    });

    expect(pickerInput.value).toBe('07/30/2022 03:30 am');
  });

  describe('multiLocale feature', () => {
    describe('multiLocale prop of picker & defaultMultiLocale prop of provider', () => {
      it.each([
        {
          multiLocale: undefined,
          defaultMultiLocale: undefined,
          expected: false,
        },
        { multiLocale: false, defaultMultiLocale: undefined, expected: false },
        { multiLocale: true, defaultMultiLocale: undefined, expected: true },
        { multiLocale: undefined, defaultMultiLocale: false, expected: false },
        { multiLocale: false, defaultMultiLocale: false, expected: false },
        { multiLocale: true, defaultMultiLocale: false, expected: true },
        { multiLocale: undefined, defaultMultiLocale: true, expected: true },
        { multiLocale: false, defaultMultiLocale: true, expected: false },
        { multiLocale: true, defaultMultiLocale: true, expected: true },
      ])(
        'show multiLocale toggle button: $expected, when multiLocale=$multiLocale & defaultMultiLocale=$defaultMultiLocale',
        async ({ multiLocale, defaultMultiLocale, expected }) => {
          const { pickerInput } = renderer(
            multiLocale !== undefined ? { multiLocale } : {},
            defaultMultiLocale !== undefined ? { defaultMultiLocale } : {},
          );

          await userEvent.click(pickerInput);

          const multiLocaleToggleButtonGroup = screen.queryByTestId(
            'multi-locale-toggle-button-group',
          );

          expected
            ? expect(multiLocaleToggleButtonGroup).toBeTruthy()
            : expect(multiLocaleToggleButtonGroup).toBeNull();
        },
      );
    });

    it('should render & change locale correctly', async () => {
      const { pickerInput } = renderer({ multiLocale: true });

      await userEvent.click(pickerInput);

      const toggleButtonGroup = screen.getByTestId(
        'multi-locale-toggle-button-group',
      );

      const jalaliButton = within(toggleButtonGroup).getByRole('button', {
        name: 'Jalali',
      });
      const gregorianButton = within(toggleButtonGroup).getByRole('button', {
        name: 'Gregorian',
      });

      expect(gregorianButton).toHaveAttribute('aria-pressed', 'true');
      expect(jalaliButton).toHaveAttribute('aria-pressed', 'false');

      await userEvent.click(jalaliButton);

      expect(gregorianButton).toHaveAttribute('aria-pressed', 'false');
      expect(jalaliButton).toHaveAttribute('aria-pressed', 'true');
    });
  });
});

describe('time picker', () => {
  const renderer = rendererFactory(TimePicker);
  it('should render empty input', () => {
    const { pickerInput } = renderer();

    expect(pickerInput.value).toBe('');
  });
  it('should render input with proper value', () => {
    const { pickerInput } = renderer({
      value: new Date('2022-07-30T03:30:00'),
    });

    expect(pickerInput.value).toBe('03:30 am');
  });

  describe('multiLocale feature', () => {
    describe('multiLocale prop of picker & defaultMultiLocale prop of provider', () => {
      it.each([
        {
          multiLocale: undefined,
          defaultMultiLocale: undefined,
          expected: false,
        },
        { multiLocale: undefined, defaultMultiLocale: false, expected: false },
        { multiLocale: undefined, defaultMultiLocale: true, expected: false },
      ])(
        'show multiLocale toggle button: $expected, when multiLocale=$multiLocale & defaultMultiLocale=$defaultMultiLocale',
        async ({ multiLocale, defaultMultiLocale, expected }) => {
          const { pickerInput } = renderer(
            {},
            defaultMultiLocale !== undefined ? { defaultMultiLocale } : {},
          );

          await userEvent.click(pickerInput);

          const multiLocaleToggleButtonGroup = screen.queryByTestId(
            'multi-locale-toggle-button-group',
          );

          expected
            ? expect(multiLocaleToggleButtonGroup).toBeTruthy()
            : expect(multiLocaleToggleButtonGroup).toBeNull();
        },
      );
    });
  });
});
