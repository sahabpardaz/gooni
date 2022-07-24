import {
  DatePicker,
  DatePickerProps,
  DateTimePicker,
  DateTimePickerProps,
  TimePicker,
  TimePickerProps,
} from '@mui/x-date-pickers';
import {
  MultiLocalePickersActionBar,
  useMultiLocalizationContext,
  usePickerProps,
} from '@my-sahab/mui';
import { SubsetPartial } from '@my-sahab/utils';
import { mergeDeepRight } from 'ramda';
import * as React from 'react';

export type PickerTypes = 'TIME' | 'DATE' | 'DATETIME';

type PickerProps<P extends PickerTypes, In, Out = In> = P extends 'TIME'
  ? TimePickerProps<In, Out>
  : P extends 'DATE'
  ? DatePickerProps<In, Out>
  : P extends 'DATETIME'
  ? DateTimePickerProps<In, Out>
  : never;

type Props<P extends PickerTypes, In, Out> = SubsetPartial<
  PickerProps<P, In, Out>,
  'renderInput'
> &
  (P extends 'TIME' ? unknown : { multiLocale?: boolean });

export { Props as WrappedPickerProps };

const pickers: Record<PickerTypes, React.ElementType> = {
  TIME: TimePicker,
  DATE: DatePicker,
  DATETIME: DateTimePicker,
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
