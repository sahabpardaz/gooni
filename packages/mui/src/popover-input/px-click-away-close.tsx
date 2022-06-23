import { ClickAwayListener } from '@mui/material';
import * as React from 'react';

import { usePopoverInputContext } from './px-popover-input-context';

interface OwnProps {
  ignoreClickRef?: React.RefObject<boolean>;
  onClose?: () => void;
  children: React.ReactElement;
}

type Props = OwnProps;

/**
 * Close popover with click away from its children. (use `usePopoverInputContext`)
 *
 * @param {Props} props
 * @returns {JSX.Element}
 * @example
 *
 * ```ts
 * import { PopoverInput, ClickAwayClose } from '@my-sahab/mui';
 *
 * export function MyComponent() {
 *     return (<PopoverInput>
 *                 <ClickAwayClose>
 *                 <Simple />
 *                 </ClickAwayClose>
 *             </PopoverInput>
 *            );
 * }
 * ```
 */
export function ClickAwayClose(props: Props) {
  const { ignoreClickRef, onClose } = props;
  const setOpen = usePopoverInputContext();

  const onClickAway = () => {
    if (ignoreClickRef?.current) {
      return;
    }
    setOpen(false);
    onClose?.();
  };

  return (
    <ClickAwayListener
      onClickAway={onClickAway}
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
    >
      {props.children}
    </ClickAwayListener>
  );
}
