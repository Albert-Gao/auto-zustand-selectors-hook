import { type StoreApi, type UseBoundStore, useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

export type ZustandHookSelectors<StateType> = {
  [Key in NonNullable<keyof StateType> as `use${Capitalize<
    string & Key
  >}`]: () => StateType[Key];
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function createSelectorHooks<StateType extends object>(
  store: UseBoundStore<StoreApi<StateType>> | StoreApi<StateType>
) {
  const storeIn = store as any;

  Object.keys(storeIn.getState()).forEach((key) => {
    const selector = (state: StateType) => state[key as keyof StateType];
    storeIn[`use${capitalize(key)}`] =
      typeof storeIn === 'function'
        ? () => storeIn(useShallow(selector))
        : () => useStore(storeIn, useShallow(selector as any));
  });

  return storeIn as UseBoundStore<StoreApi<StateType>> &
    ZustandHookSelectors<StateType>;
}
