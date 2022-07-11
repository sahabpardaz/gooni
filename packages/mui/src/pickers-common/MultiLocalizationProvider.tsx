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
  /** default `multiLocale` to be used for all date & date-time pickers unless mentioned otherwise on the component itself */
  defaultMultiLocaleProp?: boolean;
}

export interface MultiLocalizationContextValue {
  localeOptions: Locale[];
  defaultMultiLocaleProp?: boolean;
  currentLocale: Locale;
  changeLocale: (value: Locale) => void;
}

export const MultiLocalizationContext =
  React.createContext<MultiLocalizationContextValue | null>(null);

/** Used for wrapping the whole project and provides proper adapters for the locales given as `localeOptions` props */
export function MultiLocalizationProvider(props: Props) {
  const {
    localeOptions,
    defaultMultiLocaleProp = false,
    children,
    localeText,
    dateFormats,
  } = props;

  const defaultLocale = localeOptions[0];
  const [currentLocale, setCurrentLocale] = React.useState(defaultLocale);
  const changeLocale = (value: Locale) => {
    setCurrentLocale(value);
  };

  const contextValue: MultiLocalizationContextValue = {
    localeOptions,
    defaultMultiLocaleProp,
    currentLocale,
    changeLocale,
  };

  return (
    <MultiLocalizationContext.Provider value={contextValue}>
      <LocalizationProvider
        dateAdapter={getLocalizedDateFnsAdapter(currentLocale)}
        localeText={
          localeText ||
          (defaultLocale === Locale.en
            ? defaultEnglishLocaleTexts
            : defaultPersianLocaleTexts)
        }
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
