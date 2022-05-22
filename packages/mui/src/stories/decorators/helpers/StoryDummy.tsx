import { StoryFn } from '@storybook/addons';
import { StoryFnReactReturnType } from '@storybook/react/dist/ts3.9/client/preview/types';

/**
 * It will wrap story inside a React component. It makes using useContext inside story possible.
 */
export const StoryDummy = (props: {
  storyFn: StoryFn<StoryFnReactReturnType>;
}) => {
  return (props as any).storyFn();
};
