import { fireEvent, render } from '@testing-library/react';
import { Locale } from '../constant-types';
import { DefaultMuiPickerLocalization } from '../pickers-common/default-mui-picker-localization';

import { DatePicker, DatePickerProps } from './index';

const getWrapper = (
  fn: Function = () => {},
  props: Omit<DatePickerProps<Date>, 'value' | 'onChange'> = {},
) =>
  render(
    <DefaultMuiPickerLocalization locale={Locale.defaultLocale}>
      <DatePicker
        value={new Date('2019/1/1')}
        onChange={fn as any}
        {...props}
      />
      ,
    </DefaultMuiPickerLocalization>,
  );
describe('DatePicker', () => {
  it('should set value in input', () => {
    const wrapper = getWrapper();
    const result = wrapper.queryAllByDisplayValue('۹۷/۱۰/۱۱');
    expect(result).toHaveLength(1);
  });

  it('should open up date dialog', () => {
    const wrapper = getWrapper();
    const input = wrapper.container.querySelector('input');
    fireEvent.click(input as Element);
    const dialog = wrapper.baseElement.querySelectorAll('.MuiDialog-root');
    expect(dialog).toHaveLength(1);
  });

  it('should call onChange when click on day', () => {
    const mocked = jest.fn();
    const wrapper = getWrapper(mocked);

    const input = wrapper.container.querySelector('input');
    fireEvent.click(input as Element);
    const result = wrapper.queryByText('OK');
    fireEvent.click(result as Element);
    expect(mocked).toHaveBeenCalled();
  });
});
