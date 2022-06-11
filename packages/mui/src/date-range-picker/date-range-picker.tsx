import { Button, Grid } from '@mui/material';
import { endOfDay, startOfDay } from 'date-fns-jalali';
import React, { useCallback } from 'react';
import { useMergedClasses } from 'tss-react';

import { DatePicker, DatePickerProps } from '../date-picker';
import { TimeRange } from '../date-time-utils';
import { RangePickerLabel, useRangePickerI18nContext } from '../pickers-common';
import { Styles } from '../react-types';
import { makeStyles } from '../tss-mui';

type PickerProps = Partial<Omit<DatePickerProps<Date>, 'value' | 'onChange'>>;

interface OwnProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  // shared props between to DatePickers
  datePickerProps?: PickerProps;
  fromDatePickerProps?: PickerProps;
  toDatePickerProps?: PickerProps;
  labels?: RangePickerLabel;
  color?: DatePickerProps<Date>['color'];
}

/**
 * Date Range Picker Props
 *
 * @public
 */
export type Props = React.PropsWithChildren<OwnProps> & StyleProps;

/**
 * A component that responsible for render date picker.
 *
 * @public
 * @param {Props} props date-range-picker props.
 * @returns {JSX.Element}
 * @example
 * Here's an example
 * ```tsx
 * function MyComponent(){
 *     const [value, onChange] = useState<TimeRange>({ to: null, from: null });
 *     return <DateRangePicker value={value} onChange={onChange} />;
 * }
 * ```
 */
export function DateRangePicker(props: Props) {
  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);
  const {
    value,
    onChange,
    datePickerProps,
    fromDatePickerProps,
    toDatePickerProps,
    labels,
    color = 'secondary',
  } = props;

  const { from, to } = value;

  const onChangeFrom = useCallback(
    (fromValue: Date | null) => {
      onChange({
        to,
        from: fromValue ? startOfDay(fromValue) : null,
      });
    },
    [onChange, to],
  );

  const onChangeTo = useCallback(
    (toValue: Date | null) => {
      onChange({ to: toValue ? endOfDay(toValue) : null, from });
    },
    [onChange, from],
  );

  const onReset = useCallback(() => {
    onChange({ from: null, to: null });
  }, [onChange]);

  const labelsWithTranslate: Required<RangePickerLabel> = {
    ...{
      resetLabel: 'Reset',
      fromLabel: 'From Date',
      toLabel: 'To Date',
    },
    ...useRangePickerI18nContext(),
    ...labels,
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.header}>
          <Button size="small" onClick={onReset}>
            {labelsWithTranslate.resetLabel}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <DatePicker
            variant="dialog"
            maxDate={to || undefined}
            label={labelsWithTranslate.fromLabel}
            color={color}
            {...datePickerProps}
            {...fromDatePickerProps}
            value={from}
            onChange={onChangeFrom}
          />
        </Grid>

        <Grid item xs={12}>
          <DatePicker
            variant="dialog"
            minDate={from || undefined}
            label={labelsWithTranslate.toLabel}
            color={color}
            {...datePickerProps}
            {...toDatePickerProps}
            value={to}
            onChange={onChangeTo}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({ name: 'DateRangePicker' })((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  header: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
}));
type StyleProps = Styles<typeof useStyles>;
