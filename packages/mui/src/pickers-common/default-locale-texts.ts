import { PickersLocaleText } from '@mui/x-date-pickers';
import { Locale } from '../constant-types';

export const defaultEnglishLocaleTexts: Partial<PickersLocaleText> = {
  changeLocaleButtonLabel: {
    [Locale.en]: 'Gregorian',
    [Locale.fa]: 'Jalali',
  },
};

export const defaultPersianLocaleTexts: Partial<PickersLocaleText> = {
  changeLocaleButtonLabel: {
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
