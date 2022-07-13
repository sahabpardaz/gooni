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
export {
  useDelayedValue,
  type Options as UseDelayedValueOptions,
} from './hooks/use-delayed-value';
export { useDialog, type DialogHooksReturnType } from './hooks/use-dialog';
export {
  useToggleAbleState,
  type ToggleAbleStateOptions,
  type ToggleAbleStateReturn,
} from './hooks/use-toggleAble-state';
