import * as React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useMergedClasses } from 'tss-react';

import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';

interface OwnProps extends Omit<ButtonProps, 'variant'> {}

export type Props = React.PropsWithChildren<OwnProps> & StyleProps;

export const PxSelectPopoverButton = React.forwardRef<HTMLButtonElement, Props>(
  function (props, ref) {
    let { classes } = useStyles();
    classes = useMergedClasses(classes, props.classes);

    return (
      <Button
        variant="outlined"
        ref={ref}
        size="small"
        {...props}
        classes={classes}
      />
    );
  },
);

const useStyles = makeStyles({ name: 'PxSelectPopoverButton' })(() => ({
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
    width: '100%',
    paddingTop: 10.5,
    paddingBottom: 10.5,
    lineHeight: '1.1875em',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '$disabled&': {
      color: 'rgba(0, 0, 0, 0.38)',
    },
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  disabled: {},
}));
type StyleProps = Styles<typeof useStyles>;

export type SelectFilterButtonProps = OwnProps;
