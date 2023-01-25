import { create } from 'zustand';
import { createSelectorFunctions, createSelectorHooks } from '../src/index';
import { persist } from 'zustand/middleware';

interface BearState {
  bears: number;
  increase: (by: number) => void;
}

describe('Test middlewares', () => {
  it('should have correct types when using middlewares - createSelectorHooks', () => {
    const useStoreBase = create<BearState>()(
      persist(
        (set) => ({
          bears: 0,
          increase: (by) => set((state) => ({ bears: state.bears + by })),
        }),
        {
          name: 'mock-storage-1',
        }
      )
    );

    const useStore = createSelectorHooks(useStoreBase);

    expect(typeof useStore.subscribe).toBe('function');
    expect(typeof useStore.setState).toBe('function');
    expect(typeof useStore.getState).toBe('function');
    expect(typeof useStore.useBears).toBe('function');
    expect(typeof useStore.useIncrease).toBe('function');
  });

  it('should have correct types when using middlewares - createSelectorFunctions', () => {
    const useStoreBase = create<BearState>()(
      persist(
        (set) => ({
          bears: 0,
          increase: (by) => set((state) => ({ bears: state.bears + by })),
        }),
        {
          name: 'mock-storage-2',
        }
      )
    );

    const useStore = createSelectorFunctions(useStoreBase);

    expect(typeof useStore.subscribe).toBe('function');
    expect(typeof useStore.setState).toBe('function');
    expect(typeof useStore.getState).toBe('function');
    expect(typeof useStore.use.bears).toBe('function');
    expect(typeof useStore.use.increase).toBe('function');
  });
});
