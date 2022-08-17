import { RangeInputFormatter } from 'src/date-time-utils';

/**
 * TimeRange contract)
 * @interface TimeRange
 */
export interface TimeRange<T = Date> {
  /**
   * Beginning of time range.
   *
   * @type {(T | null)}
   * @memberof TimeRange
   */
  from: T | null;
  /**
   * End of time range.
   *
   * @type {(T | null)}
   * @memberof TimeRange
   */
  to: T | null;
}

/** PickerTypes available for pickers, range pickers and range inputs */
export type PickerTypes = 'TIME' | 'DATE' | 'DATETIME';

export interface RangePickerLabels {
  /**
   * translated for `resetLabel`
   */
  resetLabel?: string;
  /**
   * translated for `fromLabel`
   */
  fromLabel?: string | ((pickerType: PickerTypes) => string);
  /**
   * translated for `toLabel`
   */
  toLabel?: string | ((pickerType: PickerTypes) => string);
}

export interface RangeInputLabels {
  /**
   * translated for `from`
   */
  from?: string;
  /**
   * translated for `to`
   */
  to?: string;
  /**
   * custom text shown in input instead of default behavior
   */
  customText?: string | ((value: ReturnType<RangeInputFormatter>) => string);
}
