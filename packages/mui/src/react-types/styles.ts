/**
 * define `classes` props
 * @typeParam S - styles
 * @public
 *
 * @example
 *
 * ```tsx
 * import React from 'react';
 * import { Styles } from '@my-sahab/mui';
 *
 * interface OwnProps {}
 *
 * type Props = React.PropsWithChildren<OwnProps> & StyleProps
 *
 * export function MyComponent(props: Props) {
 *   let { classes } = useStyles();
 *   classes = useMergedClasses(classes, props.classes);
 *   return <div className={classes.root}>Hello!</div>
 * }
 *
 * const useStyles = makeStyles({ name: 'MyComponent' })((theme) => ({
 *   root: {
 *     display: 'inline-block',
 *   },
 * }));
 * type StyleProps = Styles<typeof useStyles>;
 * ```
 */
export type Styles<S extends (...args: any[]) => { classes: unknown }> = {
  classes?: Partial<ReturnType<S>['classes']>;
};
