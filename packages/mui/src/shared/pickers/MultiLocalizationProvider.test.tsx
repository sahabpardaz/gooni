import { useLocaleText, useUtils } from '@mui/x-date-pickers/internals';
import { act, renderHook } from '@testing-library/react-hooks';
import { enUS } from 'date-fns/locale';
import { mergeDeepRight } from 'ramda';
import { Locale } from 'src/constant-types';
import { getLocalizedDateFnsAdapter } from 'src/date-time-utils';
import {
  defaultEnglishLocaleTexts,
  defaultPersianLocaleTexts,
} from './default-locale-texts';
import {
  MultiLocalizationProvider,
  MultiLocalizationProviderProps,
  useMultiLocalizationContext,
} from './MultiLocalizationProvider';

function renderAllContextHooksWithProps(
  props: Omit<MultiLocalizationProviderProps, 'children'>,
) {
  const { localeOptions, localeText, defaultMultiLocale, dateFormats } = props;

  return renderHook(
    () => ({
      multiContext: useMultiLocalizationContext(),
      muiUtils: useUtils(),
      muiLocaleTexts: useLocaleText(),
    }),
    {
      wrapper: MultiLocalizationProvider,
      initialProps: {
        localeOptions,
        localeText,
        defaultMultiLocale,
        dateFormats,
      },
    },
  );
}

describe('MultiLocalizationProvider', () => {
  it('its useContext should throw error when its provider is not used!', () => {
    const { result } = renderHook(useMultiLocalizationContext);
    expect(result.error).toBeDefined();
  });

  describe('context objects are built and operate correctly', () => {
    it('default locales given in localeOptions', () => {
      const { result } = renderAllContextHooksWithProps({
        localeOptions: [Locale.en, Locale.fa],
      });

      expect(result.current.multiContext).toMatchObject({
        locales: [Locale.en, Locale.fa],
        defaultMultiLocale: false,
        currentLocale: Locale.en,
      });
      expect(result.current.muiUtils.lib).toEqual('date-fns');
      expect(result.current.muiLocaleTexts).toMatchObject(
        defaultEnglishLocaleTexts,
      );

      act(() => {
        result.current.multiContext.changeLocale(Locale.fa);
      });

      expect(result.current.multiContext.currentLocale).toEqual(Locale.fa);
      expect(result.current.muiUtils.lib).toEqual('date-fns-jalali');
      expect(result.current.muiLocaleTexts).toMatchObject(
        defaultEnglishLocaleTexts,
      );
    });

    it('custom locales given in localeOptions', () => {
      const { result } = renderAllContextHooksWithProps({
        localeOptions: [
          { locale: 'fa', adapter: getLocalizedDateFnsAdapter(Locale.fa) },
          {
            locale: 'en',
            adapter: getLocalizedDateFnsAdapter(Locale.en),
            adapterLocale: enUS,
          },
        ],
        defaultMultiLocale: true,
      });

      expect(result.current.multiContext).toMatchObject({
        locales: ['fa', 'en'],
        defaultMultiLocale: true,
        currentLocale: 'fa',
      });
      expect(result.current.muiUtils.lib).toEqual('date-fns-jalali');
      expect(result.current.muiLocaleTexts).toMatchObject(
        defaultPersianLocaleTexts,
      );

      act(() => {
        result.current.multiContext.changeLocale('en');
      });

      expect(result.current.multiContext.currentLocale).toEqual('en');
      expect(result.current.muiUtils.lib).toEqual('date-fns');
      expect(result.current.muiLocaleTexts).toMatchObject(
        defaultPersianLocaleTexts,
      );
    });
  });

  it('custom locale text is merged correctly', () => {
    const customLocaleText = {
      localeButtonLabel: { [Locale.fa]: 'جلالی', ar: 'قمری' },
    };
    const { result } = renderHook(useLocaleText, {
      wrapper: MultiLocalizationProvider,
      initialProps: {
        localeOptions: [Locale.fa, Locale.en],
        localeText: customLocaleText,
      },
    });

    expect(result.current).toMatchObject(
      mergeDeepRight(defaultPersianLocaleTexts, customLocaleText),
    );
  });
});
