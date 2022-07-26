import { StoreApi, UseBoundStore } from 'zustand';

type ZustandHookSelectors<BaseType> = {
  [Key in keyof BaseType as `use${Capitalize<
    string & Key
  >}`]: () => BaseType[Key];
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function createSelectorHooks<StoreType extends object>(
  store: UseBoundStore<StoreApi<StoreType>>
) {
  const storeIn = store as any;

  Object.keys(storeIn.getState()).forEach((key) => {
    const selector = (state: StoreType) => state[key as keyof StoreType];
    storeIn[`use${capitalize(key)}`] = () => storeIn(selector);
  });

  return storeIn as UseBoundStore<StoreApi<StoreType>> &
    ZustandHookSelectors<StoreType>;
}
