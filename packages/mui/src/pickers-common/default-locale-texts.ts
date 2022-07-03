import { PickersLocaleText } from '@mui/x-date-pickers';
import { Locale } from '../constant-types';

export const defaultEnglishLocaleTexts: Partial<PickersLocaleText> = {
  changeLocaleButtonLabel: {
    [Locale.en]: 'Jalali Calendar',
    [Locale.fa]: 'Gregorian Calendar',
  },
};

export const defaultPersianLocaleTexts: Partial<PickersLocaleText> = {
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
