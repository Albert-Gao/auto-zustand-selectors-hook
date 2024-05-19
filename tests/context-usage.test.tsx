import * as React from 'react';
import { createStore } from 'zustand';
import { createSelectorFunctions, createSelectorHooks } from '../src/index';
import { render, fireEvent } from '@testing-library/react';
import { combine } from 'zustand/middleware';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

const initialBearState = {
  bears: 0,
  increase: (by: number) => by + 1,
};

describe('the Context + createSelectorFunctions() usage should work', () => {
  it('should work when using createSelectorFunctions() alone', () => {
    const useStoreBase = createStore<BearState>((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }));

    const StoreContext = React.createContext<any>({
      bears: 0,
      increase: () => {},
    });

    const useStore = createSelectorFunctions(useStoreBase);

    const TestComponent = () => {
      const bears = useStore.use.bears();
      const increase = useStore.use.increase();

      return (
        <>
          <span data-testid="text">{bears}</span>
          <button
            data-testid="button"
            onClick={() => {
              increase(1);
            }}
          >
            increase
          </button>
        </>
      );
    };

    const App = () => (
      <StoreContext.Provider value={useStoreBase}>
        <TestComponent />
      </StoreContext.Provider>
    );

    const { getByTestId } = render(<App />);

    expect(getByTestId('text').textContent).toBe('0');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('1');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('2');
  });

  it('should work when using combine() + createSelectorFunctions()', () => {
    const useStoreBase = createStore<BearState>(
      combine(initialBearState, (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }))
    );

    const StoreContext = React.createContext<any>({
      bears: 0,
      increase: () => {},
    });

    const useStore = createSelectorFunctions(useStoreBase);

    const TestComponent = () => {
      const bears = useStore.use.bears();
      const increase = useStore.use.increase();

      return (
        <>
          <span data-testid="text">{bears}</span>
          <button
            data-testid="button"
            onClick={() => {
              increase(1);
            }}
          >
            increase
          </button>
        </>
      );
    };

    const App = () => {
      return (
        <StoreContext.Provider value={useStoreBase}>
          <TestComponent />
        </StoreContext.Provider>
      );
    };

    const { getByTestId } = render(<App />);

    expect(getByTestId('text').textContent).toBe('0');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('1');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('2');
  });
});

describe('the Context + createSelectorHooks() usage should work', () => {
  it('should work when using createSelectorHooks() alone', () => {
    const useStoreBase = createStore<BearState>((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }));

    const useStore = createSelectorHooks(useStoreBase);

    const TestComponent = () => {
      const bears = useStore.useBears();
      const increase = useStore.useIncrease();

      return (
        <>
          <span data-testid="text">{bears}</span>
          <button
            data-testid="button"
            onClick={() => {
              increase(1);
            }}
          >
            increase
          </button>
        </>
      );
    };

    const StoreContext = React.createContext<any>({
      bears: 0,
      increase: () => {},
    });

    const App = () => (
      <StoreContext.Provider value={useStoreBase}>
        <TestComponent />
      </StoreContext.Provider>
    );

    const { getByTestId } = render(<App />);

    expect(getByTestId('text').textContent).toBe('0');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('1');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('2');
  });

  it('should work when using combine() + createSelectorHooks()', () => {
    const useStoreBase = createStore<BearState>(
      combine(initialBearState, (set) => ({
        bears: 0,
        increase: (by) => set((state) => ({ bears: state.bears + by })),
      }))
    );

    const useStore = createSelectorHooks(useStoreBase);

    const TestComponent = () => {
      const bears = useStore.useBears();
      const increase = useStore.useIncrease();

      return (
        <>
          <span data-testid="text">{bears}</span>
          <button
            data-testid="button"
            onClick={() => {
              increase(1);
            }}
          >
            increase
          </button>
        </>
      );
    };

    const StoreContext = React.createContext<any>({
      bears: 0,
      increase: () => {},
    });

    const App = () => (
      <StoreContext.Provider value={useStoreBase}>
        <TestComponent />
      </StoreContext.Provider>
    );

    const { getByTestId } = render(<App />);

    expect(getByTestId('text').textContent).toBe('0');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('1');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('2');
  });
});
