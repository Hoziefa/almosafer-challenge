import React, { useEffect, useRef, useState } from 'react';
import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';

import { observer } from 'mobx-react-lite';

import { useStore } from '@stores/store';

import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';

const FILTERS = [
  { label: 'Users', value: 'users' },
  { label: 'Repositories', value: 'repositories' },
];

function TableFilters() {
  const { filtersStore } = useStore();

  const timeoutRef = useRef(0);

  const [queryFilter, setQueryFilter] = useState(filtersStore.queryFilter);

  useEffect(() => {
    setQueryFilter(filtersStore.queryFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(() => {
      filtersStore.setQueryFilter(queryFilter);
    }, 500);

    return () => {
      window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFilter]);

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
        placeholder={`Search ${filtersStore.typeFilter}`}
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
              onClick={() => filtersStore.setQueryFilter('')}
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
        value={filtersStore.typeFilter}
        onChange={({ target }) => {
          filtersStore.setQueryFilter('');

          filtersStore.setTypeFilter(target.value as any);
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

export default observer(TableFilters);
