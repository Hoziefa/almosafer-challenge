'use client';

import React, { UIEvent, useMemo, useRef } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { useUsersQuery } from '@hooks/useUsersQuery';

import { Avatar, Link, Typography } from '@mui/material';
import { Launch } from '@mui/icons-material';
import EmptyHandler from '@components/empty-handler';

import { observer } from 'mobx-react-lite';
import { useDataTableInfiniteScroll } from '@hooks/useDataTableInfinitePagination';

import type { User } from '@app-types';

function UsersTable() {
  const tableContainerRef = useRef<HTMLDivElement>(null);

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
  } = useUsersQuery();

  const { onInfinitePagination } = useDataTableInfiniteScroll({
    containerRef: tableContainerRef,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    globalFilter,
  });

  const columns: Array<MRT_ColumnDef<User>> = useMemo(() => {
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
        accessorKey: 'avatar_url',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Avatar
              src={row.original.avatar_url}
              sx={{ width: '60px', height: '60px' }}
            />
          );
        },
      },
      {
        header: 'Name',
        accessorKey: 'login',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return <Typography variant='body1'>{row.original.login}</Typography>;
        },
      },
      {
        header: '',
        accessorKey: 'url',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          return (
            <Link href={row.original.html_url}>
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
      globalFilter,
      showProgressBars: isFetching,
      showGlobalFilter: true,
    };
  }, [globalFilter, isFetching, isLoading]);

  const containerProps = useMemo(() => {
    return {
      ref: tableContainerRef,
      sx: { maxHeight: '800px' },
      onScroll: (event: UIEvent<HTMLDivElement>) =>
        onInfinitePagination(event.target as HTMLDivElement),
    };
  }, [onInfinitePagination]);

  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      rowCount={rowCount}
      state={tableState}
      onGlobalFilterChange={setGlobalFilter}
      muiTableContainerProps={containerProps}
      positionGlobalFilter='left'
      enableGlobalFilter
      manualFiltering
      manualSorting
      enableFilterMatchHighlighting={false}
      enablePagination={false}
      enableFullScreenToggle={false}
      enableDensityToggle={false}
      enableHiding={false}
      enableFilters={false}
      enableColumnActions={false}
      enableBottomToolbar={false}
      enableSorting={false}
      muiSearchTextFieldProps={{
        color: 'info',
        variant: 'outlined',
        fullWidth: true,
        size: 'small',
        margin: 'dense',
        sx: { minWidth: '460px' },
      }}
      renderEmptyRowsFallback={() => <EmptyHandler message='Oops! Not Found' />}
    />
  );
}

export default observer(UsersTable);
