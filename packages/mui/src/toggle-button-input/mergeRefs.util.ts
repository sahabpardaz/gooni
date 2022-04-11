import React, { useCallback } from 'react';

// TODO: add this to spreated package

export type Ref<T> =
  | ((instance: T) => void)
  | React.MutableRefObject<T>
  | null
  | undefined;

/**
 *
 * Integrate multiple refs into one.
 *
 * @remarks This hook takes refs and returns a function that would receive an instance and then call the refs
 * if they are functions, or assign the instance to them otherwise.
 *
 * Note that the intention is to provide refs statically and not dynamically,
 * so try not to spread refs array into its argument.
 *
 * @param refs - functions or mutable refs
 */
export function useMergeRefs<T>(...refs: Ref<T>[]) {
  return useCallback(
    (instance: T) => {
      refs.forEach((ref) => {
        if (ref) {
          if (typeof ref === 'function') {
            ref(instance);
          } else {
            ref.current = instance;
          }
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs],
  );
}
