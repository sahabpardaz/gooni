import { Box, Paper, TextFieldProps } from '@mui/material';
import React, { useCallback, useRef } from 'react';

import {
  formatDateRange,
  getRangeInputValue,
  RangeInputFormatter,
  TimeRange,
} from '../date-time-utils';
import { useRangeInputI18nContext } from '../pickers-common';
import { ClickAwayClose, PopoverInput } from '../popover-input';
import { TimeRangePicker, TimeRangePickerProps } from '../time-range-picker';

interface OwnProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  timeRangePickerProps?: Omit<TimeRangePickerProps, 'value' | 'onChange'>;
  formatter?: RangeInputFormatter;
  color?: TimeRangePickerProps['color'];
}

type PopoverInputProps = Omit<TextFieldProps, 'value' | 'onChange' | 'color'>;

/**
 * Time Range Input Props
 *
 * @public
 */
export type Props = React.PropsWithChildren<OwnProps> & PopoverInputProps;

/**
 * A component that responsible for rendering a whole pack of time-range-picker and popover.
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 * @example
 * Here's an example
 * ```tsx
 * function MyComponent(){
 *     const [value, setValue] = useState<TimeRange>({ from: null, to: null });
 *     const onChange = useCallback((value: TimeRange) => {
 *           setValue(value);
 *         }, []);
 *     return <TimeRangeInput value={value} onChange={onChange} />;
 * }
 * ```
 */
export function TimeRangeInput(props: Props) {
  const {
    value,
    onChange,
    timeRangePickerProps = {},
    formatter = (timeRange) => formatDateRange(timeRange, 'HH:mm'),
    color = 'secondary',
    ...popoverInputProps
  } = props;
  const labels = {
    ...{ from: 'from', to: 'to' },
    ...useRangeInputI18nContext(),
  };

  const inputValue = getRangeInputValue(value, labels, formatter);

  const ignoreClickRef = useRef(false);

  const onOpen = useCallback(() => {
    ignoreClickRef.current = true;
    timeRangePickerProps?.timePickerProps?.onOpen?.();
  }, [timeRangePickerProps]);

  const onClose = useCallback(() => {
    ignoreClickRef.current = false;
    timeRangePickerProps?.timePickerProps?.onClose?.();
  }, [timeRangePickerProps]);

  return (
    <Box>
      <PopoverInput
        fixWidth
        color={color}
        {...popoverInputProps}
        value={inputValue}
      >
        <Paper elevation={5}>
          <ClickAwayClose ignoreClickRef={ignoreClickRef}>
            <div>
              <TimeRangePicker
                value={value}
                onChange={onChange}
                color={color}
                {...timeRangePickerProps}
                timePickerProps={{
                  ...timeRangePickerProps?.timePickerProps,
                  onOpen,
                  onClose,
                }}
              />
            </div>
          </ClickAwayClose>
        </Paper>
      </PopoverInput>
    </Box>
  );
}
