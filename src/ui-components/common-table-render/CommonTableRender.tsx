import React from 'react';
import {
  MaterialReactTable,
  type MaterialReactTableProps,
  type MRT_ColumnDef,
} from 'material-react-table';
import EmptyHandler from '@components/empty-handler';

export type CommonTableRenderProps<T extends Record<string, any> = {}> = Omit<
  MaterialReactTableProps<T>,
  'data'
> & {
  data: T[];
  columns: MRT_ColumnDef<T>[];
  rowCount: number;
  state: object;
  muiTableContainerProps: object;
};

function CommonTableRender<T extends Record<string, any> = {}>(
  props: CommonTableRenderProps<T>,
) {
  return (
    <MaterialReactTable<T>
      {...props}
      positionGlobalFilter='left'
      manualFiltering
      manualSorting
      enableGlobalFilter={false}
      enableTopToolbar
      enableFilterMatchHighlighting={false}
      enablePagination={false}
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      enableHiding={false}
      enableFilters={false}
      enableColumnActions={false}
      enableBottomToolbar={false}
      enableSorting={false}
      renderEmptyRowsFallback={() => <EmptyHandler message='Oops! Not Found' />}
    />
  );
}

export default CommonTableRender;
