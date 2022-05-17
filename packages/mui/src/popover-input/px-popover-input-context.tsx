import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from 'react';

/**
 * Definition of PopoverInput context type.
 */
export type PopoverInputContextType = Dispatch<SetStateAction<boolean>>;

export const PopoverInputContext =
  createContext<PopoverInputContextType | null>(null);

/**
 * Context for controlling popover.
 *
 * @public
 * @throws Will throw error if not used inside `<PopoverInputContextProvider />`
 * @returns {PopoverInputContextType}
 * @example
 * Here's an example:
 *
 * ```ts
 * import { usePopoverInputContext } from '@sahab/mui'
 *
 * const Sample = () => {
 *  const setOpen = usePopoverInputContext();
 *  return (
 *    <div>
 *      <Button onClick={() => setOpen(false)}>close</Button>
 *    </div>
 *  );
 * };
 * export function MyComponent() {
 *     return (<PopoverInput>
 *                 <Sample />
 *            </PopoverInput>);
 * }
 * ```
 */
export function usePopoverInputContext(): PopoverInputContextType {
  const context = useContext(PopoverInputContext);
  if (context === null) {
    throw new Error(
      `usePopoverInputContext hook should be used inside <PopoverInputContextProvider />`,
    );
  }
  return context;
}

interface OwnProps {
  value: PopoverInputContextType;
}

export type Props = React.PropsWithChildren<OwnProps>;

export function PopoverInputContextProvider(props: Props) {
  return (
    <PopoverInputContext.Provider value={props.value}>
      {props.children}
    </PopoverInputContext.Provider>
  );
}
