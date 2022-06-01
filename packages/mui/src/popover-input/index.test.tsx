import '@testing-library/jest-dom/extend-expect';

import { fireEvent, render, screen } from '@testing-library/react';
import { mock } from 'jest-mock-extended';

import { PopoverButton } from './px-popover-button';
import { PopoverInput } from './px-popover-input';
import { PopoverInputContextProvider } from './px-popover-input-context';

beforeEach(() => {
  jest.resetModules();
  jest.mock(
    'popper.js',
    () =>
      class Popper {
        static placements = [
          'auto',
          'auto-end',
          'auto-start',
          'bottom',
          'bottom-end',
          'bottom-start',
          'left',
          'left-end',
          'left-start',
          'right',
          'right-end',
          'right-start',
          'top',
          'top-end',
          'top-start',
        ];

        constructor() {
          return {
            destroy: () => {},
            scheduleUpdate: () => {},
          };
        }
      },
  );
  document.createRange = () =>
    ({
      ...mock<Range>(),
      setStart: () => {},
      setEnd: () => {},
      commonAncestorContainer: {
        ...mock<Range>().commonAncestorContainer,
        nodeName: 'BODY',
        ownerDocument: document,
      },
    } as any); // sorry for this. https://github.com/i18next/react-i18next/issues/1417
});

describe('PopoverInput', () => {
  it("shouldn't render element as child", () => {
    const wrapper = render(
      <PopoverInput>
        <div>Hi</div>
      </PopoverInput>,
    );
    const result = wrapper.queryAllByText('Hi');
    expect(result).toHaveLength(0);
  });

  it('should render element as child', () => {
    const wrapper = render(
      <PopoverInput>
        <div>Hi</div>
      </PopoverInput>,
    );
    const elem = wrapper.queryAllByText(/.*/, {
      selector: 'input',
    });
    fireEvent.focus(elem[0]);

    expect(wrapper.queryAllByText('Hi')).toHaveLength(1);
  });

  it('should render as child', () => {
    const wrapper = render(
      <PopoverInputContextProvider value={() => {}}>
        <div>hi</div>
      </PopoverInputContextProvider>,
    );
    const result = wrapper.queryAllByText('hi');
    expect(result).toHaveLength(1);
  });
});

describe('PopoverButton', () => {
  it("shouldn't render element as child", () => {
    render(
      <PopoverButton>
        <div>Hi</div>
      </PopoverButton>,
    );
    expect(screen.queryByText('Hi')).not.toBeInTheDocument();
  });

  it('should render element as child', () => {
    render(
      <PopoverButton>
        <div>Hi</div>
      </PopoverButton>,
    );
    const elem = screen.getByRole('button');
    fireEvent.click(elem);

    expect(screen.getByText('Hi')).toBeInTheDocument();
  });

  it('should render as child', () => {
    render(
      <PopoverInputContextProvider value={() => {}}>
        <div>hi</div>
      </PopoverInputContextProvider>,
    );
    const result = screen.getByText('hi');
    expect(result).toBeInTheDocument();
  });
});
