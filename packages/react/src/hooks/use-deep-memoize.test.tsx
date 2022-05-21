import { act, renderHook } from '@testing-library/react-hooks';
import { useEffect, useState } from 'react';

import { useDeepMemoize } from './use-deep-memoize';

function useDeepMemoExample(initialState: Record<string, string>) {
  const [state, setState] = useState(initialState);
  const [callCount, setCallCount] = useState(0);
  const memoizedState = useDeepMemoize(state);

  useEffect(() => setCallCount((prevCount) => prevCount + 1), [memoizedState]);

  return {
    callCount,
    setState,
  };
}

describe('useDeepMemo', () => {
  it('should memoize objects using deep equality checks', () => {
    const { result } = renderHook(() => useDeepMemoExample({ field1: '1' }));

    // initial render
    expect(result.current.callCount).toBe(1);

    // change the state to a NEW object with SIMILAR fields
    act(() => result.current.setState({ field1: '1' }));
    // should use the memoized value
    expect(result.current.callCount).toBe(1);

    // change the state to a NEW object with DIFFERENT fields
    act(() => result.current.setState({ field2: '2' }));
    // should NOT use the memoized value
    expect(result.current.callCount).toBe(2);

    // change the state to a NEW object with SIMILAR fields
    act(() => result.current.setState({ field2: '2' }));
    // should use the memoized value
    expect(result.current.callCount).toBe(2);
  });
});
