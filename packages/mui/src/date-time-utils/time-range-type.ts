import { Moment } from 'moment';
import { Moment as jMoment } from 'moment-jalaali';

/**
 * TimeRange contract (support both Moment and JalaliMoment)
 * @interface TimeRange
 */
export interface TimeRange {
  /**
   * Beginning of time range.
   *
   * @type {(Moment | jMoment | null)}
   * @memberof TimeRange
   */
  from: Moment | jMoment | null;
  /**
   * End of time range.
   *
   * @type {(Moment | jMoment | null)}
   * @memberof TimeRange
   */
  to: Moment | jMoment | null;
}
