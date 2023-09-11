'use client';

import React, { useMemo } from 'react';

import UsersTable from '@components/users-table';
import ReposTable from '@components/repos-table';

import { useFilters } from '@contexts/FiltersContext';

type RenderedTable = {
  [key: string]: React.ReactElement;
};

function GithubTables() {
  const { filter } = useFilters();

  const renderedTable = useMemo<RenderedTable>(() => {
    return {
      users: <UsersTable />,
      repositories: <ReposTable />,
    };
  }, []);

  return <>{renderedTable[filter]}</>;
}

export default GithubTables;
