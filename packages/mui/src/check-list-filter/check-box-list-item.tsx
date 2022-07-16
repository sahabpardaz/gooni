import { Checkbox, CheckboxProps, ListItem, ListItemIcon } from '@mui/material';
import React from 'react';
import { useMergedClasses } from 'tss-react';
import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';

interface OwnProps {
  checked?: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  checkboxProps?: Omit<CheckboxProps, 'checked'>;
}

type Props = React.PropsWithChildren<OwnProps> & StyleProps;

export function CheckboxListItem(props: Props) {
  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);

  const { checked, onClick, checkboxProps, children } = props;

  return (
    <ListItem button onClick={onClick} classes={{ root: classes.root }}>
      <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
        <Checkbox checked={checked} size="small" {...checkboxProps} />
      </ListItemIcon>
      {children}
    </ListItem>
  );
}

const useStyles = makeStyles({ name: 'CheckboxListItem' })(() => ({
  root: {},
  listItemIconRoot: {
    minWidth: 0,
  },
}));
type StyleProps = Styles<typeof useStyles>;
