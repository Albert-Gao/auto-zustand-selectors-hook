import { StoreApi, UseBoundStore } from 'zustand';

export interface ZustandFuncSelectors<StateType> {
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
    storeIn.use[key] = () => storeIn(selector);
  });

  return store as UseBoundStore<StoreApi<StateType>> &
    ZustandFuncSelectors<StateType>;
}
