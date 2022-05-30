// read more about doc comment syntax in https://api-extractor.com/pages/tsdoc/doc_comment_syntax/

/**
 * hooks in gooni
 *
 * @remarks
 * provide some common utils.
 *
 * @packageDocumentation
 */

export { useBooleanState } from './hooks/use-boolean-state';
export { useDeepMemoize } from './hooks/use-deep-memoize';
export { Options, useDelayedValue } from './hooks/use-delayed-value';
export { DialogHooksReturnType, useDialog } from './hooks/use-dialog';
export {
  ToggleAbleStateOptions,
  ToggleAbleStateReturn,
  useToggleAbleState,
} from './hooks/use-toggleAble-state';
