/**
 * TimeRange contract)
 * @interface TimeRange
 */
export interface TimeRange<T = Date> {
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
