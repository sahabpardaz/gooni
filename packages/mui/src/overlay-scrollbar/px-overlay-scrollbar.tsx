import 'overlayscrollbars/css/OverlayScrollbars.min.css';

import * as React from 'react';

import { ImperativeHandles, useOverlayScrollbar } from './useOverlayScrollbar';

/**
 * @public
 */
interface OwnProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: OverlayScrollbars.Options;
}

/**
 * OverlayScrollbars Props
 *
 * @public
 */
export type Props = React.PropsWithChildren<OwnProps>;

/**
 * A component that render scrollbars
 * @public
 * @param {React.Ref<ImperativeHandles>} instanceRef
 * @param {Props} props
 * @returns {JSX.Element}
 *
 * @example
 * Here's an example:
 *
 * ```ts
 * function MyComponent(){
 *     return <OverlayScrollbars>
 *              <MyList/>
 *            </OverlayScrollbars>;
 * }
 * ```
 */
export const PxOverlayScrollbar = React.forwardRef(function (
  props: Props,
  instanceRef: React.Ref<ImperativeHandles>,
) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { options, ...divProps } = props;

  useOverlayScrollbar(ref, options, instanceRef);

  return (
    <div {...divProps} ref={ref}>
      {props.children}
    </div>
  );
});
