import {
  alpha,
  Button,
  ButtonProps,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import classNames from 'clsx';
import React, { useCallback } from 'react';
import { useMergedClasses } from 'tss-react';
import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';
import { useToggleButtonContext } from './toggle-button-context';

interface OwnProps<T extends string>
  extends Omit<ButtonProps, 'size' | 'onClick' | 'title'> {
  value: T;
  active?: boolean;
  focused?: boolean;
  disabled?: boolean;
  title: React.ReactNode;
  onClick?: (value: T) => void;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
}

/**
 * Button Props
 *
 * @public
 */
export type Props<T extends string> = React.PropsWithChildren<OwnProps<T>> &
  StyleProps;

/**
 * Button section of field
 *
 * @public
 * @param {Props<T>} props
 * @returns {JSX.Element}
 */
export const ToggleButton = <T extends string>(props: Props<T>) => {
  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);

  const {
    disabled: ctxDisabled,
    onClick: ctxOnclick,
    value: ctxValue,
    color: ctxColor,
  } = useToggleButtonContext();

  const {
    value,
    color = ctxColor,
    active = ctxValue === props.value,
    disabled = ctxDisabled,
    onClick,
    title,
    tooltipProps,
    children,
  } = props;

  const handleClick = useCallback(() => {
    ctxOnclick(value);
    onClick?.(value);
  }, [onClick, value, ctxOnclick]);

  return (
    <Tooltip
      className={classes.tooltip}
      placement="top"
      title={title ?? ''}
      {...tooltipProps}
    >
      <div>
        {/* 
          @see https://material-ui.com/components/tooltips/#disabled-elements 
          this div is here to ensure that even with disabled button, tooltip works */}
        <Button
          className={classNames(classes.root, {
            [classes.active]: active,
            [classes.colorPrimary]: color === 'primary',
            [classes.colorSecondary]: color === 'secondary',
          })}
          disabled={disabled}
          color={color}
          onClick={handleClick}
        >
          {children}
        </Button>
      </div>
    </Tooltip>
  );
};

const useStyles = makeStyles<void, 'active'>({ name: 'ToggleButton' })(
  (theme, _, classes) => ({
    root: {
      height: '100%',
      borderRadius: 0,
      color: theme.palette.grey[500],
      minWidth: 0,
      '&:hover': {
        backgroundColor: alpha(theme.palette.grey[500], 0.2),
      },
    },
    active: {},
    colorPrimary: {
      [`&.${classes.active}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.2),
        color: theme.palette.primary.main,
      },
    },
    colorSecondary: {
      [`&.${classes.active}`]: {
        backgroundColor: alpha(theme.palette.secondary.main, 0.2),
        color: theme.palette.secondary.main,
      },
    },
    tooltip: {},
  }),
);
type StyleProps = Styles<typeof useStyles>;
