import { type StoreApi, type UseBoundStore, useStore } from 'zustand';

export type ZustandHookSelectors<StateType> = {
  [Key in keyof StateType as `use${Capitalize<
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
    storeIn[`use${capitalize(key)}`] = () => {
      return typeof storeIn === 'function'
        ? storeIn(selector)
        : useStore(storeIn, selector as any);
    };
  });

  return storeIn as UseBoundStore<StoreApi<StateType>> &
    ZustandHookSelectors<StateType>;
}
