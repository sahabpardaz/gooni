import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
  TimePicker as MuiTimePicker,
  TimePickerProps as MuiTimePickerProps,
} from '@mui/x-date-pickers';
import {
  MultiLocalePickersActionBar,
  useMultiLocalizationContext,
  usePickerProps,
} from '@my-sahab/mui';
import { SubsetPartial } from '@my-sahab/utils';
import { mergeDeepRight } from 'ramda';
import * as React from 'react';
import { PickerTypes } from 'src/shared/pickers';

type PickerProps<P extends PickerTypes, In, Out = In> = P extends 'TIME'
  ? MuiTimePickerProps<In, Out>
  : P extends 'DATE'
  ? MuiDatePickerProps<In, Out>
  : P extends 'DATETIME'
  ? MuiDateTimePickerProps<In, Out>
  : never;

type Props<P extends PickerTypes, In, Out> = SubsetPartial<
  PickerProps<P, In, Out>,
  'renderInput'
> &
  (P extends 'TIME' ? unknown : { multiLocale?: boolean });

export { Props as WrappedPickerProps };

const pickers: Record<PickerTypes, React.ElementType> = {
  TIME: MuiTimePicker,
  DATE: MuiDatePicker,
  DATETIME: MuiDateTimePicker,
};

export function WrapPicker<P extends PickerTypes>(pickerType: P) {
  const Picker = pickers[pickerType];

  function WrappedPicker<In, Out>(props: Props<P, In, Out>) {
    const commonPickerProps = usePickerProps<In, Out>();

    const { defaultMultiLocale } = useMultiLocalizationContext();
    const multiLocale =
      pickerType !== 'TIME' &&
      ('multiLocale' in props ? props['multiLocale'] : defaultMultiLocale);

    return (
      // @ts-ignore
      <Picker
        desktopModeMediaQuery="@media not all"
        {...commonPickerProps}
        {...(multiLocale
          ? mergeDeepRight<Props<P, In, Out>, object>(props, {
              components: { ActionBar: MultiLocalePickersActionBar },
            })
          : props)}
      />
    );
  }

  return WrappedPicker;
}
