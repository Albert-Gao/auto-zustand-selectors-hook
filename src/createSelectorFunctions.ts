import { type StoreApi, type UseBoundStore, useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

export interface ZustandFuncSelectors<StateType> {
  use: {
    [key in NonNullable<keyof StateType>]: () => StateType[key];
  };
}

export function createSelectorFunctions<StateType extends object>(
  store: UseBoundStore<StoreApi<StateType>> | StoreApi<StateType>
) {
  const storeIn = store as any;

  storeIn.use = {};

  Object.keys(storeIn.getState()).forEach((key) => {
    const selector = (state: StateType) => state[key as keyof StateType];
    storeIn.use[key] =
      typeof storeIn === 'function'
        ? () => storeIn(useShallow(selector))
        : () => useStore(storeIn, useShallow(selector as any));
  });

  return store as UseBoundStore<StoreApi<StateType>> &
    ZustandFuncSelectors<StateType>;
}
