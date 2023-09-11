'use client';

import React, { useMemo } from 'react';

import UsersTable from '@components/users-table';
import ReposTable from '@components/repos-table';
import TableFilters from '@components/table-filters';

import { useFilters } from '@contexts/FiltersContext';

type RenderedTable = {
  [key: string]: React.ReactElement;
};

function GithubTables() {
  const { typeFilter } = useFilters();

  const renderedTable = useMemo<RenderedTable>(() => {
    return {
      users: <UsersTable />,
      repositories: <ReposTable />,
    };
  }, []);

  return (
    <>
      <TableFilters />

      {renderedTable[typeFilter]}
    </>
  );
}

export default GithubTables;
