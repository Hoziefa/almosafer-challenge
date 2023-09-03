import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import CommonTableRender, {
  type CommonTableRenderProps,
} from './CommonTableRender';
import type { User } from '@app-types';

describe('<CommonTableRender /> Tests:', () => {
  const props = {
    columns: [
      {
        header: '#',
        accessorKey: 'id',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
      },
      {
        header: 'Name',
        accessorKey: 'login',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
      },
    ],
    data: [
      {
        id: 1,
        login: 'test #1',
      } as User,
      {
        id: 2,
        login: 'test #2',
      } as User,
    ],
    muiTableContainerProps: [],
    rowCount: 2,
    state: {
      globalFilter: '',
      showGlobalFilter: true,
    },
    onGlobalFilterChange: () => {},
  } as CommonTableRenderProps;

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

  it('should contain the query filter text-field', () => {
    render(<CommonTableRender {...props} />);

    screen.getByRole('textbox');
  });

  it('should change the query filter text-field value when ever we input a new value', () => {
    render(<CommonTableRender {...props} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'users' },
    });

    screen.getByDisplayValue('users');
  });
});
