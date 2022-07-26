import { StoreApi, UseBoundStore } from 'zustand';

interface ZustandFuncSelectors<StateType> {
  use: {
    [key in keyof StateType]: () => StateType[key];
  };
}

export function createSelectorFunctions<StateType extends object>(
  store: UseBoundStore<StoreApi<StateType>>
) {
  const storeIn = store as any;

  storeIn.use = {};

  Object.keys(storeIn.getState()).forEach((key) => {
    const selector = (state: StateType) => state[key as keyof StateType];
    storeIn.use[key] = () => store(selector);
  });

  return store as UseBoundStore<StoreApi<StateType>> &
    ZustandFuncSelectors<StateType>;
}
