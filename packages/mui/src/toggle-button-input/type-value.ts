/**
 * `value` prop of `@px/toggle-button-input` component is an object consisting of two properties:
 * `type` and `value`
 * @typeParam T - the type of property `type`
 * @public
 */
export type TypeValue<T extends string> = {
  value: string;
  type: T | null;
};
