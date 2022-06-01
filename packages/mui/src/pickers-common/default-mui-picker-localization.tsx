import { LocalizationProvider, PickersLocaleText } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { ReactNode } from 'react';
import { Locale } from '../constant-types';

interface Props {
  locale: Locale;
  children: ReactNode;
}

export function DefaultMuiPickerLocalization(props: Props) {
  const { locale, children } = props;
  return (
    <LocalizationProvider
      dateAdapter={AdapterLuxon}
      adapterLocale={locale === 'en' ? 'en-US' : 'fa-IR'}
      localeText={locale === 'en' ? undefined : persianLocaleTexts}
    >
      {children}
    </LocalizationProvider>
  );
}

const persianLocaleTexts: Partial<PickersLocaleText> = {
  cancelButtonLabel: 'کنسل',
  okButtonLabel: 'انتخاب',
  clearButtonLabel: 'پاک کردن',
  errors: {
    invalidDate: 'تاریخ انتخابی اشتباه است.',
    maxDate: 'تاریخ انتخابی نباید بیشتر از حد مشخص شده باشد.',
    minDate: 'تاریخ انتخابی نباید کمتر از حد مشخص شده باشد.',
  },
};
