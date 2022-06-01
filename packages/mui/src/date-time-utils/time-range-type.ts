import { Moment } from 'moment';
import { Moment as jMoment } from 'moment-jalaali';

/**
 * TimeRange contract (support both Moment and JalaliMoment)
 * @interface TimeRange
 */
export interface TimeRange<T = Moment | jMoment> {
  /**
   * Beginning of time range.
   *
   * @type {(T | null)}
   * @memberof TimeRange
   */
  from: T | null;
  /**
   * End of time range.
   *
   * @type {(T | null)}
   * @memberof TimeRange
   */
  to: T | null;
}
