import DateFnsAdapter from '@date-io/date-fns';
import DateFnsJalaliAdapterBase from '@date-io/date-fns-jalali';
import { LocalizationProvider, PickersLocaleText } from '@mui/x-date-pickers';
import * as DateFnsJalali from 'date-fns-jalali';
import { ReactNode } from 'react';
import { Locale } from '../constant-types';

interface Props {
  locale: Locale;
  children: ReactNode;
}
export { Props as DefaultMuiPickerLocalizationProps };

class DateFnsJalaliAdapter extends DateFnsJalaliAdapterBase {
  public getWeekdays = () => {
    const now = new Date();
    return DateFnsJalali.eachDayOfInterval({
      start: DateFnsJalali.startOfWeek(now, { locale: this.locale }),
      end: DateFnsJalali.endOfWeek(now, { locale: this.locale }),
    }).map((day) => this.formatByString(day, 'EEEEE'));
  };
}

export function DefaultMuiPickerLocalization(props: Props) {
  const { locale, children } = props;

  return (
    <LocalizationProvider
      dateAdapter={locale === 'en' ? DateFnsAdapter : DateFnsJalaliAdapter}
      localeText={locale === 'en' ? undefined : persianLocaleTexts}
    >
      {children}
    </LocalizationProvider>
  );
}

const persianLocaleTexts: Partial<PickersLocaleText<unknown>> = {
  cancelButtonLabel: 'کنسل',
  okButtonLabel: 'انتخاب',
  clearButtonLabel: 'پاک کردن',
  errors: {
    invalidDate: 'تاریخ انتخابی اشتباه است.',
    maxDate: 'تاریخ انتخابی نباید بیشتر از حد مشخص شده باشد.',
    minDate: 'تاریخ انتخابی نباید کمتر از حد مشخص شده باشد.',
  },
};
