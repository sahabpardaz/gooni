import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { DefaultMuiPickerLocalization } from '../../pickers-common/default-mui-picker-localization';

export const calendarDecorator =
  (lang?: 'en' | 'fa'): DecoratorFunction<StoryFnReactReturnType> =>
  (Story, context) => {
    const locale = lang ?? context?.globals.locale ?? 'fa';

    return (
      <DefaultMuiPickerLocalization locale={locale}>
        <Story />
      </DefaultMuiPickerLocalization>
    );
  };
