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

**Stop writing selectors and do more work!**

## Features

- auto generate selectors for Zustand store
- 2 styles available
- Typescript auto completion supported

## Install

```bash
npm install --save auto-zustand-selectors-hook
```

Or with yarn:

```bash
yarn add auto-zustand-selectors-hook
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

**There are two types of selectors you can generate, purely function signature difference, underneath, they are all selectors.**

### For function style ( createSelectorFunctions )

```typescript
import { createSelectorFunctions } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

// wrap your store
const useStore = createSelectorFunctions(useStoreBase);

// use it like this!
// .use.blahblah is a pre-generated selector, yeah!
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

### For hook style ( createSelectorHooks )

```typescript
import { createSelectorHooks } from 'auto-zustand-selectors-hook';
import { create } from 'zustand';

// create your store
const useStoreBase = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

// wrap your store
const useStore = createSelectorHooks(useStoreBase);

// use it like this!
// .useBlahblah is a pre-generated selector, yeah!
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

## License

MIT © [Albert Gao](https://github.com/Albert-Gao)

## Credits

It all starts from my [feature request](https://github.com/pmndrs/zustand/issues/400)
Thanks [dai-shi](https://github.com/dai-shi) for the initial implementation and ideas of API.
