import { PickersLocaleText } from '@mui/x-date-pickers';
import { Locale } from '../constant-types';

export const defaultEnglishLocaleTexts: Partial<PickersLocaleText<unknown>> = {
  localeButtonLabel: {
    [Locale.en]: 'Gregorian',
    [Locale.fa]: 'Jalali',
  },
  errors: {
    maxDate: 'Date should not be after maximum date',
    minDate: 'Date should not be before minimal date',
  },
};

export const defaultPersianLocaleTexts: Partial<PickersLocaleText<unknown>> = {
  localeButtonLabel: {
    [Locale.en]: 'میلادی',
    [Locale.fa]: 'شمسی',
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
