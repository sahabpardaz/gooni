import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';
import { Settings } from 'luxon';
import { useEffect } from 'react';
import { DefaultMuiPickerLocalization } from '../../pickers-common/default-mui-picker-localization';

export const calendarDecorator =
  (lang?: 'en' | 'fa'): DecoratorFunction<StoryFnReactReturnType> =>
  (Story, context) => {
    const locale = lang ?? context?.globals.locale ?? 'fa';

    useEffect(() => {
      if (locale === 'en') {
        Settings.defaultOutputCalendar = 'utc';
        Settings.defaultLocale = 'en-US';
      } else {
        Settings.defaultOutputCalendar = 'persian';
        Settings.defaultLocale = 'fa-IR';
      }
    }, [locale]);

    return (
      <DefaultMuiPickerLocalization locale={locale}>
        <Story />
      </DefaultMuiPickerLocalization>
    );
  };
