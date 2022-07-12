import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { Locale } from 'src/constant-types';
import { MultiLocalizationProvider } from 'src/pickers-common';
import { LocaleWithCustomAdapter } from 'src/pickers-common/MultiLocalizationProvider';

export const calendarDecorator =
  (
    localeOptions?: (Locale | LocaleWithCustomAdapter)[],
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
