'use client';

import React, { useEffect, useMemo, useState } from 'react';

import UsersTable from '@components/users-table';
import ReposTable from '@components/repos-table';

import { useQueryParams } from '@hooks/useQueryParams';

type Filter = 'users' | 'repositories';

type RenderedTable = {
  [key: string]: React.ReactElement;
};

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
      users: (
        <UsersTable
          globalFilter={globalFilter}
          filter={filter}
          setGlobalFilter={setGlobalFilter}
          setFilter={setFilter}
        />
      ),
      repositories: (
        <ReposTable
          globalFilter={globalFilter}
          filter={filter}
          setGlobalFilter={setGlobalFilter}
          setFilter={setFilter}
        />
      ),
    };
  }, [filter, globalFilter]);

  useEffect(() => {
    setFilter((queryParams[TYPE_FILTER_KEY] as Filter) ?? DEFAULT_VALUE);
    setGlobalFilter(queryParams[QUERY_FILTER_KEY] ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{renderedTable[filter]}</>;
}

export default GithubTables;
