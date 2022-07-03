import {
  DatePicker,
  DatePickerProps,
  DateTimePicker,
  DateTimePickerProps,
  TimePicker,
  TimePickerProps,
} from '@mui/x-date-pickers';
import { SubsetPartial } from '@my-sahab/utils';
import { usePickerProps } from '../pickers-common';

type PickerTypes =
  | typeof TimePicker
  | typeof DatePicker
  | typeof DateTimePicker;

type PickerProps<
  P extends PickerTypes,
  In,
  Out = In,
> = P extends typeof TimePicker
  ? TimePickerProps<In, Out>
  : P extends typeof DatePicker
  ? DatePickerProps<In, Out>
  : P extends typeof DateTimePicker
  ? DateTimePickerProps<In, Out>
  : never;

type Props<P extends PickerTypes, In, Out> = SubsetPartial<
  PickerProps<P, In, Out>,
  'renderInput'
>;
export { Props as WrappedPickerProps };

export function WrapPicker<P extends PickerTypes>(Picker: P) {
  function WrappedPicker<In, Out>(props: Props<P, In, Out>) {
    const commonPickerProps = usePickerProps<In, Out>();

    return (
      //@ts-ignore
      <Picker
        desktopModeMediaQuery="@media not all"
        {...commonPickerProps}
        {...props}
      />
    );
  }

  return WrappedPicker;
}
