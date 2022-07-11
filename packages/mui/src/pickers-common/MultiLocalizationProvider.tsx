import {
  LocalizationProvider,
  LocalizationProviderProps,
} from '@mui/x-date-pickers';
import * as React from 'react';
import { Locale } from 'src/constant-types';
import { getLocalizedDateFnsAdapter } from 'src/date-time-utils';
import {
  defaultEnglishLocaleTexts,
  defaultPersianLocaleTexts,
} from './default-locale-texts';

interface Props
  extends Pick<LocalizationProviderProps, 'dateFormats' | 'localeText'> {
  children: React.ReactNode;
  /** locale options array to be available for the project, first locale in the array would be the default locale
   */
  localeOptions: Locale[];
  /** default `multiLocale` to be used for all date & date-time pickers in the children tree
   *  unless mentioned otherwise on the component itself */
  defaultMultiLocale?: boolean;
}

export interface MultiLocalizationContextValue {
  localeOptions: Locale[];
  defaultMultiLocale?: boolean;
  currentLocale: Locale;
  changeLocale: (value: Locale) => void;
}

export const MultiLocalizationContext =
  React.createContext<MultiLocalizationContextValue | null>(null);

/** Used for wrapping the whole project and provides proper adapters for the locales given as `localeOptions` props */
export function MultiLocalizationProvider(props: Props) {
  const {
    localeOptions,
    defaultMultiLocale = false,
    children,
    localeText,
    dateFormats,
  } = props;

  const defaultLocale = localeOptions[0];
  const [currentLocale, setCurrentLocale] = React.useState(defaultLocale);

  const contextValue: MultiLocalizationContextValue = React.useMemo(
    () => ({
      localeOptions,
      defaultMultiLocale,
      currentLocale,
      changeLocale: setCurrentLocale,
    }),
    [localeOptions, defaultMultiLocale, currentLocale, setCurrentLocale],
  );

  const memoizedLocalizedDateAdapter = React.useMemo(
    () => getLocalizedDateFnsAdapter(currentLocale),
    [currentLocale],
  );

  const memoizedLocaleText = React.useMemo(
    () =>
      localeText ||
      (defaultLocale === Locale.en
        ? defaultEnglishLocaleTexts
        : defaultPersianLocaleTexts),
    [localeText, defaultLocale],
  );

  return (
    <MultiLocalizationContext.Provider value={contextValue}>
      <LocalizationProvider
        dateAdapter={memoizedLocalizedDateAdapter}
        localeText={memoizedLocaleText}
        dateFormats={dateFormats}
      >
        {children}
      </LocalizationProvider>
    </MultiLocalizationContext.Provider>
  );
}

export const useMultiLocalizationContext =
  (): MultiLocalizationContextValue => {
    const localizationContext = React.useContext(MultiLocalizationContext);
    if (localizationContext === null) {
      throw new Error(
        'Gooni: Can not find localeOptions in context. It looks like you forgot to wrap your component in MultiLocalizationProvider, or pass required props.',
      );
    }

    return localizationContext;
  };
