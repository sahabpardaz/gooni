import { calendarDecorator, themeDecorator } from '../src/stories/decorators';
// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'fa',
    toolbar: {
      icon: 'globe',
      items: ['fa', 'en'],
    },
  },
};

export const decorators = [themeDecorator, calendarDecorator()];
