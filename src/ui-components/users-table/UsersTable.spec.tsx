import React from 'react';
import { screen } from '@testing-library/react';
import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { renderWithQuery } from '@test-utils/global-renders';

import UsersTable from './UsersTable';

import type { Mock } from 'jest-mock';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}));

jest.mock('next/navigation', () => {
  return {
    ...jest.requireActual('next/navigation'),
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
    usePathname: jest.fn(),
    useSearchParams: jest.fn().mockReturnValue({
      get: () => '',
    }),
  };
});

describe('<UsersTable /> Tests:', () => {
  const queryClient = new QueryClient();

  beforeAll(() => {
    (useInfiniteQuery as Mock).mockReturnValue({
      data: {
        pages: [
          {
            items: {
              id: 1,
              avatar_url: 'test-avatar #1',
              html_url: 'test-url #1',
              login: 'Almosafer',
            },
          },
        ],
      },
    });
  });

  it('should contain the #ID column (label & value)', () => {
    renderWithQuery(<UsersTable />, queryClient);

    screen.getByText('#');
    screen.getByText('1');
  });

  it('should contain the Avatar column (label & value)', () => {
    renderWithQuery(<UsersTable />, queryClient);

    screen.getByText('Avatar');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-avatar #1');
  });

  it('should contain the Name column (label & value)', () => {
    renderWithQuery(<UsersTable />, queryClient);

    screen.getByText('Name');
    screen.getByText('Almosafer');
  });

  it('should contain the launch-icons wrapped by the link to the user profile', () => {
    renderWithQuery(<UsersTable />, queryClient);

    expect(screen.getByRole('link')).toHaveAttribute('href', 'test-url #1');
    screen.getByTestId('LaunchIcon');
  });

  it('should contain all the columns', () => {
    renderWithQuery(<UsersTable />, queryClient);

    expect(screen.getAllByRole('cell')).toHaveLength(4);
  });
});
