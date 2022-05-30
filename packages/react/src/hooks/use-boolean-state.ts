import { useControlledState } from '@react-stately/utils';
import * as React from 'react';

export interface UseBooleanStateParams {
  initialValue?: boolean;
  value?: boolean;
  onChange?: (state: boolean, ...args: unknown[]) => void;
}
/**
 * keep boolean state
 * @param UseBooleanStateParams
 * @return:
 *  0: current state
 *  1: toggle function
 *    toggle(false) set current value to false
 *    toggle(true)  set current value to true
 *    toggle()      toggle value
 */
export const useBooleanState = (
  params: UseBooleanStateParams = {},
): [boolean, (value?: boolean) => void] => {
  const { initialValue = false, onChange, value } = params;
  const [state, setState] = useControlledState(value, initialValue, onChange);

  const toggleValue = React.useCallback(
    (value: boolean | undefined) => {
      if (value === undefined) {
        setState((s) => !s);
      } else {
        setState(value);
      }
    },
    [setState],
  );

  return [state, toggleValue];
};
