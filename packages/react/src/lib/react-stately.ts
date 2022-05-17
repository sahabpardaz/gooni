// TODO: remove this declaration when @react-stately/utils merged pr
declare module '@react-stately/utils' {
  export function useControlledState<T>(
    value?: T,
    defaultValue?: T,
    onChange?: (value: T, ...args: any[]) => void,
  ): [T, (value: T | ((prevState: T) => T), ...args: any[]) => void];
}
