import * as React from 'react';

export interface RangePickerLabel {
  /**
   * translated for `resetLabel`
   *
   * @type {string}
   */
  resetLabel?: string;
  /**
   * translated for `fromLabel`
   *
   * @type {string}
   */
  fromLabel?: string;
  /**
   * translated for `toLabel`
   *
   * @type {string}
   */
  toLabel?: string;
}

interface OwnProps {
  value: RangePickerLabel;
}

export type Props = React.PropsWithChildren<OwnProps>;

const RangePickerI18nContext = React.createContext<RangePickerLabel>({});

export function useRangePickerI18nContext(): RangePickerLabel {
  return React.useContext(RangePickerI18nContext);
}

/**
 *
 * provide range picker i18n context.
 * @param {Props} props
 * @returns {JSX.Element}
 */
export function RangePickerI18nProvider(props: Props) {
  return (
    <RangePickerI18nContext.Provider value={props.value}>
      {props.children}
    </RangePickerI18nContext.Provider>
  );
}
