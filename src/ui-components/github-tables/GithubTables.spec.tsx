import React from 'react';
import { screen } from '@testing-library/react';
import { QueryClient } from '@tanstack/react-query';

import { renderWithQuery } from '@test-utils/global-renders';
import {
  createMockRouter,
  MockRouterWrapper,
} from '@test-utils/create-router-mock';

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

describe('<GithubTables /> Tests:', () => {
  const queryClient = new QueryClient();
  const router = createMockRouter();

  it('should contain the types-filter field', () => {
    renderWithQuery(<GithubTables />, queryClient, {
      wrapper: (props) => <MockRouterWrapper {...props} router={router} />,
    });

    screen.getByLabelText('Select a type');
  });

  it('should integrate with the table', () => {
    renderWithQuery(<GithubTables />, queryClient, {
      wrapper: (props) => <MockRouterWrapper {...props} router={router} />,
    });

    screen.getByRole('table');
  });
});
