import { Paper, TextFieldProps } from '@mui/material';
import React, { useCallback, useRef } from 'react';

import { DateRangePicker, DateRangePickerProps } from '../date-range-picker';
import { getRangeInputValue, TimeRange } from '../date-time-utils';
import { useRangeInputI18nContext } from '../pickers-common';
import { ClickAwayClose, PopoverInput } from '../popover-input';

interface OwnProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  dateRangePickerProps?: Omit<DateRangePickerProps, 'value' | 'onChange'>;
  color?: DateRangePickerProps['color'];
}

type PopoverInputProps = Omit<TextFieldProps, 'value' | 'onChange' | 'color'>;

/**
 * Date Range Input Props
 *
 * @public
 */
export type Props = React.PropsWithChildren<OwnProps> & PopoverInputProps;

/**
 * A component that responsible for rendering a whole pack of date-range-picker and popover.
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
 *     return <DateRangeInput value={value} onChange={onChange} />;
 * }
 * ```
 */
export function DateRangeInput(props: Props) {
  const {
    value,
    onChange,
    dateRangePickerProps,
    color = 'secondary',
    ...popoverInputProps
  } = props;
  const labels = {
    ...{ from: 'from', to: 'to' },
    ...useRangeInputI18nContext(),
  };
  const inputValue = getRangeInputValue(value, labels);

  const ignoreClickRef = useRef(false);

  const onOpen = useCallback(() => {
    ignoreClickRef.current = true;
    dateRangePickerProps?.datePickerProps?.onOpen?.();
  }, [dateRangePickerProps]);
  const onClose = useCallback(() => {
    ignoreClickRef.current = false;
    dateRangePickerProps?.datePickerProps?.onClose?.();
  }, [dateRangePickerProps]);

  return (
    <PopoverInput
      fixWidth
      color={color}
      {...popoverInputProps}
      value={inputValue}
    >
      <Paper elevation={5}>
        <ClickAwayClose ignoreClickRef={ignoreClickRef}>
          <div>
            <DateRangePicker
              value={value}
              onChange={onChange}
              color={color}
              {...dateRangePickerProps}
              datePickerProps={{
                ...dateRangePickerProps?.datePickerProps,
                onOpen,
                onClose,
              }}
            />
          </div>
        </ClickAwayClose>
      </Paper>
    </PopoverInput>
  );
}
