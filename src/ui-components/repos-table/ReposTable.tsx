'use client';

import React, { UIEvent, useMemo, useRef } from 'react';
import { type MRT_ColumnDef } from 'material-react-table';

import { Avatar, Box, Chip, Typography } from '@mui/material';
import CommonTableRender from '../common-table-render';
import AvatarTooltip from '@components/avatar-tooltip';
import RepoForks from '../repo-forks';

import { useDataTableInfiniteScroll } from '@hooks/useTableInfinitePagination';
import { useReposQuery } from '@hooks/useReposQuery';
import { observer } from 'mobx-react-lite';

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

  const columns: Array<MRT_ColumnDef<Repository>> = useMemo(() => {
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
        accessorKey: 'owner.avatar_url',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Avatar
              src={row.original.owner.avatar_url}
              sx={{ width: '60px', height: '60px' }}
            />
          );
        },
      },
      {
        header: 'Name',
        accessorKey: 'full_name',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Typography variant='body1'>{row.original.full_name}</Typography>
          );
        },
      },
      {
        header: 'Forks',
        accessorKey: 'forks_url',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <AvatarTooltip>
              <RepoForks url={row.original.forks_url} />
            </AvatarTooltip>
          );
        },
      },
      {
        header: 'Topics',
        accessorKey: 'topics',
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Box display='flex' flexWrap='wrap' gap='0.3rem'>
              {row.original.topics.slice(0, 3).map((topic) => (
                <Chip
                  label={topic}
                  color='info'
                  key={topic}
                  size='medium'
                  sx={{ fontSize: '0.9rem' }}
                />
              ))}
            </Box>
          );
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
