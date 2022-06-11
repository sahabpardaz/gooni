import {
  TimePicker as MuiTimePicker,
  TimePickerProps,
} from '@mui/x-date-pickers';
import { SubsetPartial } from '@sahab/utils';
import {
  ThemeColorSwapper,
  ThemeColorSwapperProps,
  usePickerProps,
} from '../pickers-common';

interface Props<In, Out = In>
  extends SubsetPartial<TimePickerProps<In, Out>, 'renderInput'> {
  // there should added more variants later
  variant?: 'dialog';
  color?: ThemeColorSwapperProps['color'];
}

/**
 * Time Picker Props
 *
 * @public
 */
export type { Props as TimePickerProps };

/**
 *A component that render timePicker using material-ui time picker
 *
 * @public
 * @param {Props} props
 * @returns {JSX.Element}
 * @example
 * Here's an example:
 *
 * function MyComponent() {
 *    const [value, setValue] = useState(DateFns.format('10:30', 'HH:mm', new Date()))
 *    return <TimePicker value={value} onChange={setValue}/>
 * }
 */
export function TimePicker<In, Out = In>(props: Props<In, Out>) {
  const { color = 'secondary', ...muiTimePickerProps } = props;

  const commonPickerProps = usePickerProps<In, Out>();

  return (
    <ThemeColorSwapper color={color}>
      <MuiTimePicker
        desktopModeMediaQuery="@media not all"
        {...commonPickerProps}
        {...muiTimePickerProps}
      />
    </ThemeColorSwapper>
  );
}
