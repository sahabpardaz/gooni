import { LocalizationProvider } from '@mui/x-date-pickers';
import {
  DatePickerSlotsComponent,
  DatePickerSlotsComponentsProps,
} from '@mui/x-date-pickers/DatePicker/DatePicker';
import { useLocaleText } from '@mui/x-date-pickers/internals';
import { OmitAndReplace } from '@my-sahab/utils';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';
import { getLocalizedDateFnsAdapter } from 'src/date-time-utils';
import { Locale } from '../constant-types';
import {
  MultiLocalePickersActionBar,
  MultiLocalePickersActionBarProps,
} from '../pickers-common';
import { DatePicker, DatePickerProps } from './px-date-picker';

interface Props<In, Out = In>
  extends Omit<DatePickerProps<In, Out>, 'components' | 'componentsProps'> {
  components?: OmitAndReplace<
    Partial<DatePickerSlotsComponent>,
    'ActionBar',
    typeof MultiLocalePickersActionBar
  >;
  componentsProps?: OmitAndReplace<
    Partial<DatePickerSlotsComponentsProps>,
    'actionBar',
    Partial<MultiLocalePickersActionBarProps>
  >;
}

/**
 * Multi Locale Date Picker Props
 *
 * @public
 */
export type { Props as MultiLocaleDatePickerProps };

/**
 * A component that render date picker using material-ui date picker.
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 * @example
 * Here's an example
 *
 * function MyComponent(){
 *     const [value, setDateValue] = useState(new Date('2019/1/1'));
 *     return <MultiLocaleDatePicker value={value} onChange={setDateValue} />;
 * }
 */

export function MultiLocaleDatePicker<In, Out = In>(props: Props<In, Out>) {
  const [locale, setLocale] = useState<Locale>(Locale.defaultLocale);
  const handleLocaleChange = () => {
    setLocale((prevLocale) =>
      prevLocale === Locale.en ? Locale.fa : Locale.en,
    );
  };

  const localeText = useLocaleText();

  const passedProps = mergeDeepRight<
    Props<In, Out>,
    Pick<Props<In, Out>, 'components' | 'componentsProps'>
  >(props, {
    components: {
      ActionBar: MultiLocalePickersActionBar,
    },
    componentsProps: {
      actionBar: { locale, onLocaleChange: handleLocaleChange },
    },
  }) as unknown as DatePickerProps<In, Out>;

  return (
    <LocalizationProvider
      dateAdapter={getLocalizedDateFnsAdapter(locale)}
      localeText={localeText}
    >
      <DatePicker {...passedProps} />
    </LocalizationProvider>
  );
}