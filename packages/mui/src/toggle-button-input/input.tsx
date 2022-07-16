import {
  ButtonProps,
  FormHelperText,
  TextFieldProps,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import { useDelayedValue } from '@my-sahab/react';
import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { useMergedClasses } from 'tss-react';
import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';
import {
  OutlinedTextField,
  type Props as CustomTextFieldProps,
} from './OutlinedTextField';

interface OwnProps extends Omit<CustomTextFieldProps, 'color'> {
  color?: ButtonProps['color'] & CustomTextFieldProps['color'];
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
              color={color}
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

type ChildClassName =
  | 'disabled'
  | 'focused'
  | 'error'
  | 'toggleButtonsContainer'
  | 'inputs'
  | 'muiOutlinedInputNotchedOutline'
  | 'marginNormal'
  | 'marginDense'
  | 'colorPrimary'
  | 'colorSecondary';

const useStyles = makeStyles<void, ChildClassName>({ name: 'Input' })(
  (theme, _props, classes) => ({
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
      [`&:hover .${classes.toggleButtonsContainer}`]: {
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },
      [`.${classes.disabled} &:hover .${classes.toggleButtonsContainer}`]: {
        borderColor: 'rgba(0, 0, 0, 0.26)',
      },
      [`.${classes.error} &:hover .${classes.toggleButtonsContainer}`]: {
        borderColor: theme.palette.error.main,
      },
      [`&:hover .${classes.muiOutlinedInputNotchedOutline}`]: {
        borderColor: 'rgba(0, 0, 0, 0.87)',
      },
      [`.${classes.disabled} &:hover .${classes.muiOutlinedInputNotchedOutline}`]:
        {
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
      [`.${classes.focused} &`]: {
        borderWidth: 2,
        borderRightWidth: 0,
      },
      [`.${classes.focused}.${classes.colorPrimary} &`]: {
        borderColor: theme.palette.primary.main,
      },
      [`.${classes.focused}.${classes.colorSecondary} &`]: {
        borderColor: theme.palette.secondary.main,
      },
      [`.${classes.focused}.${classes.error} &`]: {
        borderColor: theme.palette.error.main,
      },
      [`.${classes.error} &`]: {
        borderColor: theme.palette.error.main,
      },
      [`.${classes.marginNormal} &`]: {
        marginTop: 16,
        marginBottom: 8,
      },
      [`.${classes.marginDense} &`]: {
        marginTop: 8,
        marginBottom: 4,
      },
    },

    tooltip: {
      borderColor: theme.palette.grey[500],
    },
    muiInputLabelShrink: {
      [`.${classes.colorPrimary} &`]: {
        borderColor: theme.palette.primary.main,
      },
      [`.${classes.colorSecondary} &`]: {
        borderColor: theme.palette.secondary.main,
      },
    },

    muiOutlinedInputNotchedOutline: {
      borderLeft: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      transition: `padding-left .2s cubic-bezier(0.0, 0, 0.2, 1) 0ms,
                 border-color .2s cubic-bezier(0.0, 0, 0.2, 1) 0ms`,
      [`.${classes.focused} &`]: {
        borderWidth: '2px !important',
        top: -4.5,
      },
      [`.${classes.focused}.${classes.colorPrimary} &`]: {
        borderColor: `${theme.palette.primary.main} !important`,
      },
      [`.${classes.focused}.${classes.colorSecondary} &`]: {
        borderColor: `${theme.palette.secondary.main} !important`,
      },
      [`.${classes.error} &`]: {
        borderColor: `${theme.palette.error.main} !important`,
      },
      [`.${classes.focused}.${classes.error} &`]: {
        borderColor: `${theme.palette.error.main} !important`,
      },
      [`.${classes.focused}.${classes.marginDense} &`]: {
        bottom: -0.5,
      },
    },

    muiInputLabelFocused: {
      [`.${classes.colorPrimary} &`]: {
        color: theme.palette.primary.main,
      },
      [`.${classes.colorSecondary} &`]: {
        color: theme.palette.secondary.main,
      },
      [`.${classes.error} &`]: {
        color: `${theme.palette.error.main} !important`,
      },
    },

    muiInputLabelFormControl: {
      [`.${classes.disabled} &`]: {
        color: `rgba(0, 0, 0, 0.26)`,
      },
    },

    textFieldRoot: {},

    tooltipWrapper: {
      flex: 1,
    },
  }),
);
type StyleProps = Styles<typeof useStyles>;

export type InputProps = OwnProps;
