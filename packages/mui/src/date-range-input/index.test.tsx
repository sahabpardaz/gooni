import { render } from '@testing-library/react';

import { formatDateRange, TimeRange } from '../date-time-utils';
import { RangeInputI18nProvider } from '../pickers-common';
import { DateRangeInput } from './index';

const getWrapper = (props: { value: TimeRange }, onChange = () => {}) =>
  render(
    <DateRangeInput
      {...props}
      onChange={onChange}
      variant="outlined"
      margin="dense"
    />,
  );

describe('DateRangeInput', () => {
  it('should render empty string when values are null', () => {
    const wrapper = render(
      <DateRangeInput
        variant="outlined"
        margin="dense"
        value={{ from: null, to: null }}
        onChange={() => {}}
      />,
    );
    const result = wrapper.queryAllByDisplayValue('');
    expect(result).toHaveLength(1);
  });
  it('should render one input', () => {
    const wrapper = getWrapper({ value: { from: null, to: null } });
    const result = wrapper.baseElement.querySelectorAll('input');
    expect(result).toHaveLength(1);
  });
  it('should render correct value in input', () => {
    const wrapper = getWrapper({
      value: { from: new Date('2018/1/1'), to: new Date('2018/1/2') },
    });
    const result = wrapper.queryAllByDisplayValue(
      'from 1396/10/11 to 1396/10/12',
    );
    expect(result).toHaveLength(1);
  });
  it('should render correct value in input when there is only from value provided', () => {
    const wrapper = getWrapper({
      value: { from: new Date('2018/1/1'), to: null },
    });
    const result = wrapper.queryAllByDisplayValue('from 1396/10/11');
    expect(result).toHaveLength(1);
  });
  it('should render correct value in input when there is to value provided', () => {
    const wrapper = getWrapper({
      value: { from: null, to: new Date('2018/1/2') },
    });
    const result = wrapper.queryAllByDisplayValue('to 1396/10/12');
    expect(result).toHaveLength(1);
  });
  it('should show string custom text', () => {
    const wrapper = render(
      <RangeInputI18nProvider
        value={{ customText: 'Date Range: 1396/10/11 - 1396/10/12' }}
      >
        <DateRangeInput
          value={{ from: new Date('2018/1/1'), to: new Date('2018/1/2') }}
          onChange={() => {}}
        />
      </RangeInputI18nProvider>,
    );
    const result = wrapper.queryAllByDisplayValue(
      'Date Range: 1396/10/11 - 1396/10/12',
    );
    expect(result).toHaveLength(1);
  });
  it('should show function custom text', () => {
    const customFunc = vi.fn().mockImplementation((timeRange: TimeRange) => {
      const value = formatDateRange(timeRange);
      return `${value.from} ${value.to}`;
    });
    const wrapper = render(
      <RangeInputI18nProvider value={{ customText: customFunc }}>
        <DateRangeInput
          value={{ from: new Date('2018/1/1'), to: new Date('2018/1/2') }}
          onChange={() => {}}
        />
      </RangeInputI18nProvider>,
    );
    const result = wrapper.queryAllByDisplayValue('1396/10/11 1396/10/12');
    expect(result).toHaveLength(1);
    expect(customFunc).toHaveBeenCalledTimes(1);
  });
});
