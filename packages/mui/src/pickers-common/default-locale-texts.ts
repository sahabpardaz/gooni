import { PickersLocaleText } from '@mui/x-date-pickers';
import { PickerTypes } from 'src/date-time-pickers/wrapper';
import { Locale } from '../constant-types';

const pickerTypesPersianMapping: Record<PickerTypes, string> = {
  TIME: 'زمان',
  DATE: 'تاریخ',
  DATETIME: 'تاریخ',
};

export const defaultEnglishLocaleTexts: Partial<PickersLocaleText<unknown>> = {
  localeButtonLabel: {
    [Locale.en]: 'Gregorian',
    [Locale.fa]: 'Jalali',
  },
  errors: {
    minDate: 'Date should not be before minimal date',
    maxDate: 'Date should not be after maximum date',
    minTime: 'Time should not be before maximum date',
    maxTime: 'Time should not be after maximum date',
  },
  rangePickerLabels: {
    fromLabel: (pickerType) => `From ${pickerType.toLowerCase()}`,
    toLabel: (pickerType) => `To ${pickerType.toLowerCase()}`,
    resetLabel: 'RESET',
  },
  rangeInputLabels: {
    from: 'From',
    to: 'To',
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
    minDate: 'تاریخ انتخابی نباید کمتر از حد مشخص شده باشد.',
    maxDate: 'تاریخ انتخابی نباید بیشتر از حد مشخص شده باشد.',
    minTime: 'زمان انتخابی نباید کمتر از حد مشخص شده باشد.',
    maxTime: 'زمان انتخابی نباید بیشتر از حد مشخص شده باشد.',
  },
  rangePickerLabels: {
    fromLabel: (pickerType) => `از ${pickerTypesPersianMapping[pickerType]}`,
    toLabel: (pickerType) => `تا ${pickerTypesPersianMapping[pickerType]}`,
    resetLabel: 'بازنشانی',
  },
  rangeInputLabels: {
    from: 'از',
    to: 'تا',
  },
};
