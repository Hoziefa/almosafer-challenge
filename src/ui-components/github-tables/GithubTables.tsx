'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { InputAdornment, MenuItem, Stack, TextField } from '@mui/material';

import UsersTable from '@components/users-table';
import ReposTable from '@components/repos-table';

import { useQueryParams } from '@hooks/useQueryParams';

import { Clear as ClearIcon, Search as SearchIcon } from '@mui/icons-material';

type Filter = 'users' | 'repositories';

type RenderedTable = { [key: string]: React.ReactElement };

const FILTERS = [
  { label: 'Users', value: 'users' },
  { label: 'Repositories', value: 'repositories' },
];

const TYPE_FILTER_KEY = 'type';
const DEFAULT_VALUE = 'users';
const QUERY_FILTER_KEY = 'query';

function GithubTables() {
  const [filter, setFilter] = useState<Filter>('users');
  const [globalFilter, setGlobalFilter] = useState('');

  const { queryParams } = useQueryParams({
    [TYPE_FILTER_KEY]: filter,
    [QUERY_FILTER_KEY]: globalFilter,
  });

  const renderedTable = useMemo<RenderedTable>(() => {
    return {
      users: <UsersTable globalFilter={globalFilter} />,
      repositories: <ReposTable globalFilter={globalFilter} />,
    };
  }, [globalFilter]);

  useEffect(() => {
    setFilter((queryParams[TYPE_FILTER_KEY] as Filter) ?? DEFAULT_VALUE);
    setGlobalFilter(queryParams[QUERY_FILTER_KEY] ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Stack mb={2} flexDirection='row' gap={3} justifyContent='space-between'>
        <TextField
          id='search-query'
          size='small'
          variant='outlined'
          placeholder={`Search ${filter}`}
          sx={{ minWidth: '60%' }}
          value={globalFilter}
          onChange={({ target }) => setGlobalFilter(target.value)}
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
                onClick={() => setGlobalFilter('')}
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
          value={filter}
          onChange={({ target }) => {
            setGlobalFilter('');

            setFilter(target.value as Filter);
          }}
        >
          {FILTERS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {renderedTable[filter]}
    </>
  );
}

export default GithubTables;
