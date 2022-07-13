import { fireEvent, render, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

import { ToggleButton } from './index';
import { Input } from './input';
import { ToggleButtonInput } from './px-toggle-button-input';
import { ToggleButtonContextProvider } from './toggle-button-context';

const getSimpleButton = () => {
  return (
    <ToggleButton value="foo" title="foo">
      foo
    </ToggleButton>
  );
};
const getToggleButtonInputWrapper = (
  value: { value: string; type: string | null } = { value: 'test', type: null },
  others: any = {},
  children?: ReactNode,
) =>
  render(
    <ToggleButtonInput value={value} {...others}>
      {children ? children : null}
    </ToggleButtonInput>,
  );

const waitForClass = (classList: DOMTokenList, targetClass: string) => {
  const foundedResult = partialClassNameSearch(classList, targetClass);
  if (foundedResult.length) {
    return foundedResult;
  }
  throw Error('class not found');
};

// TODO: Extract it as a helper function and improve it
const partialClassNameSearch = (classList: DOMTokenList, partialName: string) =>
  Array.from(classList).filter((item: string) => item.includes(partialName));

const getButtonWrapper = (onClick = () => {}, value: string = '') =>
  render(
    <ToggleButtonContextProvider
      value={{
        onClick: onClick,
        color: 'primary',
        value: value || 'providervalue',
      }}
    >
      <ToggleButton onClick={onClick} value={value || 'foo'} title="foo">
        Foo
      </ToggleButton>
    </ToggleButtonContextProvider>,
  );

describe('ToggleButtonInput', () => {
  describe('Input', () => {
    it('should have an input', () => {
      const wrapper = render(<Input />);
      expect(wrapper.baseElement.querySelectorAll('input')).toHaveLength(1);
    });
    it('should render input with value', () => {
      const wrapper = render(<Input value="foo" />);
      expect(wrapper.queryAllByDisplayValue('foo')).toHaveLength(1);
    });
    it('should call onChange when input value changed', async () => {
      const onChange = vi.fn();
      const wrapper = render(<Input value="foo" onChange={onChange} />);
      const inpt = await waitFor(
        () => wrapper.queryAllByDisplayValue('foo')[0],
      );
      fireEvent.change(inpt, { target: { value: 'bar' } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('should call onFocus when input focused', async () => {
      const onFocus = vi.fn();
      const wrapper = render(<Input value="foo" onFocus={onFocus} />);
      const inpt = await waitFor(
        () => wrapper.queryAllByDisplayValue('foo')[0],
      );
      fireEvent.focus(inpt);
      const root = wrapper.getByTestId('root');
      const result = await waitFor(
        () => waitForClass(root.classList, 'Input-focused'),
        wrapper,
      );
      expect(result).not.toHaveLength(0);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
    it('should call onBlur when input blured', async () => {
      const onBlur = vi.fn();
      const wrapper = render(<Input value="foo" onBlur={onBlur} />);
      const inpt = await waitFor(
        () => wrapper.queryAllByDisplayValue('foo')[0],
      );
      fireEvent.blur(inpt);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Button toggle', () => {
    it('should have a button', () => {
      const wrapper = getButtonWrapper();
      const button = wrapper.baseElement.querySelectorAll('button');
      expect(button).toHaveLength(1);
    });
    it('should call onClick when button clicked', () => {
      const onClick = vi.fn();
      const wrapper = getButtonWrapper(onClick);
      const button = wrapper.baseElement.querySelectorAll('button');
      fireEvent.click(button[0]);
      expect(onClick).toHaveBeenCalledTimes(2);
    });
    it('should sets active correctly', () => {
      const wrapper = getButtonWrapper(() => {}, 'me');
      const btn = wrapper.baseElement.querySelectorAll('button')[0];
      const result = partialClassNameSearch(
        btn.classList,
        'ToggleButton-active',
      );
      expect(result).not.toHaveLength(0);
    });
  });

  describe('Toggle button input', () => {
    it('should have an input', () => {
      const wrapper = getToggleButtonInputWrapper();
      expect(wrapper.baseElement.querySelectorAll('input')).toHaveLength(1);
    });
    it('should render input with value', () => {
      const wrapper = getToggleButtonInputWrapper();
      expect(wrapper.queryAllByDisplayValue('test')).toHaveLength(1);
    });
    it('should call onChange when input value changed', () => {
      const onChange = vi.fn();
      const wrapper = getToggleButtonInputWrapper(
        { value: 'test', type: 'imei' },
        { onChange },
      );
      const inpt = wrapper.queryAllByDisplayValue('test')[0];
      fireEvent.change(inpt, { target: { value: 'bar' } });
      expect(onChange).toHaveBeenCalledTimes(1);
    });
    it('should render input disabled when value.type is null', () => {
      const wrapper = getToggleButtonInputWrapper();
      const result = wrapper.baseElement.querySelectorAll('input[disabled]');
      expect(result).toHaveLength(1);
    });
    it('should render input enabled when value.type isnt null', () => {
      const wrapper = getToggleButtonInputWrapper({
        value: 'test',
        type: 'imei',
      });
      const result = wrapper.baseElement.querySelectorAll('input[disabled]');
      expect(result).toHaveLength(0);
    });
    it('should call onFocus when input focused', async () => {
      const onFocus = vi.fn();
      const wrapper = getToggleButtonInputWrapper(
        { value: 'test', type: 'imei' },
        { onFocus },
      );
      const inpt = await waitFor(
        () => wrapper.queryAllByDisplayValue('test')[0],
      );
      fireEvent.focus(inpt);
      const root = wrapper.getByTestId('root');
      const result = await waitFor(
        () => waitForClass(root.classList, 'Input-focused'),
        wrapper,
      );
      expect(result).not.toHaveLength(0);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });
    it('should call onBlur when input blured', async () => {
      const onBlur = vi.fn();
      const wrapper = getToggleButtonInputWrapper(
        { value: 'test', type: 'imei' },
        { onBlur },
      );
      const inpt = await waitFor(
        () => wrapper.queryAllByDisplayValue('test')[0],
      );
      fireEvent.blur(inpt);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
    it('shouldnt call onFocus when input is disabled', async () => {
      const onFocus = vi.fn();
      const wrapper = getToggleButtonInputWrapper(
        { value: 'test', type: null },
        { onFocus },
      );
      const inpt = await waitFor(
        () => wrapper.queryAllByDisplayValue('test')[0],
      );
      fireEvent.focus(inpt);
      const root = wrapper.getByTestId('root');
      const result = partialClassNameSearch(root.classList, 'Input-focused');
      expect(result).toHaveLength(0);
      expect(onFocus).toHaveBeenCalledTimes(0);
    });
    it('should call onChange when type changed', () => {
      const onChange = vi.fn();
      const wrapper = getToggleButtonInputWrapper(
        { value: 'test', type: 'imei' },
        { onChange },
        getSimpleButton(),
      );
      const btn = wrapper.baseElement.querySelectorAll('button');
      fireEvent.click(btn[0]);
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
