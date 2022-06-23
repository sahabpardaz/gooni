import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from '@mui/x-date-pickers';
import { SubsetPartial } from '@my-sahab/utils';
import { ThemeColorSwapper, usePickerProps } from '../pickers-common';

interface Props<In, Out = In>
  extends SubsetPartial<DatePickerProps<In, Out>, 'renderInput'> {
  // there should added more variants later
  variant?: 'dialog';
  color?: 'primary' | 'secondary';
}
/**
 * Date Picker Props
 *
 * @public
 */
export type { Props as DatePickerProps };

/**
 * A component that render date picker using material-ui date picker.
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 * @example
 * Here's an example
 *
 * function MyComponent(){
 *     const [value, setDateValue] = useState(new Date('2019/1/1'));
 *     return <DatePicker value={value} onChange={setDateValue} />;
 * }
 */
export function DatePicker<In, Out = In>(props: Props<In, Out>) {
  const { color, ...muiDatePickerProps } = props;

  const pickerCommonProps = usePickerProps<In, Out>();

  return (
    <ThemeColorSwapper color={color}>
      <MuiDatePicker
        desktopModeMediaQuery="@media not all"
        {...pickerCommonProps}
        {...muiDatePickerProps}
      />
    </ThemeColorSwapper>
  );
}
