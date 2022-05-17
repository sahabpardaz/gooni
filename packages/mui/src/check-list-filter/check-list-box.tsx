import * as React from 'react';
import {
  CheckboxProps,
  List,
  ListItemText,
  ListItemTextProps,
  ListProps,
} from '@mui/material';
import { useMergedClasses } from 'tss-react';
import { useToggleAbleState } from '@sahab/react';

import { CheckboxListItem } from './check-box-list-item';
import { SelectOption } from './package-types';
import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';

interface OwnProps<V extends string = string> {
  items: SelectOption<V>[];
  checked?: V[];
  onChange?: (value: V[]) => void;
  checkboxProps?: Omit<CheckboxProps, 'checked'>;
  listProps?: ListProps;
  listItemTextProps?: ListItemTextProps;
  initialChecked?: V[];
  onAdd?: (value: V) => void;
  onRemove?: (value: V) => void;
}

/**
 * CheckboxList Props
 *
 * @public
 */
export type Props<V extends string = string> = React.PropsWithChildren<
  OwnProps<V>
> &
  StyleProps;

/**
 * CheckboxList
 *
 * @public
 * @param {Props<T>} props
 * @returns {JSX.Element}
 * @example
 * ```tsx
 *  function UncontrolledComponent(props) {
 *   return <CheckboxList initialValue={props.initialValue} onChange={props.onChange} />
 * }
 *
 * function ControlledComponent(props){
 *   return <CheckboxList value={props.value} onChange={props.onChange}/>
 * }
 * ```
 */
export function CheckboxList<V extends string = string>(props: Props<V>) {
  const {
    items,
    checked: checkedProps,
    onChange,
    listProps,
    checkboxProps,
    initialChecked = [],
    listItemTextProps,
    onAdd,
    onRemove,
  } = props;
  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);
  const { toggleByValue, values: checked } = useToggleAbleState({
    initialValue: initialChecked,
    value: checkedProps,
    onChange,
    options: {
      multiple: true,
      onAdd,
      onRemove,
    },
  });

  const handleClick = (value: V) => () => {
    toggleByValue(value);
  };

  return (
    <List {...listProps} className={classes.root}>
      {items.map(({ label, value }) => (
        <CheckboxListItem
          checked={checked.includes(value)}
          onClick={handleClick(value)}
          checkboxProps={checkboxProps}
          key={value}
          classes={{ root: classes.checkboxListItemRoot }}
        >
          <ListItemText
            primary={label}
            primaryTypographyProps={{ variant: 'body2' }}
            {...listItemTextProps}
          />
        </CheckboxListItem>
      ))}
    </List>
  );
}

const useStyles = makeStyles({ name: 'CheckboxList' })((theme) => ({
  root: {},
  checkboxListItemRoot: {
    padding: 0,
    paddingRight: theme.spacing(),
  },
}));
type StyleProps = Styles<typeof useStyles>;
