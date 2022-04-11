// read more about doc comment syntax in https://api-extractor.com/pages/tsdoc/doc_comment_syntax/

/**
 * utils in gooni
 *
 * @remarks
 * provide some common utils.
 *
 * @packageDocumentation
 */

export * from './js/general.util';
export { useDelayedValue } from './react/use-delayed-value';
export { useDeepMemoize } from './react/use-deep-memoize';
export { useToggleAbleState } from './react/use-toggleAble-state';
export { product } from './js/product';
export { useBooleanState } from './react/use-boolean-state';
export { useDialog } from './react/use-dialog';
export { Options } from './react/use-delayed-value';
export * from './types/type.utils';
export {
  ToggleAbleStateOptions,
  ToggleAbleStateReturn,
} from './react/use-toggleAble-state';
export { DialogHooksReturnType } from './react/use-dialog';
