import { ReactNode } from 'react';
/**
 * add optional children prop if not provided
 * @typeParam Props - other props
 *
 * @deprecated since version `0.2.2`. Use `React.PropsWithChildren` instead
 *
 * @public
 *
 * @example
 *
 * ```tsx
 * import React from 'react';
 * import { FCProps } from '@my-sahab/mui';
 *
 * interface OwnProps {
 *  className: string;
 * }
 *
 * type Props = FCProps<OwnProps>
 *
 * export function MyComponent(props: Props) {
 *   return <div className={props.className}>{props.children}</div>
 * }
 * ```
 */
export type FCProps<Props> = Props extends { children: any }
  ? Props
  : Props & { children?: ReactNode };
