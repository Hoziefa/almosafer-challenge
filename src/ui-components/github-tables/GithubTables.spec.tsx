import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';

import { renderWithQuery } from '@test-utils/global-renders';

import GithubTables from './GithubTables';

import type { Mock } from 'jest-mock';

describe('<GithubTables /> Tests:', () => {
  const queryClient = new QueryClient();

  beforeAll(() => {
    (useSearchParams as Mock).mockReturnValue({ get: () => 'users' });
    (useRouter as Mock).mockReturnValue({ push: jest.fn() });
  });

  it('should contain the types-filter field', () => {
    renderWithQuery(<GithubTables />, queryClient);

    screen.getByLabelText('Select a type');
  });

  it('should integrate with the table', () => {
    renderWithQuery(<GithubTables />, queryClient);

    screen.getByRole('table');
  });
});
