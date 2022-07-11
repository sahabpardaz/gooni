import { LocalizationProvider } from '@mui/x-date-pickers';
import { ReactNode } from 'react';
import { Locale } from 'src/constant-types';
import { getLocalizedDateFnsAdapter } from 'src/date-time-utils';
import {
  defaultEnglishLocaleTexts,
  defaultPersianLocaleTexts,
} from './default-locale-texts';

interface Props {
  locale: Locale;
  children: ReactNode;
}
export { Props as DefaultMuiPickerLocalizationProps };

export function DefaultMuiPickerLocalization(props: Props) {
  const { locale, children } = props;

  return (
    <LocalizationProvider
      dateAdapter={getLocalizedDateFnsAdapter(locale)}
      localeText={
        locale === 'en' ? defaultEnglishLocaleTexts : defaultPersianLocaleTexts
      }
    >
      {children}
    </LocalizationProvider>
  );
}
