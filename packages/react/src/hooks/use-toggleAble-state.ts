import { useControlledState } from '@react-stately/utils';
import * as React from 'react';

export interface ToggleAbleStateOptions<ValuesType> {
  // shows if multiple states can be toggled at the same time
  multiple: boolean;
  onAdd: (id: ValuesType) => void;
  onRemove: (id: ValuesType) => void;
}

type ToggleHandler<T> = (value: T) => void;
export interface ToggleAbleStateReturn<T> {
  values: T[];
  toggleByValue: ToggleHandler<T>;
  toggleCheckedByValue: ToggleHandler<T>;
  toggleUnCheckedByValue: ToggleHandler<T>;
  setValues: (values: T[] | ((prev: T[]) => T[])) => void;
  reset: () => void;
}

export interface ToggleAbleStateParams<T> {
  initialValue?: T[];
  value?: T[];
  onChange?: (value: T[]) => void;
  options?: Partial<ToggleAbleStateOptions<T>>;
}

/**
 * ToggleAble State
 *
 * @export
 * @param {ToggleAbleStateParams}
 * @returns {ToggleAbleStateReturn<T>}
 * @example
 * ```tsx
 * function UnControlled () {
 *  const {values, toggleByValue, setValues} = useToggleAbleState()
 * }
 *
 * function UnControlledWithInitialValue({initialValue}) {
 *  const {values, toggleByValue, setValues} = useToggleAbleState({initialValue})
 * }
 *
 * function UnControlledWithInitialValueAndOnChange({initialValue, onChange}) {
 *  const {values, toggleByValue, setValues} = useToggleAbleState({initialValue, onChange})
 * }
 *
 * function Controlled ({value, onChange}){
 * const [value, onChange] = React.useState([]);
 *  const {values, toggleByValue, setValues} = useToggleAbleState({value, onChange})
 * }
 * ```
 */

export function useToggleAbleState<ValuesType = string>(
  params: ToggleAbleStateParams<ValuesType> = {},
): ToggleAbleStateReturn<ValuesType> {
  const { initialValue = [], onChange, value, options = {} } = params;
  const [values, setValues] = useControlledState(value, initialValue, onChange);

  const { onAdd, onRemove, multiple } = options;

  const toggleCheckedByValue = React.useCallback(
    (value: ValuesType) => {
      setValues((values) => {
        const valuesSet = new Set(values);

        if (!multiple) {
          valuesSet.clear();
        }
        valuesSet.add(value);
        onAdd?.(value);

        return Array.from(valuesSet);
      });
    },
    [multiple, onAdd, setValues],
  );

  const toggleUnCheckedByValue = React.useCallback(
    (value: ValuesType) => {
      setValues((values) => {
        const valuesSet = new Set(values);
        valuesSet.delete(value);
        onRemove?.(value);

        return Array.from(valuesSet);
      });
    },
    [onRemove, setValues],
  );

  const toggleByValue = React.useCallback(
    (value: ValuesType) => {
      setValues((values) => {
        const valuesSet = new Set(values);

        if (valuesSet.has(value)) {
          valuesSet.delete(value);
          onRemove?.(value);
        } else {
          if (!multiple) {
            valuesSet.clear();
          }
          valuesSet.add(value);
          onAdd?.(value);
        }

        return Array.from(valuesSet);
      });
    },
    [multiple, onAdd, onRemove, setValues],
  );

  const reset = React.useCallback(() => {
    setValues([]);
  }, [setValues]);

  return {
    values,
    setValues,
    toggleByValue,
    toggleCheckedByValue,
    toggleUnCheckedByValue,
    reset,
  };
}
