import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { Locale } from 'src/constant-types';
import { DefaultMuiPickerLocalization } from '../../pickers-common/default-mui-picker-localization';

export const calendarDecorator =
  (locale?: Locale): DecoratorFunction<StoryFnReactReturnType> =>
  (Story, context) => {
    return (
      <DefaultMuiPickerLocalization
        locale={locale || context?.globals.locale || Locale.defaultLocale}
      >
        <Story />
      </DefaultMuiPickerLocalization>
    );
  };
