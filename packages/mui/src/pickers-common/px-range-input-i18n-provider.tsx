import * as React from 'react';

import { RangeInputLabels } from '../date-time-utils';

interface OwnProps {
  value: RangeInputLabels;
}

export type Props = React.PropsWithChildren<OwnProps>;

const RangeInputI18nContext = React.createContext<RangeInputLabels>({});

export function useRangeInputI18nContext(): RangeInputLabels {
  return React.useContext(RangeInputI18nContext);
}

/**
 *
 * provide range picker i18n context.
 * @param {Props} props
 * @returns {JSX.Element}
 */
export function RangeInputI18nProvider(props: Props) {
  return (
    <RangeInputI18nContext.Provider value={props.value}>
      {props.children}
    </RangeInputI18nContext.Provider>
  );
}
