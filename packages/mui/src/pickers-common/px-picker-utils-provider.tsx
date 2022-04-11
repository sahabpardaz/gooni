import MomentUtils from '@date-io/moment';
import React from 'react';
import { LocalizationProvider } from '@mui/lab';

import JalaaliUtils from './px-jalali-utils';
import { CalendarTypes, LanguageTypes } from '../constant-types';

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
