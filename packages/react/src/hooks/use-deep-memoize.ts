import { equals } from 'ramda';
import { useEffect, useRef } from 'react';

const getValue = <T>(oldValue: T, newValue: T) =>
  equals(oldValue, newValue) ? oldValue : newValue;

/**
 * Memoizing deeply
 *
 * @export
 * @param {T} value
 * @returns {T}
 */
export function useDeepMemoize<T>(value: T): T {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = getValue<T>(ref.current, value);
  });
  return getValue(ref.current, value);
}
