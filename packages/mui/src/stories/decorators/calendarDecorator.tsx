import React, { createContext, useCallback, useContext, useState } from 'react';
import { DecoratorFunction, StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

import { StoryDummy } from './helpers';
import { localeConfig } from '../_config/locale';

export type CalendarType = {
  language: string;
  changeLanguage: Function;
};
export const CalendarContext = createContext<CalendarType | undefined>(
  undefined,
);
export const useCalendarContext = () => {
  const value = useContext(CalendarContext);
  if (value === undefined) {
    throw new Error(
      'useCalendarContext muse be used within CalendarContextProvider',
    );
  }

  return value;
};
interface OwnProps {
  value: CalendarType | undefined;
}

export type Props = React.PropsWithChildren<OwnProps>;

export const calendarDecorator =
  (): DecoratorFunction<StoryFnReactReturnType> =>
  (storyFn: StoryFn<StoryFnReactReturnType>) => {
    const [language, setLanguage] = useState<string>('en');
    const changeLanguage = useCallback((lang) => {
      if (lang === 'en') {
        localeConfig(true);
        setLanguage('en');
      } else {
        localeConfig();
        setLanguage('fa');
      }
    }, []);
    return (
      <CalendarContextProvider value={{ language, changeLanguage }}>
        <StoryDummy storyFn={storyFn} />
      </CalendarContextProvider>
    );
  };
export function CalendarContextProvider(props: Props) {
  return (
    <CalendarContext.Provider value={props.value}>
      {props.children}
    </CalendarContext.Provider>
  );
}
