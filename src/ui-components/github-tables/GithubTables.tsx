'use client';

import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';

import UsersTable from '@components/users-table';
import ReposTable from '@components/repos-table';

import { usePersistData } from '@hooks/usePersistData';

type Filter = 'users' | 'repositories';

type RenderedTable = { [key: string]: React.ReactElement };

const FILTERS = [
  { label: 'Users', value: 'users' },
  { label: 'Repositories', value: 'repositories' },
];

const FILTER_KEY = 'type';
const DEFAULT_VALUE = 'users';

function GithubTables() {
  const { readData, persistData, clearData } = usePersistData();

  const [filter, setFilter] = useState<Filter>(
    (readData(FILTER_KEY) as Filter) ?? DEFAULT_VALUE,
  );

  const renderedTable = useMemo<RenderedTable>(() => {
    return {
      users: <UsersTable />,
      repositories: <ReposTable />,
    };
  }, []);

  const onFilterChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      clearData();

      setFilter(target.value as Filter);

      persistData(FILTER_KEY, target.value);
    },
    [clearData, persistData],
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
