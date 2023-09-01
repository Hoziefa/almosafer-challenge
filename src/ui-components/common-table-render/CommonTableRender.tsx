import React, { Dispatch, SetStateAction } from 'react';
import { MaterialReactTable, MRT_ColumnDef } from 'material-react-table';

import EmptyHandler from '@components/empty-handler';

import type { Repository, User } from '@app-types';

type CommonTableRenderProps = {
  columns: MRT_ColumnDef<User | Repository>[];
  data: (User | Repository)[];
  rowCount: number;
  state: object;
  onGlobalFilterChange: Dispatch<SetStateAction<string>>;
  muiTableContainerProps: object;
};

function CommonTableRender(props: CommonTableRenderProps) {
  return (
    <MaterialReactTable
      {...props}
      positionGlobalFilter='left'
      enableGlobalFilter
      manualFiltering
      manualSorting
      enableFilterMatchHighlighting={false}
      enablePagination={false}
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      enableHiding={false}
      enableFilters={false}
      enableColumnActions={false}
      enableBottomToolbar={false}
      enableSorting={false}
      muiSearchTextFieldProps={{
        color: 'info',
        variant: 'outlined',
        fullWidth: true,
        size: 'small',
        margin: 'dense',
        sx: { maxWidth: '460px' },
      }}
      renderEmptyRowsFallback={() => <EmptyHandler message='Oops! Not Found' />}
    />
  );
}

export default CommonTableRender;
