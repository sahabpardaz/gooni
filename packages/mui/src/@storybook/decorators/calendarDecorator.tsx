import {
  Locale,
  MultiLocalizationProvider,
  MultiLocalizationProviderProps,
} from '@my-sahab/mui';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

export const calendarDecorator =
  (
    localeOptions?: MultiLocalizationProviderProps['localeOptions'],
  ): DecoratorFunction<StoryFnReactReturnType> =>
  (Story, context) => {
    let defaultLocaleOptions =
      context.globals.locale === 'en'
        ? [Locale.en, Locale.fa]
        : [Locale.fa, Locale.en];
    return (
      <MultiLocalizationProvider
        localeOptions={localeOptions || defaultLocaleOptions}
      >
        <Story />
      </MultiLocalizationProvider>
    );
  };
