'use client';

import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

import UsersTable from '@components/users-table';
import ReposTable from '@components/repos-table';

import { useQueryParams } from '@hooks/useQueryParams';

type Filter = 'users' | 'repositories';

type RenderedTable = { [key: string]: React.ReactElement };

const FILTERS = [
  { label: 'Users', value: 'users' },
  { label: 'Repositories', value: 'repositories' },
];

const FILTER_KEY = 'type';
const DEFAULT_VALUE = 'users';

function GithubTables() {
  const [filter, setFilter] = useState<Filter>('users');

  const { clearQueries } = useQueryParams(
    FILTER_KEY,
    filter,
    setFilter,
    DEFAULT_VALUE,
  );

  const renderedTable = useMemo<RenderedTable>(() => {
    return {
      users: <UsersTable />,
      repositories: <ReposTable />,
    };
  }, []);

  const onFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      clearQueries();

      setFilter(target.value as Filter);
    },
    [clearQueries],
  );

  return (
    <>
      <Box mb={2} maxWidth='460px'>
        <TextField
          label='Select a type'
          select
          fullWidth
          size='small'
          value={filter}
          onChange={onFilterChange}
        >
          {FILTERS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {renderedTable[filter]}
    </>
  );
}

export default GithubTables;
