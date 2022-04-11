import React, { useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import { Moment } from 'moment-jalaali';
import { useMergedClasses } from 'tss-react';

import { CalendarTypes, LanguageTypes, defaultLocale } from '../constant-types';
import { DatePicker, DatePickerProps } from '../date-picker';
import { RangePickerLabel, useRangePickerI18nContext } from '../pickers-common';
import { Styles } from '../react-types';
import { TimeRange } from '../date-time-utils';
import { makeStyles } from '../tss-mui';

type PickerProps = Partial<Omit<DatePickerProps, 'value' | 'onChange'>>;

interface OwnProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  // shared props between to DatePickers
  datePickerProps?: PickerProps;
  fromDatePickerProps?: PickerProps;
  toDatePickerProps?: PickerProps;
  localeCalendar?: CalendarTypes;
  localeLanguage?: LanguageTypes;
  labels?: RangePickerLabel;
  color?: DatePickerProps['color'];
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
    localeCalendar = defaultLocale.calendar,
    localeLanguage = defaultLocale.language,
    labels,
    color = 'secondary',
  } = props;

  const { from, to } = value;

  const onChangeFrom = useCallback(
    (fromValue: Moment | null) => {
      onChange({ to, from: fromValue?.startOf('day') ?? null });
    },
    [onChange, to],
  );

  const onChangeTo = useCallback(
    (toValue: Moment | null) => {
      onChange({ to: toValue?.endOf('day') ?? null, from });
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
            clearable
            variant="dialog"
            maxDate={to || undefined}
            label={labelsWithTranslate.fromLabel}
            color={color}
            {...datePickerProps}
            {...fromDatePickerProps}
            localeLanguage={localeLanguage}
            localeCalendar={localeCalendar}
            value={from}
            onChange={onChangeFrom}
          />
        </Grid>

        <Grid item xs={12}>
          <DatePicker
            clearable
            variant="dialog"
            minDate={from || undefined}
            label={labelsWithTranslate.toLabel}
            color={color}
            {...datePickerProps}
            {...toDatePickerProps}
            localeLanguage={localeLanguage}
            localeCalendar={localeCalendar}
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
