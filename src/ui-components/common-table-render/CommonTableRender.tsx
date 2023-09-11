import React from 'react';
import {
  MaterialReactTable,
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';

import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import EmptyHandler from '@components/empty-handler';

import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';

type TableFiltersProps = {
  globalFilter: string;
  setGlobalFilter: Function;
  filter: string;
  setFilter: Function;
};

export type CommonTableRenderProps<T extends Record<string, any> = {}> = Omit<
  MaterialReactTableProps<T>,
  'data'
> &
  TableFiltersProps & {
    data: T[];
    columns: MRT_ColumnDef<T>[];
    rowCount: number;
    state: object;
    muiTableContainerProps: object;
  };

const FILTERS = [
  { label: 'Users', value: 'users' },
  { label: 'Repositories', value: 'repositories' },
];

function TableFilters(props: TableFiltersProps) {
  return (
    <Stack
      px={1.5}
      py={2}
      flexDirection='row'
      gap={3}
      justifyContent='space-between'
      width='100%'
    >
      <TextField
        id='search-query'
        size='small'
        variant='outlined'
        placeholder={`Search ${props.filter}`}
        sx={{ minWidth: '60%' }}
        value={props.globalFilter}
        onChange={({ target }) => props.setGlobalFilter(target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position='end'
              sx={{ cursor: 'pointer' }}
              onClick={() => props.setGlobalFilter('')}
            >
              <ClearIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        id='select-type'
        label='Select a type'
        select
        size='small'
        sx={{ minWidth: '30%' }}
        value={props.filter}
        onChange={({ target }) => {
          props.setGlobalFilter('');

          props.setFilter(target.value);
        }}
      >
        {FILTERS.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  );
}

function CommonTableRender<T extends Record<string, any> = {}>(
  props: CommonTableRenderProps<T>,
) {
  return (
    <MaterialReactTable<T>
      {...props}
      positionGlobalFilter='left'
      manualFiltering
      manualSorting
      renderTopToolbarCustomActions={() => <TableFilters {...props} />}
      enableGlobalFilter
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
