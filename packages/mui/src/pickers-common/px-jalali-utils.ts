import DateIoJalaaliUtils from '@date-io/jalaali';
import { Moment } from 'moment-jalaali';

/**
 * Jalali utils
 *
 * @class JalaaliUtils
 * @extends {DateIoJalaaliUtils}
 */
export default class JalaaliUtils extends DateIoJalaaliUtils {
  constructor(opt: ConstructorParameters<typeof DateIoJalaaliUtils>[0]) {
    super(opt);
    this.formats.keyboardDate = 'jYY/jMM/jDD';
  }

  /**
   * the default value is 'ddd, jMM jD'
   * which prints the month number (MM) not the full month name (MMMM)
   * also month and day order is reversed
   *
   * @param {Moment} date
   * @returns {string}
   * @memberof JalaaliUtils
   */
  public getDatePickerHeaderText(date: Moment) {
    return date.format('ddd, jD jMMMM');
  }
}
