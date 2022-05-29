import { DatePicker as MuiDatePicker, DatePickerProps } from '@mui/lab';
import { Moment } from 'moment-jalaali';
import React from 'react';

import { CalendarTypes, defaultLocale, LanguageTypes } from '../constant-types';
import {
  PickerLabel,
  PickersUtilsProvider,
  PickerThemeProvider,
  usePickerProps,
} from '../pickers-common';

interface OwnProps extends Omit<DatePickerProps<Moment>, 'renderInput'> {
  // there should added more variants later
  variant?: 'dialog';
  renderInput?: DatePickerProps['renderInput'];
  color?: 'primary' | 'secondary';
  errorsText?: PickerLabel['errors'];
  localeCalendar?: CalendarTypes;
  localeLanguage?: LanguageTypes;
}
/**
 * Date Picker Props
 *
 * @public
 */
export type Props = OwnProps;

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
 *     const [value, setDateValue] = useState<ParsableDate>(Moment('2019/1/1'));
 *     return <DatePicker value={value} onChange={setDateValue} />;
 * }
 */
export function DatePicker(props: Props) {
  const {
    localeCalendar = defaultLocale.calendar,
    localeLanguage = defaultLocale.language,
    color,
    errorsText,
    ...muiDatePickerProps
  } = props;

  const pickerCommonProps = usePickerProps({ errorsText });

  return (
    <PickersUtilsProvider calendar={localeCalendar} language={localeLanguage}>
      <PickerThemeProvider color={color}>
        <MuiDatePicker
          desktopModeMediaQuery="@media not all"
          {...pickerCommonProps}
          {...muiDatePickerProps}
        />
      </PickerThemeProvider>
    </PickersUtilsProvider>
  );
}
