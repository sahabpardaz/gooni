import { renderHook } from '@testing-library/react-hooks';

import { useDelayedValue } from './use-delayed-value';

describe('useDelayedValue', () => {
  describe('initial value is true', () => {
    it('should return true when initial value is true', () => {
      const wrapper = renderHook(() => useDelayedValue(true));
      expect(wrapper.result.current).toBe(true);
    });
    it('should stays positive before negative edge', async () => {
      let value = true;
      const wrapper = renderHook(() =>
        useDelayedValue(value, { negativeEdgeDelay: 200 }),
      );

      value = false;
      wrapper.rerender();

      expect(wrapper.result.current).toBe(true);
    });
    it('should be false after negative edge delay', async () => {
      let value = true;
      const wrapper = renderHook(() =>
        useDelayedValue(value, { negativeEdgeDelay: 200 }),
      );

      value = false;
      wrapper.rerender();

      await wrapper.waitForNextUpdate();
      expect(wrapper.result.current).toBe(false);
    });
  });
  describe('initial value is false', () => {
    it('should return false when initial value is false', () => {
      const wrapper = renderHook(() => useDelayedValue(false));
      expect(wrapper.result.current).toBe(false);
    });
    it('should stays false before positive edge', async () => {
      let value = false;
      const wrapper = renderHook(() =>
        useDelayedValue(value, { positiveEdgeDelay: 200 }),
      );

      value = true;
      wrapper.rerender();

      expect(wrapper.result.current).toBe(false);
    });
    it('should be true after positive edge delay', async () => {
      let value = false;
      const wrapper = renderHook(() =>
        useDelayedValue(value, { positiveEdgeDelay: 200 }),
      );

      value = true;
      wrapper.rerender();

      await wrapper.waitForNextUpdate();
      expect(wrapper.result.current).toBe(true);
    });

    it('should turn true immediately after 0 positive edge delay', async () => {
      let value = false;
      const wrapper = renderHook(() =>
        useDelayedValue(value, { positiveEdgeDelay: 0 }),
      );

      value = true;
      wrapper.rerender();

      expect(wrapper.result.current).toBe(true);
    });

    it('should turn false immediately after 0 negative edge delay', async () => {
      let value = true;
      const wrapper = renderHook(() =>
        useDelayedValue(value, { negativeEdgeDelay: 0 }),
      );

      value = false;
      wrapper.rerender();

      expect(wrapper.result.current).toBe(false);
    });
  });
});
