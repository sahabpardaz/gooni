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

type GeneralizedLocale = Locale | string;

/**
 * type for locales with custom adapter taken from the user
 */
export type LocaleWithCustomAdapter = {
  locale: GeneralizedLocale;
  adapter: LocalizationProviderProps['dateAdapter'];
};

export type LocalesWithAdapters = Record<
  GeneralizedLocale,
  LocalizationProviderProps['dateAdapter']
>;

/**
 * type guard for Locale type
 * @param localeOption
 * @returns whether localeOption is of type Locale(`true`) or LocaleWithCustomAdapter(`false`)
 */
function isLocale(
  localeOption: Locale | LocaleWithCustomAdapter,
): localeOption is Locale {
  return (localeOption as LocaleWithCustomAdapter).locale === undefined;
}

interface Props
  extends Pick<LocalizationProviderProps, 'dateFormats' | 'localeText'> {
  children: React.ReactNode;
  /** locale options array to be available for the project
   *
   * first locale in the array would be the default locale
   *
   * locale option can be given in two formats:
   * - locale with default adapter provided by gooni, e.g. `Locale.en`, `Locale.fa`
   * - locale with custom adapter, e.g. `{locale: 'en', adapter: yourCustomEnAdapter}`
   */
  localeOptions: (Locale | LocaleWithCustomAdapter)[];
  /** default `multiLocale` to be used for all date & date-time pickers in the children tree
   *  unless mentioned otherwise on the component itself */
  defaultMultiLocale?: boolean;
}

export interface MultiLocalizationContextValue {
  locales: GeneralizedLocale[];
  defaultMultiLocale?: boolean;
  currentLocale: GeneralizedLocale;
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

  const [locales, localesWithAdapters] = React.useMemo(() => {
    const localesWithAdapters: LocalesWithAdapters = Object.fromEntries(
      localeOptions.map((localeOption) =>
        isLocale(localeOption)
          ? [localeOption, getLocalizedDateFnsAdapter(localeOption)]
          : [localeOption.locale, localeOption.adapter],
      ),
    );
    return [Object.keys(localesWithAdapters), localesWithAdapters];
  }, [localeOptions]);

  const defaultLocale = locales[0];
  const [currentLocale, setCurrentLocale] = React.useState(defaultLocale);

  const contextValue: MultiLocalizationContextValue = React.useMemo(
    () => ({
      locales,
      defaultMultiLocale,
      currentLocale,
      changeLocale: setCurrentLocale,
    }),
    [locales, defaultMultiLocale, currentLocale, setCurrentLocale],
  );

  return (
    <MultiLocalizationContext.Provider value={contextValue}>
      <LocalizationProvider
        dateAdapter={localesWithAdapters[currentLocale]}
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
