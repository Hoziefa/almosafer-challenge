import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { renderWithQuery } from '@test-utils/global-renders';

import RepoLanguages, { type RepoLanguagesProps } from './RepoLanguages';

import type { Mock } from 'jest-mock';

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQuery: jest.fn(),
}));

describe('<RepoLanguages /> Tests:', () => {
  const queryClient = new QueryClient();
  const props: RepoLanguagesProps = { url: '' };

  it('should display the skeleton chip to indicate loading state', () => {
    (useQuery as Mock).mockReturnValue({ data: [], isFetching: true });

    renderWithQuery(<RepoLanguages {...props} />, queryClient);

    screen.getByTestId('chip-skeleton');
  });

  it('should display a show-languages button when the show-languages state is false', () => {
    (useQuery as Mock).mockReturnValue({ data: [] });

    renderWithQuery(<RepoLanguages {...props} />, queryClient);

    screen.getByRole('button', { name: 'Show languages' });
  });

  it('should contain a list of the languages displayed as badges/tags when the show-languages state is true', () => {
    (useQuery as Mock).mockReturnValue({
      data: { javascript: 1, typescript: 2 },
    });

    renderWithQuery(<RepoLanguages {...props} />, queryClient);

    fireEvent.click(screen.getByRole('button', { name: 'Show languages' }));

    screen.getByText('javascript');
    screen.getByText('typescript');
  });
});
