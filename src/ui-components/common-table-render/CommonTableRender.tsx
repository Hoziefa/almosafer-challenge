import React from 'react';
import {
  MaterialReactTable,
  MaterialReactTableProps,
  MRT_ColumnDef,
} from 'material-react-table';

import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import EmptyHandler from '@components/empty-handler';

import { useFilters } from '@contexts/FiltersContext';

import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';

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

const FILTERS = [
  { label: 'Users', value: 'users' },
  { label: 'Repositories', value: 'repositories' },
];

function TableFilters() {
  const { searchQuery, filter, setSearchQuery, setFilter } = useFilters();

  return (
    <Stack
      px={1}
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
        placeholder={`Search ${filter}`}
        sx={{ minWidth: '60%' }}
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
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
              onClick={() => setSearchQuery('')}
            >
              <ClearIcon titleAccess='Clear Search' />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        id='select-type'
        placeholder='Select a type'
        select
        size='small'
        sx={{ minWidth: '30%' }}
        value={filter}
        onChange={({ target }) => {
          setSearchQuery('');

          setFilter(target.value as any);
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
      renderTopToolbarCustomActions={() => <TableFilters />}
      renderEmptyRowsFallback={() => <EmptyHandler message='Oops! Not Found' />}
    />
  );
}

export default CommonTableRender;
