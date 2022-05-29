import { TimePicker as MuiTimePicker, TimePickerProps } from '@mui/lab';
import { Moment } from 'moment-jalaali';
import * as React from 'react';

import { CalendarTypes, defaultLocale, LanguageTypes } from '../constant-types';
import {
  PickerLabel,
  PickersUtilsProvider,
  PickerThemeProvider,
  usePickerProps,
} from '../pickers-common';

interface OwnProps extends Omit<TimePickerProps<Moment>, 'renderInput'> {
  // there should added more variants later
  variant?: 'dialog';
  renderInput?: TimePickerProps['renderInput'];
  color?: 'primary' | 'secondary';
  errorsText?: PickerLabel['errors'];
  localeCalendar?: CalendarTypes;
  localeLanguage?: LanguageTypes;
}

/**
 * Time Picker Props
 *
 * @public
 */
export type Props = OwnProps;

/**
 *A component that render timePicker using material-ui time picker
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 * @example
 * Here's an example:
 *
 * function MyComponent() {
 *    const [value, setValue] = useState<ParsableDate>(moment('10:30', 'HH:mm'))
 *    return <TimePicker value={value} onChange={setValue}/>
 * }
 */
export function TimePicker(props: Props) {
  const {
    color = 'secondary',
    localeCalendar = defaultLocale.calendar,
    localeLanguage = defaultLocale.language,
    errorsText,
    ...muiTimePickerProps
  } = props;

  const commonPickerProps = usePickerProps({ errorsText });

  return (
    <PickersUtilsProvider calendar={localeCalendar} language={localeLanguage}>
      <PickerThemeProvider color={color}>
        <MuiTimePicker
          desktopModeMediaQuery="@media not all"
          {...commonPickerProps}
          {...muiTimePickerProps}
        />
      </PickerThemeProvider>
    </PickersUtilsProvider>
  );
}
