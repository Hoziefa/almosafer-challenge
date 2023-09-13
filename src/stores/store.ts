import { createContext, useContext } from 'react';
import AppStore from './AppStore';
import FiltersStore from './FiltersStore';

export type Store = {
  appStore: AppStore;
  filtersStore: FiltersStore;
};

export const store: Store = {
  appStore: new AppStore(),
  filtersStore: new FiltersStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
