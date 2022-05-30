import { isNil } from 'ramda';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Input, InputProps } from './input';
import { useMergeRefs } from './mergeRefs.util';
import { ToggleButtonContextProvider } from './toggle-button-context';
import { TypeValue } from './type-value';

interface OwnProps<T extends string>
  extends Omit<InputProps, 'variant' | 'value' | 'onChange'> {
  onChange: (value: TypeValue<T>) => void;
  value: TypeValue<T>;
}

/**
 * Toggle Button Input
 * @public
 */
export type Props<T extends string> = React.PropsWithChildren<OwnProps<T>>;

/**
 * A component that render an input and also accept other components as child.
 *
 * @template T
 * @param {Props<T>} props
 * @returns {JSX.Element}
 * @example
 * Here's an example
 * ```tsx
 * export function MyComponent() {
 *   const [value, setValue] = useState<{ value: string; type: Type | null }>({
 *     value: '',
 *     type: null,
 *   });
 *
 *   return (
 *     <Fragment>
 *       <ToggleButtonInput value={value} onChange={setValue} label={value.type}>
 *         <ToggleButton title="item1" value="item1">
 *           Item 1
 *         </ToggleButton>
 *         <ToggleButton title="item2" value="item2">
 *           Item 2
 *         </ToggleButton>
 *         <ToggleButton title="item3" value="item3">
 *           Item 3
 *         </ToggleButton>
 *       </ToggleButtonInput>
 *     </Fragment>
 *   );
 * }
 * ```
 */
export function ToggleButtonInput<T extends string>(props: Props<T>) {
  const {
    color = 'primary',
    disabled,
    onBlur,
    onChange,
    onFocus,
    value,
    ...other
  } = props;

  // We use this setState as forceUpdate to re-render this component.
  // We re-render the component when the input should be focused but it can not be focused right away because it is disabled.
  // For instance, it is used when the textField is disabled and type is null.
  // So changing type would not focus the input because it is disabled in that render.
  // We set this state and focus the input in the useEffect after input disabled prop is set to false.
  const [focusNonce, setFocusNonce] = useState(0);

  // This is a ref to input used to focus.
  const _inputRef = useRef<HTMLElement | null>(null);
  const inputRef = useMergeRefs(props.inputRef, _inputRef);

  const inputDisabled = isNil(value.type) || disabled;

  const focusInput = useCallback(() => {
    _inputRef.current?.focus();
  }, []);

  useEffect(() => {
    // focusNonce initial value is 0 so we skip first effect
    if (focusNonce) {
      focusInput();
    }
  }, [focusNonce, focusInput]);

  const handleValueChange = useCallback(
    (input: string) => {
      onChange?.({ type: value.type, value: input });
    },
    [onChange, value.type],
  );

  const handleTypeChange = useCallback(
    (type: T) => {
      onChange?.({
        type,
        value: value.value,
      });
      if (inputDisabled) {
        // If input is disabled, we can not focus it in the current render so we re-render and focus it in the effect.
        setFocusNonce((n) => n + 1);
      } else {
        // Otherwise, it means input is not disabled and it can be focused in this render.
        focusInput();
      }
    },
    [onChange, value.value, inputDisabled, focusInput],
  );

  const handleFocus: InputProps['onFocus'] = useCallback(
    (event) => {
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur: InputProps['onBlur'] = useCallback(
    (event) => {
      onBlur?.(event);
    },
    [onBlur],
  );

  return (
    <ToggleButtonContextProvider
      value={{ disabled, onClick: handleTypeChange, value: value.type, color }}
    >
      <Input
        color={color}
        disabled={disabled}
        inputDisabled={inputDisabled}
        onBlur={handleBlur}
        onChange={handleValueChange}
        onFocus={handleFocus}
        value={value.value}
        {...other}
        inputRef={inputRef}
      />
    </ToggleButtonContextProvider>
  );
}

export type ToggleButtonInputProps<T extends string> = OwnProps<T>;
