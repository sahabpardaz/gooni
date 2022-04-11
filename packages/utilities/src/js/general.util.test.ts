import { countBy, isNotNil } from './general.util';

describe('general utils', () => {
  describe('isNotNil', () => {
    it('should return false when passed null', () => {
      expect(isNotNil(null)).toBe(false);
    });

    it('should return false when passed undefined', () => {
      expect(isNotNil(undefined)).toBe(false);
    });

    it('should return false when passed any thing else', () => {
      expect(isNotNil('')).toBe(true);
      expect(isNotNil('null')).toBe(true);
      expect(isNotNil('undefined')).toBe(true);

      expect(isNotNil([])).toBe(true);
      expect(isNotNil({})).toBe(true);

      expect(isNotNil(NaN)).toBe(true);
      expect(isNotNil(-0)).toBe(true);
      expect(isNotNil(0)).toBe(true);
      expect(isNotNil(+0)).toBe(true);
    });
  });

  describe('CountBy', () => {
    it('should count the elements which are the same as the next one after the next', () => {
      const array = [true, false, false, true, false, false, false, true, true];
      const fn = (element: boolean, index: number, array: Array<boolean>) =>
        index < array.length - 2 ? element === array[index + 2] : false;
      expect(countBy(fn, array)).toBe(2);
    });

    it('should count true values', () => {
      const array = [true, false, false, true, false, false, false, true, true];
      const fn = (element: boolean) => element;
      expect(countBy(fn, array)).toBe(4);
    });
  });
});
