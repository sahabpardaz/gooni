import {
  DatePicker,
  DatePickerProps,
  DateTimePicker,
  DateTimePickerProps,
  LocalizationProvider,
  TimePicker,
  TimePickerProps,
} from '@mui/x-date-pickers';
import { useLocaleText } from '@mui/x-date-pickers/internals';
import { SubsetPartial } from '@my-sahab/utils';
import { mergeDeepRight } from 'ramda';
import { useState } from 'react';
import { Locale } from 'src/constant-types';
import { getLocalizedDateFnsAdapter } from 'src/date-time-utils';
import { MultiLocalePickersActionBar, usePickerProps } from '../pickers-common';

type PickerTypes =
  | typeof TimePicker
  | typeof DatePicker
  | typeof DateTimePicker;

type PickerProps<
  P extends PickerTypes,
  In,
  Out = In,
> = P extends typeof TimePicker
  ? TimePickerProps<In, Out>
  : (P extends typeof DatePicker
      ? DatePickerProps<In, Out>
      : P extends typeof DateTimePicker
      ? DateTimePickerProps<In, Out>
      : never) & { multiLocale?: boolean };

type Props<P extends PickerTypes, In, Out> = SubsetPartial<
  PickerProps<P, In, Out>,
  'renderInput'
>;

export { Props as WrappedPickerProps };

export function WrapPicker<P extends PickerTypes>(Picker: P) {
  function WrappedPicker<In, Out>(props: Props<P, In, Out>) {
    const [locale, setLocale] = useState<Locale>(Locale.defaultLocale);
    const handleLocaleChange = () => {
      setLocale((prevLocale) =>
        prevLocale === Locale.en ? Locale.fa : Locale.en,
      );
    };
    const localeText = useLocaleText();

    const commonPickerProps = usePickerProps<In, Out>();

    // @ts-ignore
    if ('multiLocale' in props && props.multiLocale) {
      let changedProps = mergeDeepRight(props, {
        components: {
          ActionBar: MultiLocalePickersActionBar,
        },
        componentsProps: {
          actionBar: { locale, onLocaleChange: handleLocaleChange },
        },
      }) as unknown as PickerProps<P, In, Out>;

      return (
        <LocalizationProvider
          dateAdapter={getLocalizedDateFnsAdapter(locale)}
          localeText={localeText}
        >
          {/* @ts-ignore */}
          <Picker
            desktopModeMediaQuery="@media not all"
            {...commonPickerProps}
            {...changedProps}
          />
        </LocalizationProvider>
      );
    }

    return (
      //@ts-ignore
      <Picker
        desktopModeMediaQuery="@media not all"
        {...commonPickerProps}
        {...props}
      />
    );
  }

  return WrappedPicker;
}
