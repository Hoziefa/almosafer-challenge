import React from 'react';
import { render, screen } from '@testing-library/react';

import CommonTableRender, {
  type CommonTableRenderProps,
} from './CommonTableRender';

import type { User } from '@app-types';

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

  it('should integrate with the table-filters', () => {
    render(<CommonTableRender {...props} />);

    screen.getByTestId('table-filters');
  });
});
