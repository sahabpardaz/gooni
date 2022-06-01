import { ReactNode } from 'react';

import { FCProps } from '.';

type Props = FCProps<{ a: number }>;

const X = (_props: FCProps<{ x: number }>) => null;
const Y = (_props: FCProps<{}>) => null;
const noop = (_render: () => ReactNode) => {};
function MyComponent(props: Props) {
  return <X x={props.a}>{props.children}</X>;
}

describe('FCProps', () => {
  it('should add children to component props', () => {
    noop(() => (
      <MyComponent a={3}>
        <Y />
      </MyComponent>
    ));
  });
});
