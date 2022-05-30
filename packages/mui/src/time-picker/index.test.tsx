import { fireEvent, render, screen } from '@testing-library/react';
import moment from 'moment';

import { TimePicker } from '.';
import { CalendarTypes, LanguageTypes } from '../constant-types';
import { Props as TimePickerProps } from './px-time-picker';

const renderTimePicker = (
  props: Partial<TimePickerProps> = {} as TimePickerProps,
) => {
  const {
    value = moment('22:55', 'HH:mm'),
    onChange = () => {},
    ...restProps
  } = props;

  render(
    <TimePicker
      localeCalendar={CalendarTypes.gregorian}
      localeLanguage={LanguageTypes.en}
      value={value}
      onChange={onChange}
      {...restProps}
    />,
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
    renderTimePicker({ okText: 'Select' });
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
    renderTimePicker({
      localeLanguage: LanguageTypes.fa,
    });
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
