import MomentUtils from '@date-io/moment';
import { LocalizationProvider } from '@mui/lab';
import React from 'react';

import { CalendarTypes, LanguageTypes } from '../constant-types';
import JalaaliUtils from './px-jalali-utils';

interface OwnProps {
  calendar: CalendarTypes;
  language: LanguageTypes;
}

export type Props = React.PropsWithChildren<OwnProps>;

/**
 *
 *
 * @param {Props} props
 * @returns {JSX.Element}
 */
export function PickersUtilsProvider(props: Props) {
  const { calendar, language } = props;

  const utils = {
    [CalendarTypes.gregorian]: MomentUtils,
    [CalendarTypes.jalaali]: JalaaliUtils,
  };

  return (
    <LocalizationProvider dateAdapter={utils[calendar]} locale={language}>
      {props.children}
    </LocalizationProvider>
  );
}
