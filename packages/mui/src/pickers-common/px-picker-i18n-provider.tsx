import { DateTimePickerProps } from '@mui/lab';
import { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import React, { createContext, ReactNode, useContext } from 'react';

export type PickerLabel = Pick<
  DateTimePickerProps,
  `${string}Text` & keyof DateTimePickerProps
> & {
  errors?: Partial<Record<NonNullable<DateTimeValidationError>, ReactNode>>;
};

interface OwnProps {
  value: PickerLabel;
}

export type Props = React.PropsWithChildren<OwnProps>;

const PickerI18nContext = createContext<PickerLabel>({
  errors: {
    invalidDate: 'Invalid Date Format',
    maxDate: 'Date should not be after maximal date',
    minDate: 'Date should not be before minimal date',
  },
});

export function usePickerI18nContext(): PickerLabel {
  return useContext(PickerI18nContext);
}

/**
 *
 * provide picker i18n context.
 * @param {Props} props
 * @returns {JSX.Element}
 */
export function PickerI18nProvider(props: Props) {
  return (
    <PickerI18nContext.Provider value={props.value}>
      {props.children}
    </PickerI18nContext.Provider>
  );
}
