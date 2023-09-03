import React from 'react';
import { screen } from '@testing-library/react';
import { QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { renderWithQuery } from '@test-utils/global-renders';

import ReposTable from './ReposTable';

import type { Mock } from 'jest-mock';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useInfiniteQuery: jest.fn(),
}));

describe('<ReposTable /> Tests:', () => {
  const queryClient = new QueryClient();

  beforeAll(() => {
    (useInfiniteQuery as Mock).mockReturnValue({
      data: {
        pages: [
          {
            items: {
              id: 1,
              full_name: 'Almosafer',
              topics: ['javascript', 'typescript'],
              owner: {
                avatar_url: 'test-avatar #1',
                id: 2,
                html_url: 'test-url #1',
                login: '',
              },
            },
          },
        ],
      },
    });
  });

  it('should contain the #ID column (label & value)', () => {
    renderWithQuery(<ReposTable />, queryClient);

    screen.getByText('#');
    screen.getByText('1');
  });

  it('should contain the Avatar column (label & value)', () => {
    renderWithQuery(<ReposTable />, queryClient);

    screen.getByText('Avatar');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test-avatar #1');
  });

  it('should contain the Name column (label & value)', () => {
    renderWithQuery(<ReposTable />, queryClient);

    screen.getByText('Name');
    screen.getByText('Almosafer');
  });

  it('should contain the Forks column (label & value)', () => {
    renderWithQuery(<ReposTable />, queryClient);

    screen.getByText('Forks');
    screen.getByTestId('PersonIcon');
  });

  it('should contain the Topics column (label & value)', () => {
    renderWithQuery(<ReposTable />, queryClient);

    screen.getByText('Topics');
    screen.getByText('javascript');
    screen.getByText('typescript');
  });

  it('should contain all the columns', () => {
    renderWithQuery(<ReposTable />, queryClient);

    expect(screen.getAllByRole('cell')).toHaveLength(5);
  });
});
