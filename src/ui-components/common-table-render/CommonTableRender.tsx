import React, { Dispatch, SetStateAction } from 'react';
import {
  MaterialReactTable,
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';

import EmptyHandler from '@components/empty-handler';
import { useMediaQuery } from '@mui/material';

export type CommonTableRenderProps<T extends Record<string, any> = {}> = Omit<
  MaterialReactTableProps<T>,
  'data'
> & {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  rowCount: number;
  state: object;
  onGlobalFilterChange: Dispatch<SetStateAction<string>>;
  muiTableContainerProps: object;
};

function CommonTableRender<T extends Record<string, any> = {}>(
  props: CommonTableRenderProps<T>,
) {
  const isSmScreen = useMediaQuery('(min-width:600px)');

  return (
    <MaterialReactTable<T>
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
        sx: { width: isSmScreen ? '510px' : 'auto' },
      }}
      renderEmptyRowsFallback={() => <EmptyHandler message='Oops! Not Found' />}
    />
  );
}

export default CommonTableRender;
