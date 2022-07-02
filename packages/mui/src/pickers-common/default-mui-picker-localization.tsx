import DateFnsAdapter from '@date-io/date-fns';
import DateFnsJalaliAdapterBase from '@date-io/date-fns-jalali';
import { LocalizationProvider, PickersLocaleText } from '@mui/x-date-pickers';
import * as DateFnsJalali from 'date-fns-jalali';
import { ReactNode } from 'react';
import { Locale } from '../constant-types';

interface Props {
  locale: Locale;
  lang?: Locale;
  localeTexts?: Partial<PickersLocaleText>;
  children: ReactNode;
}

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
  const { locale, lang = 'fa', localeTexts, children } = props;

  return (
    <LocalizationProvider
      dateAdapter={locale === 'en' ? DateFnsAdapter : DateFnsJalaliAdapter}
      localeText={
        localeTexts || lang === 'en'
          ? defaultEnglishLocaleTexts
          : defaultPersianLocaleTexts
      }
    >
      {children}
    </LocalizationProvider>
  );
}

const defaultEnglishLocaleTexts: Partial<PickersLocaleText> = {
  changeLocaleButtonLabel: {
    [Locale.en]: 'Jalali Calendar',
    [Locale.fa]: 'Gregorian Calendar',
  },
};

const defaultPersianLocaleTexts: Partial<PickersLocaleText> = {
  changeLocaleButtonLabel: {
    [Locale.en]: 'تقویم شمسی',
    [Locale.fa]: 'تقویم میلادی',
  },
  todayButtonLabel: 'برو به امروز',
  cancelButtonLabel: 'کنسل',
  okButtonLabel: 'انتخاب',
  clearButtonLabel: 'پاک کردن',
  errors: {
    invalidDate: 'تاریخ انتخابی اشتباه است.',
    maxDate: 'تاریخ انتخابی نباید بیشتر از حد مشخص شده باشد.',
    minDate: 'تاریخ انتخابی نباید کمتر از حد مشخص شده باشد.',
  },
};
