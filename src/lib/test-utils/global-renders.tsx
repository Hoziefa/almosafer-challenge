import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Store, StoreContext } from '@stores/store';

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
