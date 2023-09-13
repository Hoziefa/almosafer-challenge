'use client';

import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@stores/store';
import { useQueryParams } from '@hooks/useQueryParams';

import UsersTable from '@components/users-table';
import ReposTable from '@components/repos-table';

import { type TypeFilter } from '@stores/FiltersStore';

type RenderedTable = {
  [key: string]: React.ReactElement;
};

const TYPE_FILTER_KEY = 'type';
const QUERY_FILTER_KEY = 'query';

function GithubTables() {
  const { filtersStore } = useStore();

  const { queryParams } = useQueryParams({
    [TYPE_FILTER_KEY]: filtersStore.typeFilter,
    [QUERY_FILTER_KEY]: filtersStore.queryFilter,
  });

  const renderedTable = useMemo<RenderedTable>(() => {
    return {
      users: <UsersTable />,
      repositories: <ReposTable />,
    };
  }, []);

  useEffect(() => {
    filtersStore.setTypeFilter(queryParams[TYPE_FILTER_KEY] as TypeFilter);
    filtersStore.setQueryFilter(queryParams[QUERY_FILTER_KEY]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{renderedTable[filtersStore.typeFilter]}</>;
}

export default observer(GithubTables);
