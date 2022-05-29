import { both, complement, curry, equals, isEmpty, isNil, Pred } from 'ramda';

/**
 * Checks if the input value is not null or undefined.
 *
 * @export
 * @param {(T | null | undefined)} item
 * @returns {item is T}
 */
export function isNotNil<T>(item: T | null | undefined): item is T {
  return complement(isNil)(item);
}

/**
 * Reports whether the list has atleast one element.
 *
 * @export
 * @param {(T | null | undefined)} item
 * @returns {boolean}
 */
export function isNotEmpty<T>(item: T | null | undefined): boolean {
  return complement(isEmpty)(item);
}

export const isNotNilOrEmpty: Pred = both(isNotNil, isNotEmpty);

/**
 * Returns the count of elements of an array that meet the condition specified in a callback function.
 *
 * @export
 * @param {(element: T, index: number, array: Array<T>) => boolean} fn
 * @param {Array<T>} array
 * @returns {number}
 */
export function countBy<T>(
  fn: (element: T, index: number, array: Array<T>) => boolean,
  array: Array<T>,
): number {
  return array.filter(fn).length;
}

export const notEqual: <T>(a: T) => (b: T) => boolean = curry(
  complement(equals),
);
