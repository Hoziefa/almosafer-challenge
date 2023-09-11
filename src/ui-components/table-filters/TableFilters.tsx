import React from 'react';
import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';

import { useFilters } from '@contexts/FiltersContext';

import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';

const FILTERS = [
  { label: 'Users', value: 'users' },
  { label: 'Repositories', value: 'repositories' },
];

function TableFilters() {
  const { queryFilter, typeFilter, setQueryFilter, setTypeFilter } =
    useFilters();

  return (
    <Stack
      data-testid='table-filters'
      px={1}
      py={2}
      flexDirection='row'
      justifyContent='space-between'
      gap={3}
      width='100%'
    >
      <TextField
        id='query-filter'
        size='small'
        variant='outlined'
        placeholder={`Search ${typeFilter}`}
        sx={{ minWidth: '60%' }}
        value={queryFilter}
        onChange={({ target }) => setQueryFilter(target.value)}
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
              onClick={() => setQueryFilter('')}
            >
              <ClearIcon titleAccess='Clear Search' />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        data-testid='type-filter'
        id='type-filter'
        placeholder='Select a type'
        select
        size='small'
        sx={{ minWidth: '30%' }}
        value={typeFilter}
        onChange={({ target }) => {
          setQueryFilter('');

          setTypeFilter(target.value as any);
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

export default TableFilters;
