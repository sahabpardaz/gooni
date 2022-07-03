import { LocalizationProvider } from '@mui/x-date-pickers';
import { ReactNode } from 'react';
import { getLocalizedDateFnsAdapter } from 'src/date-time-utils';
import { Locale } from '../constant-types';
import {
  defaultEnglishLocaleTexts,
  defaultPersianLocaleTexts,
} from './default-locale-texts';

interface Props {
  locale: Locale;
  lang?: Locale;
  children: ReactNode;
}

export function DefaultMuiPickerLocalization(props: Props) {
  const { locale, lang = 'fa', children } = props;

  return (
    <LocalizationProvider
      dateAdapter={getLocalizedDateFnsAdapter(locale)}
      localeText={
        lang === 'en' ? defaultEnglishLocaleTexts : defaultPersianLocaleTexts
      }
      adapterLocale={
        locale === Locale.en
          ? require('date-fns/locale')[lang === Locale.en ? 'enUS' : 'faIR']
          : require('date-fns-jalali/locale')[
              lang === Locale.en ? 'enUS' : 'faIR'
            ]
      }
    >
      {children}
    </LocalizationProvider>
  );
}
