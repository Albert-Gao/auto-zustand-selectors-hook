# auto-zustand-selectors-hook

  <a href="https://www.npmjs.com/package/auto-zustand-selectors-hook" alt="npm package">
    <img src="https://badgen.net/npm/v/auto-zustand-selectors-hook?icon=npm"/>
  </a>

  <a href="https://github.com/Albert-Gao/auto-zustand-selectors-hook/actions" alt="combined checks">
    <img src="https://badgen.net/github/checks/albert-gao/auto-zustand-selectors-hook?label=ci"/>
  </a>

  <a href="https://github.com/Albert-Gao/auto-zustand-selectors-hook" alt="last commits">
    <img src="https://badgen.net/github/last-commit/albert-gao/auto-zustand-selectors-hook"/>
  </a>

  <a href="https://github.com/Albert-Gao/auto-zustand-selectors-hook" alt="licence">
    <img src="https://badgen.net/npm/license/auto-zustand-selectors-hook"/>
  </a>

  <a href="https://coveralls.io/github/Albert-Gao/auto-zustand-selectors-hook" alt="test coverage">
    <img src="https://badgen.net/coveralls/c/github/Albert-Gao/auto-zustand-selectors-hook"/>
  </a>

  <a href="https://www.npmjs.com/package/auto-zustand-selectors-hook" alt="types">
    <img src="https://badgen.net/npm/types/auto-zustand-selectors-hook"/>
  </a>

  <a href="https://bundlephobia.com/result?p=auto-zustand-selectors-hook@latest" alt="minified">
    <img src="https://badgen.net/bundlephobia/min/auto-zustand-selectors-hook"/>
  </a>

  <a href="https://bundlephobia.com/result?p=auto-zustand-selectors-hook@latest" alt="minified + gzip">
    <img src="https://badgen.net/bundlephobia/minzip/auto-zustand-selectors-hook"/>
  </a>

  <a href="https://twitter.com/albertgao" alt="twitter">
    <img src="https://badgen.net/twitter/follow/albertgao"/>
  </a>

**Enjoy the performance gain of selectors without writing selectors!**

## Features

- auto generate selectors for Zustand store (be it a value or a function)
- Two styles available
- Fully Typescript support (auto-completion for the generated selectors!)

## Install

```bash
npm install --save auto-zustand-selectors-hook
```

Or with yarn:

```bash
yarn add auto-zustand-selectors-hook
```

## Notice

The `v2` supports `Zustand v4`, if you are using a `Zustand v3`, please install the `v1` version

```bash
yarn add auto-zustand-selectors-hook@1.0.1

npm install --save auto-zustand-selectors-hook@1.0.1
```

## Usage

Let's say you have a store like this

```typescript
interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const useStoreBase = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
```

> **There are two types of selectors you can generate, purely function signature difference, underneath, they are all selectors.**

## 1. For function style ( createSelectorFunctions )

```typescript
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

// wrap your store
const useStore = createSelectorFunctions(useStoreBase);

// use it like this!
// useStore.use.blah is a pre-generated selector, yeah!
const TestComponent = () => {
  const bears = useStore.use.bears();
  const increase = useStore.use.increase();

  return (
    <>
      <span>{bears}</span>

      <button
        onClick={() => {
          increase(1);
        }}
      >
        +
      </button>
    </>
  );
};
```

## 2. For hook style ( createSelectorHooks )

```typescript
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

// wrap your store
const useStore = createSelectorHooks(useStoreBase);

// use it like this!
// useStore.useBlah is a pre-generated selector, yeah!
const TestComponent = () => {
  const bears = useStore.useBears();
  const increase = useStore.useIncrease();

  return (
    <>
      <span>{bears}</span>

      <button
        onClick={() => {
          increase(1);
        }}
      >
        +
      </button>
    </>
  );
};
```

## 3. use with middlewares

> You use the middleware for creating the base store, and `ALWAYS` use `auto-zustand-selectors-hooks` as a separate wrapper

```typescript
import {
  createSelectorHooks,
  ZustandFuncSelectors,
  ZustandHookSelectors,
} from 'auto-zustand-selectors-hook';
import create from 'zustand';
import { persist } from 'zustand/middleware';

const useStoreBase = create<BearState>()(
  persist((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
  }))
);

// ❌ this will lost  the persist middleware type like useStore.persist
export const useStore = createSelectorHooks(useStoreBase);

// ✅ DO this if use createSelectorFunctions()
export const useStore = createSelectorFunctions(
  useStoreBase
) as typeof useStoreBase & ZustandFuncSelectors<BearState>;

// ✅ DO this if use createSelectorHooks()
export const useStore = createSelectorHooks(
  useStoreBase
) as typeof useStoreBase & ZustandHookSelectors<BearState>;
```

## License

MIT © [Albert Gao](https://github.com/Albert-Gao)

## Credits

It all starts from my [feature request](https://github.com/pmndrs/zustand/issues/400)
Thanks [dai-shi](https://github.com/dai-shi) for the initial implementation and ideas of API.
