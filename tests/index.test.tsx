import * as React from 'react';
import create from 'zustand';
import { createSelectorFunctions, createSelectorHooks } from '../src/index';
import { render, fireEvent } from '@testing-library/react';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

describe('Test createSelectorFunctions', () => {
  it('should create functions for both property and action', () => {
    const useStoreBase = create<BearState>((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }));

    const useStore = createSelectorFunctions(useStoreBase);

    expect(typeof useStore.use.bears).toBe('function');
    expect(typeof useStore.use.increase).toBe('function');
  });

  it('should function correct when rendering in React.js', () => {
    const useStoreBase = create<BearState>((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }));

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

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('text').textContent).toBe('0');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('1');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('2');
  });
});

describe('Test createSelectorHooks', () => {
  it('should create functions for both property and action', () => {
    const useStoreBase = create<BearState>((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }));

    const useStore = createSelectorHooks(useStoreBase);

    expect(typeof useStore.useBears).toBe('function');
    expect(typeof useStore.useIncrease).toBe('function');
  });

  it('should function correct when rendering in React.js', () => {
    const useStoreBase = create<BearState>((set) => ({
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

    const { getByTestId } = render(<TestComponent />);

    expect(getByTestId('text').textContent).toBe('0');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('1');

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('text').textContent).toBe('2');
  });
});
