import { useEffect, useState } from 'react';

/**
 * Delay options
 *
 * @export
 * @interface Options
 */
export interface Options {
  /**
   * Delay for a false value before it turns to true, in ms.
   * @type {number}
   * @memberof Options
   */
  negativeEdgeDelay?: number;

  /**
   * Delay for a true value before it turns to false, in ms.
   * @type {number}
   * @memberof Options
   */
  positiveEdgeDelay?: number;
}

/**
 * It toggles a boolean value with a provided delay.
 *
 * @export
 * @param {boolean} value
 * @param {Options} [options={}]
 * @returns {boolean}
 */
export function useDelayedValue(
  value: boolean,
  options: Options = {},
): boolean {
  const { positiveEdgeDelay = 0, negativeEdgeDelay = 0 } = options;

  const [delayedValue, setDelayedValue] = useState(value);

  useEffect(() => {
    if (value) {
      // positive-edge
      const timeoutId = setTimeout(() => {
        setDelayedValue(value);
      }, positiveEdgeDelay);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      // negative-edge
      const timeoutId = setTimeout(() => {
        setDelayedValue(value);
      }, negativeEdgeDelay);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [value, positiveEdgeDelay, negativeEdgeDelay]);

  // If there is no delay, set it immediately and don't wait for effect and setTimeout,
  // it might cause undesire delay
  if (
    (value && positiveEdgeDelay === 0) ||
    (!value && negativeEdgeDelay === 0)
  ) {
    return value;
  }

  return delayedValue;
}
