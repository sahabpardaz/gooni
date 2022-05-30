import { OutlinedTextFieldProps, TextField } from '@mui/material';
import clsx from 'clsx';

import { makeStyles } from '../..';

export const RightInput = (props: OutlinedTextFieldProps) => {
  const { classes } = useStyles();
  const { InputProps, ...others } = props;
  return (
    <TextField
      {...others}
      variant="outlined"
      classes={{ root: classes.root }}
      InputProps={{
        ...InputProps,
        classes: {
          ...InputProps?.classes,
          notchedOutline: clsx(
            classes.notchedOutline,
            InputProps?.classes?.notchedOutline,
          ),
        },
      }}
    />
  );
};

const useStyles = makeStyles({ name: 'RightInput' })(() => ({
  root: {
    width: '50%',
  },
  notchedOutline: {
    borderRight: 0,
    borderRadius: 0,
  },
}));
