import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';

import { renderWithFilters } from '@test-utils/global-renders';

import CommonTableRender, {
  type CommonTableRenderProps,
} from './CommonTableRender';
import type { User } from '@app-types';
import type { Mock } from 'jest-mock';

describe('<CommonTableRender /> Tests:', () => {
  const props: CommonTableRenderProps<Partial<User>> = {
    columns: [
      {
        header: '#',
        accessorKey: 'id',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
      },
      {
        header: 'Name',
        accessorKey: 'name',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
      },
    ],
    data: [
      {
        id: 1,
        name: 'test #1',
      },
      {
        id: 2,
        name: 'test #2',
      },
    ],
    rowCount: 2,
    muiTableContainerProps: {},
    state: {},
    onGlobalFilterChange: () => {},
  };

  beforeAll(() => {
    (useSearchParams as Mock).mockReturnValue({
      get: jest.fn(),
      entries: () => [],
    });
    (useRouter as Mock).mockReturnValue({ push: jest.fn() });
  });

  it('should display the empty-handler when no data is provided or found', () => {
    render(<CommonTableRender {...props} data={[]} />);

    screen.getByText('Oops! Not Found');
  });

  it('should contain the #ID column (label & value)', () => {
    render(<CommonTableRender {...props} />);

    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should contain the Name column (label & value)', () => {
    render(<CommonTableRender {...props} />);

    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('test #1')).toBeInTheDocument();
  });

  it('should contain all the columns', () => {
    render(<CommonTableRender {...props} />);

    expect(screen.getAllByRole('cell')).toHaveLength(4);
  });

  it('should contain the query-filter & the type-filter fields', () => {
    render(<CommonTableRender {...props} />);

    screen.getByPlaceholderText('Search users');
    screen.getByDisplayValue('users');
  });

  it('should change the query filter text-field value when ever we input a new value', () => {
    renderWithFilters(<CommonTableRender {...props} />);

    fireEvent.change(screen.getByPlaceholderText('Search users'), {
      target: { value: 'repos' },
    });

    screen.getByDisplayValue('repos');
  });
});
