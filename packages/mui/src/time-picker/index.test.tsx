import { SubsetPartial } from '@sahab/utils';
import { fireEvent, render, screen } from '@testing-library/react';
import moment, { Moment } from 'moment';
import { TimePicker } from '.';
import { Locale } from '../constant-types';
import { DefaultMuiPickerLocalization } from '../pickers-common/default-mui-picker-localization';
import { TimePickerProps } from './px-time-picker';

const renderTimePicker = (
  props: SubsetPartial<
    TimePickerProps<Moment>,
    'value' | 'onChange'
  > = {} as TimePickerProps<Moment>,
  locale: Locale = Locale.en,
) => {
  const {
    value = moment('22:55', 'HH:mm'),
    onChange = () => {},
    ...restProps
  } = props;

  render(
    <DefaultMuiPickerLocalization locale={locale}>
      <TimePicker value={value} onChange={onChange} {...restProps} />
    </DefaultMuiPickerLocalization>,
  );
};

describe('TimePicker', () => {
  it('should render time picker', () => {
    renderTimePicker();
    const result = screen.getAllByDisplayValue('10:55 PM');

    expect(result).toHaveLength(1);
  });

  it('should open time picker dialog', () => {
    renderTimePicker();

    const input = screen.getByRole('textbox');
    fireEvent.click(input as HTMLInputElement);
    const dialog = screen.getAllByRole('dialog');

    expect(dialog).toHaveLength(1);
  });

  it('should call onChange when click on OK button', () => {
    const mocked = jest.fn();
    renderTimePicker({ onChange: mocked });
    const input = screen.getByRole('textbox');
    fireEvent.click(input as HTMLInputElement);

    const result = screen.queryAllByText('OK');
    fireEvent.click(result[0] as Element);

    expect(mocked).toBeCalledTimes(1);
  });

  it('should override default label', () => {
    renderTimePicker({});
    const input = screen.getByRole('textbox');
    fireEvent.click(input as HTMLInputElement);

    const selectLabel = screen.queryAllByText('Select');
    const okButton = screen.queryAllByText('OK');
    const cancelButton = screen.queryAllByText('Cancel');

    expect(selectLabel).toHaveLength(1);
    expect(okButton).toHaveLength(0);
    expect(cancelButton).toHaveLength(1);
  });

  it('should show time in 24-hour', () => {
    renderTimePicker({ ampm: false });
    const result = screen.getAllByDisplayValue('22:55');

    expect(result).toHaveLength(1);
  });

  it('should show time in persian locale', () => {
    renderTimePicker({}, Locale.fa);
    const result = screen.getAllByDisplayValue('۱۰:۵۵ بعد از ظهر');

    expect(result).toHaveLength(1);
  });

  it('should call onChange when select a time', () => {
    const mocked = jest.fn();
    renderTimePicker({ onChange: mocked });
    const input = screen.getByRole('textbox');

    fireEvent.click(input as HTMLInputElement);

    const okBtn = screen.queryByText('OK');

    const time = screen.getByText('12');

    fireEvent.click(time as HTMLElement);
    fireEvent.click(okBtn as HTMLButtonElement);

    expect(mocked).toHaveBeenCalledTimes(1);
  });
});
