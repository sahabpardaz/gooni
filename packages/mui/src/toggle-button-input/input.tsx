import {
  ButtonProps,
  FormHelperText,
  TextFieldProps,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import { useDelayedValue } from '@sahab/react';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useMergedClasses } from 'tss-react';

import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';
import {
  OutlinedTextField,
  Props as CustomTextFieldProps,
} from './OutlinedTextField';

interface OwnProps extends Omit<CustomTextFieldProps, 'color'> {
  color?: ButtonProps['color'];
  inputDisabled?: boolean;
  tooltipProps?: Omit<TooltipProps, 'children'>;
  TextFieldComponent?: React.ComponentType<CustomTextFieldProps>;
}

/**
 * Input Props
 *
 * @public
 */
export type Props = React.PropsWithChildren<OwnProps> & StyleProps;

/**
 * Input section of field
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 */
export function Input(props: Props) {
  const {
    children,
    color = 'primary',
    disabled = false,
    error,
    FormHelperTextProps,
    fullWidth = false,
    helperText,
    id,
    inputDisabled = false,
    InputProps,
    InputLabelProps,
    margin = 'none',
    onBlur,
    onFocus,
    tooltipProps = { title: '' },
    size,
    value,
    TextFieldComponent = OutlinedTextField,
    ...rest
  } = props;

  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);

  const [focused, setFocused] = useState(false);

  const handleFocus: TextFieldProps['onFocus'] = useCallback(
    (event) => {
      setFocused(true);
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleBlur: TextFieldProps['onFocus'] = useCallback(
    (event) => {
      setFocused(false);
      onBlur?.(event);
    },
    [onBlur],
  );

  const delayedFocused = useDelayedValue(focused, {
    negativeEdgeDelay: 150,
    positiveEdgeDelay: 0,
  });

  // To see how @material-ui handles OutlinedInput follow the link below
  // @link https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/OutlinedInput/OutlinedInput.js#L121
  const notched = InputProps?.notched;
  const shrink = InputLabelProps?.shrink;
  const filled = !!value;
  const startAdornment = InputProps?.startAdornment;
  const delayedNotched =
    typeof notched !== 'undefined'
      ? notched
      : Boolean(delayedFocused || filled || startAdornment);
  const delayedShrink = typeof shrink !== 'undefined' ? shrink : delayedNotched;

  return (
    <div
      className={clsx(classes.root, {
        [classes.colorPrimary]: color === 'primary',
        [classes.colorSecondary]: color === 'secondary',
        [classes.disabled]: disabled,
        [classes.error]: error,
        [classes.focused]: delayedFocused,
        [classes.fullWidth]: fullWidth,
        [classes.inputDisabled]: inputDisabled,
        [classes.marginDense]: margin === 'dense',
        [classes.marginNormal]: margin === 'normal',
        [classes.sizeSmall]: size === 'small',
      })}
      data-testid="root"
    >
      <div className={classes.inputs}>
        <div className={classes.toggleButtonsContainer}>{children}</div>
        <Tooltip
          placement="top"
          {...tooltipProps}
          className={clsx({ [classes.tooltip]: !!tooltipProps.title })}
        >
          <div className={classes.tooltipWrapper}>
            <TextFieldComponent
              value={value}
              error={error}
              fullWidth={fullWidth}
              disabled={inputDisabled}
              margin={margin}
              classes={{ root: classes.textFieldRoot }}
              InputProps={{
                ...InputProps,
                notched: delayedNotched,
                classes: {
                  ...InputProps?.classes,
                  notchedOutline: clsx(
                    classes.muiOutlinedInputNotchedOutline,
                    InputProps?.classes?.notchedOutline,
                  ),
                },
              }}
              InputLabelProps={{
                ...InputLabelProps,
                focused: delayedFocused,
                shrink: delayedShrink,
                classes: {
                  ...InputLabelProps?.classes,
                  shrink: clsx(
                    classes.muiInputLabelShrink,
                    InputLabelProps?.classes?.shrink,
                  ),
                  focused: clsx(
                    classes.muiInputLabelFocused,
                    InputLabelProps?.classes?.focused,
                  ),
                  formControl: clsx(
                    classes.muiInputLabelFormControl,
                    InputLabelProps?.classes?.formControl,
                  ),
                },
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...rest}
            />
          </div>
        </Tooltip>
      </div>
      {helperText && (
        <FormHelperText {...FormHelperTextProps} error={error}>
          {helperText}
        </FormHelperText>
      )}
    </div>
  );
}

const useStyles = makeStyles({ name: 'Input' })((theme) => ({
  /* Styles applied to the root element. */
  root: {},
  /* Styles applied to the root element if `fullWidth={true}`. */
  fullWidth: {
    width: '100%',
  },
  /* Pseudo-class applied to the root element if `error={true}`. */
  error: {},
  /* Pseudo-class applied to the root element if `focused={true}`. */
  focused: {},
  /* Pseudo-class applied to the root element if `color="primary"`. */
  colorPrimary: {},
  /* Pseudo-class applied to the root element if `color="secondary"`. */
  colorSecondary: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Pseudo-class applied to the root element if `inputDisabled={true}`. */
  inputDisabled: {},
  /* Pseudo-class applied to the root element if `margin="normal"`. */
  marginNormal: {},
  /* Pseudo-class applied to the root element if `margin="dense"`. */
  marginDense: {},
  /* Pseudo-class applied to the root element if `size="small"`. */
  sizeSmall: {},

  inputs: {
    width: '100%',
    display: 'inline-flex',
    '&:hover $toggleButtonsContainer': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '$disabled &:hover $toggleButtonsContainer': {
      borderColor: 'rgba(0, 0, 0, 0.26)',
    },
    '$error &:hover $toggleButtonsContainer': {
      borderColor: theme.palette.error.main,
    },
    '&:hover $muiOutlinedInputNotchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '$disabled &:hover $muiOutlinedInputNotchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.26)',
    },
  },

  toggleButtonsContainer: {
    display: 'inline-flex',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.23)',
    transition: 'border-color .2s',
    margin: 0,
    '$focused &': {
      borderWidth: 2,
      borderRightWidth: 0,
    },
    '$focused$colorPrimary &': {
      borderColor: theme.palette.primary.main,
    },
    '$focused$colorSecondary &': {
      borderColor: theme.palette.secondary.main,
    },
    '$focused$error &': {
      borderColor: theme.palette.error.main,
    },
    '$error &': {
      borderColor: theme.palette.error.main,
    },
    '$marginNormal &': {
      marginTop: 16,
      marginBottom: 8,
    },
    '$marginDense &': {
      marginTop: 8,
      marginBottom: 4,
    },
  },

  tooltip: {
    borderColor: theme.palette.grey[500],
  },
  muiInputLabelShrink: {
    '$colorDefault &': {
      borderColor: theme.palette.grey[500],
    },
    '$colorPrimary &': {
      borderColor: theme.palette.primary.main,
    },
    '$colorSecondary &': {
      borderColor: theme.palette.secondary.main,
    },
  },

  muiOutlinedInputNotchedOutline: {
    borderLeft: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    transition: `padding-left .2s cubic-bezier(0.0, 0, 0.2, 1) 0ms,
                 border-color .2s cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
    '$focused &': {
      borderWidth: '2px !important',
      top: -4.5,
    },
    '$focused$colorPrimary &': {
      borderColor: `${theme.palette.primary.main} !important`,
    },
    '$focused$colorSecondary &': {
      borderColor: `${theme.palette.secondary.main} !important`,
    },
    '$error &': {
      borderColor: `${theme.palette.error.main} !important`,
    },
    '$focused$error &': {
      borderColor: `${theme.palette.error.main} !important`,
    },
    '$focused$marginDense &': {
      bottom: -0.5,
    },
  },

  muiInputLabelFocused: {
    '$colorPrimary &': {
      color: theme.palette.primary.main,
    },
    '$colorSecondary &': {
      color: theme.palette.secondary.main,
    },
    '$error &': {
      color: `${theme.palette.error.main} !important`,
    },
  },

  muiInputLabelFormControl: {
    '$disabled &': {
      color: `rgba(0, 0, 0, 0.26)`,
    },
  },

  textFieldRoot: {},

  tooltipWrapper: {
    flex: 1,
  },
}));
type StyleProps = Styles<typeof useStyles>;

export type InputProps = OwnProps;
