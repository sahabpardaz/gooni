import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { CheckboxList } from './check-list-box';
import { SelectOption } from './package-types';
import { PxCheckListFilter } from './px-check-list-filter';

const ITEMS: SelectOption[] = [
  { value: '1', label: 'a' },
  { value: '2', label: 'b' },
  { value: '3', label: 'c' },
];

const renderCheckBoxList = (
  params?: Partial<React.ComponentProps<typeof CheckboxList>>,
) => {
  const { items: itemsProps = ITEMS, ...rest } = params ?? {};

  render(<CheckboxList items={itemsProps} {...rest} />);
  const checkBoxInputs = screen.getAllByRole('checkbox') as HTMLInputElement[];
  const checkBoxItems = screen.getAllByRole('button') as HTMLDivElement[];

  return { checkBoxInputs, checkBoxItems };
};

describe('check list box', () => {
  it('should render CheckListBox', () => {
    const { checkBoxItems } = renderCheckBoxList();
    expect(screen.getByText(ITEMS[0].label as string)).toBeDefined();
    expect(screen.getByText(ITEMS[1].label as string)).toBeDefined();
    expect(screen.getByText(ITEMS[2].label as string)).toBeDefined();
    expect(checkBoxItems).toHaveLength(3);
  });

  it('should render CheckListBox with initial two checked items', () => {
    const { checkBoxInputs } = renderCheckBoxList({
      initialChecked: ['1', '3'],
    });

    const totalChecked = checkBoxInputs.filter((checkBox) => checkBox.checked);
    const totalUnChecked = checkBoxInputs.filter(
      (checkBox) => !checkBox.checked,
    );
    expect(totalChecked).toHaveLength(2);
    expect(totalUnChecked).toHaveLength(1);
  });

  describe('unControlled', () => {
    it('should work without value and onChange', () => {
      const { checkBoxInputs, checkBoxItems } = renderCheckBoxList();
      const getCheckedItems = () =>
        checkBoxInputs.filter((checkBox) => checkBox.checked);

      expect(getCheckedItems()).toHaveLength(0);

      userEvent.click(checkBoxItems[0]);

      expect(getCheckedItems()).toHaveLength(1);

      userEvent.click(checkBoxItems[0]);

      expect(getCheckedItems()).toHaveLength(0);

      userEvent.click(checkBoxItems[0]);
      userEvent.click(checkBoxItems[1]);

      expect(getCheckedItems()).toHaveLength(2);
    });

    it('should work without value', () => {
      const onChange = vi.fn();
      const { checkBoxInputs, checkBoxItems } = renderCheckBoxList({
        onChange,
      });
      const getCheckedItems = () =>
        checkBoxInputs.filter((checkBox) => checkBox.checked);

      expect(getCheckedItems()).toHaveLength(0);

      userEvent.click(checkBoxItems[0]);

      expect(getCheckedItems()).toHaveLength(1);
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith([ITEMS[0].value]);

      onChange.mockClear();
      userEvent.click(checkBoxItems[0]);

      expect(getCheckedItems()).toHaveLength(0);
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith([]);

      onChange.mockClear();
      userEvent.click(checkBoxItems[0]);
      userEvent.click(checkBoxItems[1]);

      expect(getCheckedItems()).toHaveLength(2);
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toBeCalledWith([ITEMS[0].value]);
      expect(onChange).toBeCalledWith([ITEMS[0].value, ITEMS[1].value]);
    });
  });

  describe('controlled', () => {
    it('should not change checked items if values does not change', () => {
      const values = [ITEMS[0].value];

      const { checkBoxItems, checkBoxInputs } = renderCheckBoxList({
        checked: values,
      });
      const getCheckedItems = () =>
        checkBoxInputs.filter((checkBox) => checkBox.checked);
      expect(getCheckedItems()).toHaveLength(1);

      userEvent.click(checkBoxItems[0]);

      expect(getCheckedItems()).toHaveLength(1);

      userEvent.click(checkBoxItems[1]);
      userEvent.click(checkBoxItems[2]);

      expect(getCheckedItems()).toHaveLength(1);
    });
  });
});

describe('check-list-filter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('should open menu list', () => {
    render(<PxCheckListFilter items={ITEMS} buttonContent="click me" />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });
  it('should call onReset function', () => {
    const onReset = vi.fn();

    render(
      <PxCheckListFilter
        items={ITEMS}
        buttonContent="click me"
        onReset={onReset}
        resetLabel="reset"
      />,
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    const resetBtn = screen.getByRole('button', { name: 'reset' });
    userEvent.click(resetBtn);
    expect(onReset).toBeCalledTimes(1);
  });
  it('should render helperText', () => {
    const helper = 'this is helper text';
    render(
      <PxCheckListFilter
        items={ITEMS}
        buttonContent="click me"
        helperText={helper}
      />,
    );

    expect(screen.getByText(helper)).toBeInTheDocument();
  });

  it('should call onChange only when popper has been closed', async () => {
    const onChange = vi.fn();
    const onClose = vi.fn();
    const { baseElement } = render(
      <PxCheckListFilter
        items={ITEMS}
        buttonContent="click me"
        onChange={onChange}
        onClose={onClose}
        callOnChangeOnClose
      />,
    );
    const button = screen.getByRole('button');
    userEvent.click(button);
    vi.advanceTimersToNextTimer(); // because of this: https://github.com/mui-org/material-ui/blob/v4.12.3/packages/material-ui/src/ClickAwayListener/ClickAwayListener.js#L40
    const checkboxes = screen.getAllByRole('checkbox');

    checkboxes.forEach((checkbox) => userEvent.click(checkbox));

    userEvent.click(baseElement);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onChange', () => {
    const onChange = vi.fn();
    onChange.mockClear();
    render(
      <PxCheckListFilter
        items={ITEMS}
        buttonContent="click me"
        onChange={onChange}
      />,
    );

    const button = screen.getByRole('button');
    userEvent.click(button);

    const checkboxes = screen.getAllByRole('checkbox');

    checkboxes.forEach((checkbox) => userEvent.click(checkbox));

    expect(onChange).toHaveBeenCalledTimes(3);
  });
});
