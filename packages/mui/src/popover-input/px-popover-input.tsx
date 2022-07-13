import { TextField, TextFieldProps } from '@mui/material';
import clsx from 'clsx';
import React from 'react';
import { useMergedClasses } from 'tss-react';

import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';
import { PxPopover, type Props as PxPopoverProps } from './px-popover';

interface OwnProps extends Omit<PxPopoverProps, 'renderer' | 'classes'> {}

/**
 * Definition of PopoverInput Props type.
 */
export type Props = React.PropsWithChildren<OwnProps> &
  TextFieldProps &
  StyleProps;

/**
 *
 * render a popover with input
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 *
 * @example
 * Here's an example:
 *
 * ```ts
 * import { PopoverInput } from '@my-sahab/mui'
 *
 * export function MyComponent() {
 *     return <PopoverInput />;
 * }
 * ```
 */
export function PopoverInput(props: Props) {
  const { fullWidth, fixWidth, placement, children, ...inputProps } = props;

  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);
  return (
    <PxPopover
      {...{
        fullWidth,
        fixWidth,
        placement,
        classes: {
          popper: classes.popper,
          root: classes.root,
          rootFullWidth: classes.rootFullWidth,
        },
      }}
      renderer={({ onOpen }) => (
        <TextField
          {...inputProps}
          variant={inputProps.variant ?? 'outlined'}
          fullWidth={fullWidth}
          onFocus={onOpen}
          classes={{
            root: clsx(classes.textFieldRoot, {
              [classes.textFieldRootFullWidth]: fullWidth,
            }),
          }}
        />
      )}
    >
      {children}
    </PxPopover>
  );
}

const useStyles = makeStyles({ name: 'PopoverInput' })(() => ({
  textFieldRoot: {},
  textFieldRootFullWidth: {
    minWidth: '100%',
  },
  root: {},
  rootFullWidth: {},
  popper: {},
}));
type StyleProps = Styles<typeof useStyles>;
