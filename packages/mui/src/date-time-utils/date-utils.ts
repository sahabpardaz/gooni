import * as DateFnsBase from 'date-fns';
import * as DateFnsJalali from 'date-fns-jalali';
import { Locale } from '../constant-types';

export const DefaultDateFns =
  Locale.defaultLocale === Locale.fa ? DateFnsJalali : DateFnsBase;

export const getLocalizedDateFns = (locale: Locale) =>
  locale === Locale.fa ? DateFnsJalali : DateFnsBase;
