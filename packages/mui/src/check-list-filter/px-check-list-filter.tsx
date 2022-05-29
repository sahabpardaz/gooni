import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  GridProps,
  Paper,
  PaperProps,
} from '@mui/material';
import { useToggleAbleState } from '@sahab/react';
import * as React from 'react';
import { useMergedClasses } from 'tss-react';

import { PxOverlayScrollbar } from '../overlay-scrollbar';
import {
  ClickAwayClose,
  PopoverButton,
  PopoverButtonProps,
} from '../popover-input';
import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';
import { CheckboxList } from './check-list-box';
import { SelectOption } from './package-types';

interface OwnProps<V extends string>
  extends Omit<PopoverButtonProps, 'onChange'> {
  items: SelectOption<V>[];
  onChange?: (value: V[]) => void;
  helperText?: string;
  checked?: V[];
  initialChecked?: V[];
  onCheckItem?: (item: V) => void;
  onUnCheckedItem?: (item: V) => void;
  onReset?: () => void;
  resetLabel?: React.ReactNode;
  callOnChangeOnClose?: boolean;
  onClose?: () => void;
  showResetButton?: boolean;
  paperProps?: PaperProps;
  gridContainerProps?: GridProps;
  resetGridProps?: GridProps;
  optionsGridProps?: GridProps;
}

/**
 * @public
 */
export type Props<V extends string> = React.PropsWithChildren<OwnProps<V>> &
  StyleProps;

/**
 * PxCheckListFilter
 *
 * @public
 * @param {Props<T>} props
 * @returns {JSX.Element}
 * @example
 * ```tsx
 *  function UncontrolledComponent(props) {
 *   return <PxCheckListFilter items={props.items} initialValue={props.initialValue} onChange={props.onChange} />
 * }
 *
 * function ControlledComponent(props){
 *   return <PxCheckListFilter value={props.value} onChange={props.onChange}/>
 * }
 *
 * function GiveDataOnClose(props){
 *   return <PxCheckListFilter callOnChangeOnClose  onChange={props.onChange}/>
 * }
 * ```
 */
export function PxCheckListFilter<V extends string>(props: Props<V>) {
  const {
    items,
    onChange,
    helperText,
    checked,
    fixWidth = true,
    initialChecked = [],
    onCheckItem,
    onUnCheckedItem,
    onReset,
    resetLabel = 'reset',
    callOnChangeOnClose = false,
    buttonContent = '',
    onClose,
    showResetButton = true,
    paperProps,
    gridContainerProps,
    resetGridProps,
    optionsGridProps,
    ...popoverButtonProps
  } = props;

  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);

  const { values, setValues } = useToggleAbleState({
    initialValue: initialChecked,
    onChange: callOnChangeOnClose ? undefined : onChange,
    value: checked,
  });

  const handleReset = () => {
    setValues([]);
    onReset?.();
  };

  const handleClose = () => {
    if (callOnChangeOnClose) {
      onChange?.(values);
    }
    onClose?.();
  };

  return (
    <FormControl className={classes.root} variant="outlined" fullWidth>
      <PopoverButton
        fixWidth={fixWidth}
        buttonContent={buttonContent}
        {...popoverButtonProps}
        classes={{
          root: classes.popperRoot,
          buttonRoot: classes.buttonRoot,
          buttonRootFullWidth: classes.buttonRootFullWidth,
          disabled: classes.disabled,
          label: classes.label,
          popper: classes.popper,
          rootFullWidth: classes.rootFullWidth,
        }}
      >
        <ClickAwayClose onClose={handleClose}>
          <Paper {...paperProps}>
            <Grid container spacing={1} {...gridContainerProps}>
              {showResetButton && (
                <Grid item xs={12} {...resetGridProps}>
                  <Box
                    className={classes.resetRoot}
                    display="flex"
                    flexDirection="row-reverse"
                    padding={1}
                  >
                    <Button
                      className={classes.resetButton}
                      onClick={handleReset}
                      size="small"
                    >
                      {resetLabel}
                    </Button>
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} {...optionsGridProps}>
                <Box component={PxOverlayScrollbar} width="100%">
                  <CheckboxList
                    classes={{
                      root: classes.checkboxListRoot,
                      checkboxListItemRoot: classes.checkboxListItemRoot,
                    }}
                    items={items}
                    checked={values}
                    onChange={setValues}
                    onAdd={onCheckItem}
                    onRemove={onUnCheckedItem}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </ClickAwayClose>
      </PopoverButton>
      {helperText && (
        <FormHelperText className={classes.helperText}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

const useStyles = makeStyles({ name: 'PxCheckListFilter' })(() => ({
  checkboxListRoot: {},
  checkboxListItemRoot: {},
  buttonRoot: {},
  buttonRootFullWidth: {},
  popperRoot: {},
  label: {},
  disabled: {},
  popper: {},
  rootFullWidth: {},
  resetRoot: {},
  resetButton: {},
  helperText: {},
  root: {},
}));
type StyleProps = Styles<typeof useStyles>;
