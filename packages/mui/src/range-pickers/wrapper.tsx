import { Button, Grid } from '@mui/material';
import { useLocaleText } from '@mui/x-date-pickers/internals';
import { endOfDay, startOfDay } from 'date-fns-jalali';
import * as React from 'react';
import { ThemeColorSwapper, ThemeColorSwapperProps } from 'src/shared';
import { PickerTypes, TimeRange } from 'src/shared/pickers';
import { DatePicker, DateTimePicker, TimePicker } from 'src/simple-pickers';
import { WrappedPickerProps } from 'src/simple-pickers/wrapper';
import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';

type PickerProps<P extends PickerTypes, In, Out> = Omit<
  WrappedPickerProps<P, In, Out>,
  'multiLocale' | 'value' | 'onChange'
>;

type Props<P extends PickerTypes, In, Out> = {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  /** shared props between two pickers */
  pickerProps?: PickerProps<P, In, Out>;
  fromPickerProps?: PickerProps<P, In, Out>;
  toPickerProps?: PickerProps<P, In, Out>;
  color?: ThemeColorSwapperProps['color'];
} & (P extends 'TIME' ? unknown : { multiLocale?: boolean }) &
  StyleProps;

export { Props as WrappedRangePickerProps };

const pickers: Record<PickerTypes, React.ElementType> = {
  TIME: TimePicker,
  DATE: DatePicker,
  DATETIME: DateTimePicker,
};

export function wrapRangePicker<P extends PickerTypes>(pickerType: P) {
  const Picker = pickers[pickerType];

  function WrappedRangePicker<In, Out>(props: Props<P, In, Out>) {
    let { classes } = useStyles();

    const {
      value,
      onChange,
      pickerProps,
      fromPickerProps,
      toPickerProps,
      color = 'secondary',
      ...rest
    } = props;

    const { from, to } = value;

    const onChangeFrom = React.useCallback(
      (fromValue: Date | null) => {
        onChange({
          from:
            pickerType === 'DATE'
              ? fromValue && startOfDay(fromValue)
              : fromValue,
          to,
        });
      },
      [onChange, to],
    );

    const onChangeTo = React.useCallback(
      (toValue: Date | null) => {
        onChange({
          from,
          to: pickerType === 'DATE' ? toValue && endOfDay(toValue) : toValue,
        });
      },
      [onChange, from],
    );

    const onReset = React.useCallback(() => {
      onChange({ from: null, to: null });
    }, [onChange]);

    const { rangePickerLabels: labels } = useLocaleText();

    const { fromLimits, toLimits } = React.useMemo(() => {
      const propsNameMap: Record<PickerTypes, Record<'min' | 'max', string>> = {
        TIME: { min: 'minTime', max: 'maxTime' },
        DATE: { min: 'minDate', max: 'maxDate' },
        DATETIME: { min: 'minDateTime', max: 'maxDateTime' },
      };
      return {
        fromLimits: { [propsNameMap[pickerType].max]: to || undefined },
        toLimits: { [propsNameMap[pickerType].min]: from || undefined },
      };
    }, [to, from]);

    return (
      <div className={classes.root}>
        <Grid className={classes.container} container>
          <Grid item xs={12} className={classes.header}>
            <Button
              size="small"
              onClick={onReset}
              className={classes.resetBtn}
              data-testid="reset-btn"
            >
              {labels?.resetLabel}
            </Button>
          </Grid>

          <ThemeColorSwapper color={color}>
            <Grid className={classes.fromTime} item xs={12}>
              {/* @ts-ignore */}
              <Picker
                {...fromLimits}
                label={
                  typeof labels?.fromLabel === 'function'
                    ? labels?.fromLabel?.(pickerType)
                    : labels?.fromLabel
                }
                {...pickerProps}
                {...fromPickerProps}
                value={from}
                onChange={onChangeFrom}
                {...rest}
              />
            </Grid>

            <Grid className={classes.toTime} item xs={12}>
              {/* @ts-ignore */}
              <Picker
                {...toLimits}
                label={
                  typeof labels?.toLabel === 'function'
                    ? labels?.toLabel?.(pickerType)
                    : labels?.toLabel
                }
                {...pickerProps}
                {...toPickerProps}
                value={to}
                onChange={onChangeTo}
                {...rest}
              />
            </Grid>
          </ThemeColorSwapper>
        </Grid>
      </div>
    );
  }

  return WrappedRangePicker;
}

const useStyles = makeStyles({ name: 'RangePicker' })((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  header: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  container: {},
  resetBtn: {},
  fromTime: {},
  toTime: {},
}));
type StyleProps = Styles<typeof useStyles>;
