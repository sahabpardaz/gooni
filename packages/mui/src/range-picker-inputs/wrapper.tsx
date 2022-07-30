import { Paper, TextFieldProps } from '@mui/material';
import { useLocaleText } from '@mui/x-date-pickers/internals';
import { useCallback, useRef } from 'react';
import { getRangeInputValue } from 'src/date-time-utils';
import { ClickAwayClose, PopoverInput } from 'src/popover-input';
import {
  DateRangePicker,
  DateTimeRangePicker,
  TimeRangePicker,
} from 'src/range-pickers';
import { WrappedRangePickerProps } from 'src/range-pickers/wrapper';
import { PickerTypes, useMultiLocalizationContext } from 'src/shared/pickers';

type PopoverInputProps = Omit<TextFieldProps, 'value' | 'onChange' | 'color'>;

type Props<P extends PickerTypes, In, Out> = WrappedRangePickerProps<
  P,
  In,
  Out
> & { popoverInputProps?: PopoverInputProps };

export { Props as WrappedRangePickerInputProps };

const rangePickers: Record<PickerTypes, React.ElementType> = {
  TIME: TimeRangePicker,
  DATE: DateRangePicker,
  DATETIME: DateTimeRangePicker,
};

export function WrapRangePickerInput<P extends PickerTypes>(pickerType: P) {
  const RangePicker = rangePickers[pickerType];

  function WrappedRangePickerInput<In, Out>(props: Props<P, In, Out>) {
    const {
      classes,
      value,
      onChange,
      pickerProps,
      fromPickerProps,
      toPickerProps,
      color = 'secondary',
      popoverInputProps,
    } = props;

    const { defaultMultiLocale } = useMultiLocalizationContext();
    const multiLocale =
      pickerType !== 'TIME' &&
      ('multiLocale' in props ? props['multiLocale'] : defaultMultiLocale);

    const { rangeInputLabels: labels } = useLocaleText();

    const inputValue = getRangeInputValue(value, labels!);

    const ignoreClickRef = useRef(false);

    const onOpen = useCallback(() => {
      ignoreClickRef.current = true;
      pickerProps?.onOpen?.();
    }, [pickerProps]);
    const onClose = useCallback(() => {
      ignoreClickRef.current = false;
      pickerProps?.onClose?.();
    }, [pickerProps]);

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
              {/* @ts-ignore */}
              <RangePicker
                value={value}
                onChange={onChange}
                pickerProps={{
                  ...pickerProps,
                  onOpen,
                  onClose,
                }}
                fromPickerProps={fromPickerProps}
                toPickerProps={toPickerProps}
                multiLocale={multiLocale}
                classes={classes}
                color={color}
              />
            </div>
          </ClickAwayClose>
        </Paper>
      </PopoverInput>
    );
  }

  return WrappedRangePickerInput;
}
