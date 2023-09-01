import { createContext, useContext } from 'react';
import AppStore from './AppStore';

type Store = {
  appStore: AppStore;
};

export const store: Store = {
  appStore: new AppStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
