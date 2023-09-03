import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import GithubTables from './GithubTables';

jest.mock('next/navigation', () => {
  return {
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
    usePathname: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue({
      get: () => 'users',
    }),
  };
});

const renderWithQuery = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <GithubTables />
    </QueryClientProvider>,
  );
};

describe('<GithubTables /> Tests:', () => {
  const queryClient = new QueryClient();

  it('should contain the types-filter field', () => {
    renderWithQuery(queryClient);

    screen.getByLabelText('Select a type');
  });

  it('should integrate with the table', () => {
    renderWithQuery(queryClient);

    screen.getByRole('table');
  });
});
