import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { renderWithStore } from '@test-utils/global-renders';

import TableFilters from './TableFilters';

describe('<TableFilters /> Tests:', () => {
  it('should contain the type-filter field', () => {
    render(<TableFilters />);

    screen.getByTestId('type-filter');
  });

  it('should contain the query-filter field', () => {
    render(<TableFilters />);

    screen.getByPlaceholderText('Search users');
  });

  it('should contain the type-filter field', () => {
    render(<TableFilters />);

    fireEvent.change(screen.getByTestId('type-filter'), {
      option: { value: 'users' },
    });

    screen.getByDisplayValue('users');
  });

  it('should change the query filter text-field value when ever we input a new value', () => {
    renderWithStore(<TableFilters />, {
      filtersStore: {
        typeFilter: 'users',
        queryFilter: '',
        setQueryFilter: jest.fn(),
        setTypeFilter: jest.fn(),
      },
    });

    fireEvent.change(screen.getByPlaceholderText('Search users'), {
      target: { value: 'filter by query' },
    });

    screen.getByDisplayValue('filter by query');
  });
});
