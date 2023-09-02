'use client';

import React, { useMemo, useState } from 'react';
import UsersTable from '@components/users-table';
import ReposTable from '@components/repos-table';
import { Box, MenuItem, TextField } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useAppendQueryParams } from '@hooks/useAppendQueryParams';

type Filter = 'users' | 'repositories';

type RenderedTable = { [key: string]: React.ReactElement };

const FILTERS = [
  { label: 'Users', value: 'users' },
  { label: 'Repositories', value: 'repositories' },
];

const FILTER_KEY = 'type';

function GithubTables() {
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState<Filter>(
    (searchParams.get(FILTER_KEY) as Filter) ?? 'users',
  );

  useAppendQueryParams(FILTER_KEY, filter);

  const renderedTable = useMemo<RenderedTable>(() => {
    return {
      users: <UsersTable />,
      repositories: <ReposTable />,
    };
  }, []);

  return (
    <>
      <Box mb={2} maxWidth='460px'>
        <TextField
          label='Select a type'
          select
          fullWidth
          size='small'
          value={filter}
          onChange={(event) => setFilter(event.target.value as Filter)}
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
