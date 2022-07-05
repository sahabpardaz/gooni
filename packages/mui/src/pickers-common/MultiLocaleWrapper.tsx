import {
  DatePickerProps,
  DateTimePickerProps,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { useLocaleText } from '@mui/x-date-pickers/internals';
import { mergeDeepRight } from 'ramda';
import * as React from 'react';
import { Locale } from 'src/constant-types';
import { getLocalizedDateFnsAdapter } from 'src/date-time-utils';
import { MultiLocalePickersActionBar } from './MultiLocalePickersActionBar';

// Unfotunately, TS doesn't limit children type based on the given typing
type Props = {
  children: PickerElementTypes;
};

type PickerElementTypes = React.ReactElement<
  DatePickerProps<unknown, unknown> | DateTimePickerProps<unknown, unknown>
>;

export function MultiLocaleWrapper<P extends PickerElementTypes>({
  children,
}: Props) {
  const [locale, setLocale] = React.useState<Locale>(Locale.defaultLocale);
  const handleLocaleChange = () => {
    setLocale((prevLocale) =>
      prevLocale === Locale.en ? Locale.fa : Locale.en,
    );
  };
  const localeText = useLocaleText();

  let modifiedProps = mergeDeepRight(children.props, {
    components: {
      ActionBar: MultiLocalePickersActionBar,
    },
    componentsProps: {
      actionBar: { locale, onLocaleChange: handleLocaleChange },
    },
  }) as unknown as P['props'];

  return (
    <LocalizationProvider
      dateAdapter={getLocalizedDateFnsAdapter(locale)}
      localeText={localeText}
    >
      {React.cloneElement(children, modifiedProps)}
    </LocalizationProvider>
  );
}
