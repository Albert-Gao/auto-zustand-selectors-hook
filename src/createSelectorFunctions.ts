import { StoreApi, UseBoundStore } from 'zustand';

interface ZustandFuncSelectors<StoreType> {
  use: {
    [key in keyof StoreType]: () => StoreType[key];
  };
}

export function createSelectorFunctions<StoreType extends object>(
  store: UseBoundStore<StoreApi<StoreType>>
) {
  const storeIn = store as any;

  storeIn.use = {};

  Object.keys(storeIn.getState()).forEach((key) => {
    const selector = (state: StoreType) => state[key as keyof StoreType];
    storeIn.use[key] = () => store(selector);
  });

  return store as UseBoundStore<StoreApi<StoreType>> &
    ZustandFuncSelectors<StoreType>;
}
