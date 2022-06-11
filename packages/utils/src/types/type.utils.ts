export type Nil = null | undefined;

/**
 * @type FilterKeyByValueType filters a type based on value
 * @example FilterKeyByValueType<Person, number> -> {age: 10}
 */
export type FilterKeyByValueType<Base, ValueType> = {
  [key in keyof Base]: Base[key] extends ValueType ? key : never;
}[keyof Base];

// ────────────────────────────────────────────────────────────────────────────────

export type NonNilArray<A> = A extends (infer V | Nil)[] ? V[] : A;

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @type EnrichedArray
 * @example EnrichedArray<[{a: 1}], {b: 2}> -> [{a: 1, b: 2}]
 */
export type EnrichedArray<
  Array extends any[],
  Enrichment = {},
> = Array extends (infer V)[]
  ? (V extends null ? null : V & Enrichment)[]
  : never;

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @type ArrayItem<T> accepts an array type and returns the type of array items
 * @example ArrayItem<string[]> -> string
 * @example ArrayItem<typeof [2, 'name']> -> string | number
 */
export type ArrayItem<T extends any[]> = T extends (infer V)[] ? V : never;

/**
 * @type ReadonlyArrayItem<T> accepts a readonly array type and returns the type of array items
 * @example ReadonlyArray<ReadonlyArray<string>> -> string
 */
export type ReadonlyArrayItem<T extends ReadonlyArray<any>> =
  T extends ReadonlyArray<infer V> ? V : never;

// ────────────────────────────────────────────────────────────────────────────────

export type NonNull<T> = T extends null ? never : T;
export type NonNullProps<T> = { [P in keyof T]: NonNull<T[P]> };

/**
 * @type RequiredValues makes all values of a record non-nullable
 */
export type RequiredValues<T> = T extends { [key in keyof (infer K)]: any }
  ? { [key in keyof K]: T[key] extends infer V | null ? V : T[key] }
  : never;
/**
 * @type NullableProps make all properties nullable
 */
export type NullableProps<T> = { [P in keyof T]: T[P] | null };

/**
 * @type WithNullableKeys make some keys nullable
 */
export type WithNullableKeys<T, K extends keyof T> = Omit<T, K> &
  NullableProps<Pick<T, K>>;

export type WithNonNullKeys<T, K extends keyof T> = {
  [key in keyof T]: key extends K ? NonNull<T[key]> : T[key];
};

export type ArrayElement<T extends ReadonlyArray<unknown>> =
  T extends ReadonlyArray<infer R> ? R : never;

export type OmitRefType<T> = Omit<T, ' $refType'>;

export type SubsetPartial<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
