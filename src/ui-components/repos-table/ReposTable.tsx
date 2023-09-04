'use client';

import React, { UIEvent, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { Avatar, Typography } from '@mui/material';

import CommonTableRender from '@components/common-table-render';
import AvatarTooltip from '@components/avatar-tooltip';
import RepoForks from '@components/repo-forks';
import RepoLanguages from '@components/repo-languages';

import { useDataTableInfiniteScroll } from '@hooks/useTableInfinitePagination';
import { useReposQuery } from '@hooks/useReposQuery';

import type { MRT_ColumnDef } from 'material-react-table';
import type { Repository } from '@app-types';

function ReposTable() {
  const {
    data,
    rowCount,
    isLoading,
    isFetching,
    fetchNextPage,
    setGlobalFilter,
    globalFilter,
    isFetchingNextPage,
    hasNextPage,
  } = useReposQuery();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { onInfinitePagination } = useDataTableInfiniteScroll({
    containerRef: tableContainerRef,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    globalFilter,
  });

  const columns: MRT_ColumnDef<Repository>[] = useMemo(() => {
    return [
      {
        header: '#',
        accessorKey: 'id',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return <Typography variant='body1'>{row.original.id}</Typography>;
        },
      },
      {
        header: 'Avatar',
        accessorKey: 'avatarUrl',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Avatar
              src={row.original.avatarUrl}
              sx={{ width: '60px', height: '60px' }}
            />
          );
        },
      },
      {
        header: 'Name',
        accessorKey: 'name',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return <Typography variant='body1'>{row.original.name}</Typography>;
        },
      },
      {
        header: 'Forks',
        accessorKey: 'forksUrl',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <AvatarTooltip>
              <RepoForks url={row.original.forksUrl} />
            </AvatarTooltip>
          );
        },
      },
      {
        header: 'Languages',
        accessorKey: 'languagesUrl',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return <RepoLanguages url={row.original.languagesUrl} />;
        },
      },
    ];
  }, []);

  const containerProps = useMemo(() => {
    return {
      ref: tableContainerRef,
      sx: { maxHeight: '800px' },
      onScroll: (event: UIEvent<HTMLDivElement>) =>
        onInfinitePagination(event.target as HTMLDivElement),
    };
  }, [onInfinitePagination]);

  const tableState = useMemo(() => {
    return {
      isLoading,
      globalFilter,
      showProgressBars: isFetching,
      showGlobalFilter: true,
    };
  }, [globalFilter, isFetching, isLoading]);

  return (
    <CommonTableRender
      columns={columns}
      data={data}
      rowCount={rowCount}
      state={tableState}
      onGlobalFilterChange={setGlobalFilter}
      muiTableContainerProps={containerProps}
    />
  );
}

export default observer(ReposTable);
