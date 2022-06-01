import { Paper, PaperProps } from '@mui/material';
import { DecoratorFunction } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

export const storyWrapperDecorator =
  (style?: PaperProps['style']): DecoratorFunction<StoryFnReactReturnType> =>
  (Story) =>
    (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          style={{
            width: 400,
            height: 400,
            padding: 16,
            ...style,
          }}
        >
          <Story />
        </Paper>
      </div>
    );
