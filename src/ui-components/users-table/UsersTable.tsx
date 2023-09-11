import React, { UIEvent, useMemo, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import { Avatar, Link, Typography } from '@mui/material';
import CommonTableRender from '@components/common-table-render';

import { Launch } from '@mui/icons-material';

import { useUsersQuery } from '@hooks/useUsersQuery';
import { useDataTableInfiniteScroll } from '@hooks/useTableInfinitePagination';

import type { MRT_ColumnDef } from 'material-react-table';
import type { User } from '@app-types';

function UsersTable() {
  const {
    data,
    rowCount,
    isLoading,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    searchQuery,
  } = useUsersQuery();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { onInfinitePagination } = useDataTableInfiniteScroll({
    containerRef: tableContainerRef,
    searchQuery,
    fetchNextPage,
    shouldFetchNextPage: () =>
      !isFetching && !isFetchingNextPage && hasNextPage!,
  });

  const columns: MRT_ColumnDef<User>[] = useMemo(() => {
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
          return (
            <Typography
              title={row.original.name}
              variant='body1'
              maxWidth={200}
              noWrap
            >
              {row.original.name}
            </Typography>
          );
        },
      },
      {
        header: '',
        accessorKey: 'profileUrl',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          return (
            <Link href={row.original.profileUrl} target='_blank'>
              <Launch color='info' />
            </Link>
          );
        },
      },
    ];
  }, []);

  const tableState = useMemo(() => {
    return {
      isLoading,
      showProgressBars: isFetching,
    };
  }, [isFetching, isLoading]);

  const containerProps = useMemo(() => {
    return {
      ref: tableContainerRef,
      sx: { maxHeight: '790px' },
      onScroll: (event: UIEvent<HTMLDivElement>) =>
        onInfinitePagination(event.target as HTMLDivElement),
    };
  }, [onInfinitePagination]);

  return (
    <CommonTableRender
      columns={columns}
      data={data}
      rowCount={rowCount}
      state={tableState}
      muiTableContainerProps={containerProps}
    />
  );
}

export default observer(UsersTable);
