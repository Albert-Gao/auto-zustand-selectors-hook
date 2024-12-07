import * as React from 'react';
import { create } from 'zustand';
import { createSelectorHooks } from '../src/index';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

describe('Test createSelectorHooks', () => {
  it('should create functions for both property and action', () => {
    const useStoreBase = create<BearState>((set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }));

    const useStore = createSelectorHooks(useStoreBase);

    expect(typeof useStore.subscribe).toBe('function');
    expect(typeof useStore.setState).toBe('function');
    expect(typeof useStore.getState).toBe('function');
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

    render(<TestComponent />);

    expect(screen.getByTestId('text').textContent).toBe('0');

    fireEvent.click(screen.getByTestId('button'));

    expect(screen.getByTestId('text').textContent).toBe('1');

    fireEvent.click(screen.getByTestId('button'));

    expect(screen.getByTestId('text').textContent).toBe('2');
  });
});
