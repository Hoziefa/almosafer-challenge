import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import RepoForks, { type RepoForksProps } from './RepoForks';

import type { Mock } from 'jest-mock';
import type { Owner } from '@app-types';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

const renderWithQuery = (queryClient: QueryClient, props: RepoForksProps) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <RepoForks {...props} />
    </QueryClientProvider>,
  );
};

describe('<RepoForks /> Tests:', () => {
  const queryClient = new QueryClient();
  const props: RepoForksProps = {
    url: '',
  };

  it('should display the skeleton avatar to indicate loading state', () => {
    (useQuery as Mock).mockReturnValue({ data: [], isLoading: true });

    renderWithQuery(queryClient, props);

    screen.getAllByTestId('PersonIcon');
  });

  it('should display (no forks found) message when the response is empty', () => {
    (useQuery as Mock).mockReturnValue({ data: [] });

    renderWithQuery(queryClient, props);

    screen.getByText('No forks found!');
  });

  it('should contain a list of the forks displayed as links with each as an avatar', () => {
    (useQuery as Mock).mockReturnValue({
      data: [
        {
          id: 1,
          full_name: 'Almosafer',
          owner: {
            avatar_url: '',
            id: 2,
            html_url: 'test-url #1',
            login: '',
          } as Owner,
        },
      ],
    });

    renderWithQuery(queryClient, props);

    expect(screen.getByRole('link')).toHaveAttribute('href', 'test-url #1');
    screen.getByTitle('Almosafer');
  });
});
