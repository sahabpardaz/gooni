import { Button, Grid, GridProps } from '@mui/material';
import { Moment } from 'moment-jalaali';
import * as React from 'react';
import { useMergedClasses } from 'tss-react';

import { TimeRange } from '../date-time-utils';
import {
  RangePickerLabel,
  ThemeColorSwapperProps,
  useRangePickerI18nContext,
} from '../pickers-common';
import { Styles } from '../react-types';
import { TimePicker, TimePickerProps } from '../time-picker';
import { makeStyles } from '../tss-mui';

type PickerProps = Partial<Omit<TimePickerProps<Moment>, 'value' | 'onChange'>>;

interface OwnProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  timePickerProps?: PickerProps;
  fromTimePickerProps?: PickerProps;
  toTimePickerProps?: PickerProps;
  labels?: RangePickerLabel;
  color?: ThemeColorSwapperProps['color'];
  gridContainerProps?: GridProps;
}

/**
 * Time Range Picker Props
 *
 * @public
 */
export type Props = React.PropsWithChildren<OwnProps> & StyleProps;

/**
 * A component that responsible for render time picker.
 *
 * @public
 * @param {Props} props time-range-picker props.
 * @returns {JSX.Element}
 * @example
 * Here's an example
 * ```tsx
 * function MyComponent(){
 *     const [value, onChange] = useState<TimeRange>({ to: null, from: null });
 *     return <TimeRangePicker value={value} onChange={onChange} />;
 * }
 * ```
 */
export function TimeRangePicker(props: Props) {
  let { classes } = useStyles();
  classes = useMergedClasses(classes, props.classes);

  const {
    value,
    onChange,
    timePickerProps,
    fromTimePickerProps,
    toTimePickerProps,
    labels,
    color = 'secondary',
  } = props;

  const { from, to } = value;

  const onChangeFrom = React.useCallback(
    (fromValue: Moment | null) => {
      onChange({ to, from: fromValue });
    },
    [onChange, to],
  );

  const onChangeTo = React.useCallback(
    (toValue: Moment | null) => {
      onChange({ to: toValue, from });
    },
    [onChange, from],
  );

  const onReset = React.useCallback(() => {
    onChange({ from: null, to: null });
  }, [onChange]);

  const labelsWithTranslate = {
    ...{
      resetLabel: 'Reset',
      fromLabel: 'From Time',
      toLabel: 'To Time',
    },
    ...useRangePickerI18nContext(),
    ...labels,
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container>
        <Grid item xs={12} className={classes.header}>
          <Button
            data-testid="resetBtn"
            size="small"
            onClick={onReset}
            className={classes.resetBtn}
          >
            {labelsWithTranslate.resetLabel}
          </Button>
        </Grid>

        <Grid className={classes.fromTime} item xs={12}>
          <TimePicker
            variant="dialog"
            label={labelsWithTranslate.fromLabel}
            color={color}
            {...timePickerProps}
            {...fromTimePickerProps}
            value={from}
            onChange={onChangeFrom}
          />
        </Grid>

        <Grid className={classes.toTime} item xs={12}>
          <TimePicker
            variant="dialog"
            label={labelsWithTranslate.toLabel}
            color={color}
            {...timePickerProps}
            {...toTimePickerProps}
            value={to}
            onChange={onChangeTo}
          />
        </Grid>
      </Grid>
    </div>
  );
}

const useStyles = makeStyles({ name: 'TimeRangePicker' })((theme) => ({
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
