import Moment from 'moment';
import jMoment from 'moment-jalaali';

export const localeConfig = (unload = false) => {
  if (unload) {
    Moment.locale('en');
  } else {
    jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }
};
