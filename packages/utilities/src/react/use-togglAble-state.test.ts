import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useToggleAbleState } from '..';

describe('useToggleAbleState', () => {
  it('should have empty array as initialValue', () => {
    const { result } = renderHook(() => {
      return useToggleAbleState();
    });

    expect(result.current.values).toEqual([]);
  });

  it('should have its given initial value', () => {
    const initialState = ['1', '2'];

    const { result } = renderHook(() => {
      return useToggleAbleState({ initialValue: initialState });
    });

    expect(result.current.values).toEqual(initialState);
  });

  describe('reset', () => {
    it('should make state as empty array', () => {
      const initialState = ['1', '2'];

      const { result } = renderHook(() => {
        return useToggleAbleState({ initialValue: initialState });
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.values).toEqual([]);
    });
  });

  describe('toggleByValue', () => {
    it('should add multiple value when "multiple" is true', () => {
      const { result } = renderHook(() => {
        return useToggleAbleState({
          options: { multiple: true },
        });
      });

      act(() => {
        result.current.toggleByValue('1');
        result.current.toggleByValue('4');
      });

      expect(result.current.values).toEqual(['1', '4']);
    });

    it('should add only the last toggled value', () => {
      const { result } = renderHook(() => {
        return useToggleAbleState();
      });

      act(() => {
        result.current.toggleByValue('1');
      });

      expect(result.current.values).toEqual(['1']);

      act(() => {
        result.current.toggleByValue('4');
      });

      expect(result.current.values).toEqual(['4']);
    });

    it('should remove a value when toggled twice', () => {
      const { result } = renderHook(() => {
        return useToggleAbleState({ options: { multiple: true } });
      });

      act(() => {
        result.current.toggleByValue('1');
        result.current.toggleByValue('4');
        result.current.toggleByValue('1');
      });
      expect(result.current.values).toEqual(['4']);
    });

    it('should call onAdd when a state is added with proper argument', () => {
      const onAdd = jest.fn();

      const { result } = renderHook(() => {
        return useToggleAbleState({ options: { multiple: false, onAdd } });
      });

      act(() => {
        result.current.toggleByValue('4');
      });

      expect(onAdd).toBeCalledWith('4');
    });

    it('should call onRemove when a state is removed with proper argument', () => {
      const onAdd = jest.fn();
      const onRemove = jest.fn();

      const { result } = renderHook(() => {
        return useToggleAbleState({
          options: {
            multiple: false,
            onAdd,
            onRemove,
          },
        });
      });

      act(() => {
        result.current.toggleByValue('4');
        result.current.toggleByValue('4');
      });

      expect(onAdd).toBeCalledTimes(1);
      expect(onAdd).toBeCalledWith('4');
      expect(onRemove).toBeCalledTimes(1);
      expect(onRemove).toBeCalledWith('4');
    });
  });

  describe('toggleCheckedByValue', () => {
    it('should add multiple value when multiple is true', () => {
      const { result } = renderHook(() => {
        return useToggleAbleState({ options: { multiple: true } });
      });

      act(() => {
        result.current.toggleCheckedByValue('1');
        result.current.toggleCheckedByValue('4');
      });

      expect(result.current.values).toEqual(['1', '4']);
    });

    it('should add only the last toggled value', () => {
      const { result } = renderHook(() => {
        return useToggleAbleState();
      });

      act(() => {
        result.current.toggleCheckedByValue('1');
      });

      expect(result.current.values).toEqual(['1']);

      act(() => {
        result.current.toggleCheckedByValue('4');
      });

      expect(result.current.values).toEqual(['4']);
    });

    it('should call onAdd when a state is added with proper argument', () => {
      const onAdd = jest.fn();

      const { result } = renderHook(() => {
        return useToggleAbleState({ options: { multiple: false, onAdd } });
      });

      act(() => {
        result.current.toggleCheckedByValue('4');
      });

      expect(onAdd).toBeCalledWith('4');
    });
  });

  describe('toggleUnCheckedByValue', () => {
    it('should remove id from state', () => {
      const initialState = ['4', '1'];

      const { result } = renderHook(() => {
        return useToggleAbleState({ initialValue: initialState });
      });

      act(() => {
        result.current.toggleUnCheckedByValue('4');
        result.current.toggleUnCheckedByValue('4');
      });

      expect(result.current.values).toEqual(['1']);
    });

    it('should call onRemove when a state is removed with proper argument', () => {
      const initialState = ['4'];
      const onRemove = jest.fn();

      const { result } = renderHook(() => {
        return useToggleAbleState({
          initialValue: initialState,
          options: { onRemove },
        });
      });

      act(() => {
        result.current.toggleUnCheckedByValue('4');
      });

      expect(onRemove).toBeCalledWith('4');
    });
  });
  describe('controlled', () => {
    it('should controlled from outside by setState', () => {
      const { result } = renderHook(() => {
        const [state, setState] = React.useState<string[]>([]);
        const { values, toggleByValue } = useToggleAbleState({
          value: state,
          onChange: setState,
          options: { multiple: true },
        });
        return { values, setState, toggleByValue, state };
      });

      expect(result.current.values).toEqual([]);
      expect(result.current.values).toEqual(result.current.state);

      act(() => {
        result.current.setState(['1']);
      });
      expect(result.current.values).toEqual(['1']);
      expect(result.current.values).toEqual(result.current.state);

      act(() => {
        result.current.toggleByValue('4');
      });
      expect(result.current.values).toEqual(['1', '4']);
      expect(result.current.values).toEqual(result.current.state);

      act(() => {
        result.current.setState([]);
      });
      expect(result.current.values).toEqual([]);
      expect(result.current.values).toEqual(result.current.state);
    });
  });

  describe('unControlled with onChange handler', () => {
    const onChange = jest.fn();
    it('should controlled from outside by setState', () => {
      const { result } = renderHook(() => {
        const { values, toggleByValue, setValues } = useToggleAbleState({
          onChange,
          options: { multiple: true },
        });
        return { values, setValues, toggleByValue };
      });

      expect(result.current.values).toEqual([]);

      act(() => {
        result.current.setValues(['1']);
      });
      expect(onChange).toBeCalledTimes(1);
      expect(onChange).toBeCalledWith(['1']);
      expect(result.current.values).toEqual(['1']);

      act(() => {
        result.current.toggleByValue('4');
      });
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toBeCalledWith(['1', '4']);
      expect(result.current.values).toEqual(['1', '4']);

      act(() => {
        result.current.setValues([]);
      });
      expect(onChange).toBeCalledTimes(3);
      expect(onChange).toBeCalledWith([]);
      expect(result.current.values).toEqual([]);
    });
  });
});
