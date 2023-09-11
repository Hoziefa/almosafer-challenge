import React from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { type Store, StoreContext } from '@stores/store';
import { FiltersProvider, type FiltersState } from '@contexts/FiltersContext';

import type { GenericContext } from '@app-types';

export const renderWithQuery = (
  ui: React.ReactElement,
  queryClient: QueryClient,
  options: RenderOptions = {},
) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    { ...options },
  );
};

export const renderWithStore = (ui: React.ReactElement, store: Store) => {
  return render(
    <StoreContext.Provider value={store}>{ui}</StoreContext.Provider>,
  );
};

export const renderWithFilters = (
  ui: React.ReactElement,
  options: RenderOptions & GenericContext<Partial<FiltersState>> = {
    defaultInitialState: {},
  },
) => {
  return render(
    <FiltersProvider defaultInitialState={options.defaultInitialState}>
      {ui}
    </FiltersProvider>,
    { ...options },
  );
};
