import React, { createContext, useContext } from 'react';
import { ButtonProps } from '@mui/material';

export interface ToggleButtonContextType<T extends string> {
  color: ButtonProps['color'];
  onClick: (value: T) => void;
  disabled?: boolean;
  value: T | null;
}
export const ToggleButtonContext =
  createContext<ToggleButtonContextType<any> | null>(null);

/**
 * To use context of button.
 *
 * @public
 * @returns {ToggleButtonContextType<T>}
 */
export const useToggleButtonContext = <
  T extends string,
>(): ToggleButtonContextType<T> => {
  const context = useContext(ToggleButtonContext);
  if (!context) {
    throw new Error(
      `useToggleButtonContext hook should be used inside <ToggleButtonContextProvider />`,
    );
  }
  return context;
};

interface OwnProps<T extends string> {
  value: ToggleButtonContextType<T>;
}

/**
 * Toggle Button Context Props
 *
 * @public
 */
export type Props<T extends string> = React.PropsWithChildren<OwnProps<T>>;

export function ToggleButtonContextProvider<T extends string>(props: Props<T>) {
  return (
    <ToggleButtonContext.Provider value={props.value}>
      {props.children}
    </ToggleButtonContext.Provider>
  );
}
