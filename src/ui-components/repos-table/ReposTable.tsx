"use client";

import React, { UIEvent, useMemo, useRef } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

import { Box, Chip, Typography } from "@mui/material";
import EmptyData from "@components/empty-data";
import AvatarTooltip from "@components/avatar-tooltip";
import Forks from "@components/forks";

import { useReposQuery } from "@hooks/useReposQuery";
import { observer } from "mobx-react-lite";
import { useDataTableInfiniteScroll } from "@hooks/useDataTableInfinitePagination";
import type { Repository } from "@app-types";

function ReposTable() {
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
  } = useReposQuery();

  const { onInfinitePagination } = useDataTableInfiniteScroll({ containerRef: tableContainerRef, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, globalFilter });

  const columns: Array<MRT_ColumnDef<Repository>> = useMemo(() => {
    return [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Typography variant="body1">{ row.original.id }</Typography>
          );
        },
      },
      {
        header: "Name",
        accessorKey: "full_name",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Typography variant="h6">{ row.original.full_name }</Typography>
          );
        },
      },
      {
        header: "Forks",
        accessorKey: "forksList",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <AvatarTooltip>
              <Forks url={ row.original.forks_url } />
            </AvatarTooltip>
          );
        },
      },
      {
        header: "Topics",
        accessorKey: "topics",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Box display="flex" flexWrap="wrap" gap="0.3rem">
              { row.original.topics.slice(0, 5).map(((topic) => (
                <Chip label={ topic } color="info" key={ topic } size="medium" sx={ { fontSize: "0.9rem" } } />
              ))) }
            </Box>
          );
        },
      },
    ];
  }, []);

  const containerProps = useMemo(() => {
    return {
      ref: tableContainerRef,
      sx: { maxHeight: "800px" },
      onScroll: (event: UIEvent<HTMLDivElement>) => onInfinitePagination(event.target as HTMLDivElement),
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
    <MaterialReactTable
      columns={ columns }
      data={ data }
      rowCount={ rowCount }
      state={ tableState }
      onGlobalFilterChange={ setGlobalFilter }
      muiTableContainerProps={ containerProps }
      positionGlobalFilter="left"
      enableGlobalFilter
      manualFiltering
      manualSorting
      enableFilterMatchHighlighting={ false }
      enablePagination={ false }
      enableFullScreenToggle={ false }
      enableDensityToggle={ false }
      enableHiding={ false }
      enableFilters={ false }
      enableColumnActions={ false }
      enableBottomToolbar={ false }
      enableSorting={ false }
      muiSearchTextFieldProps={ { color: "info", variant: "outlined", fullWidth: true, size: "small", margin: "dense", sx: { width: "50dvh" } } }
      renderEmptyRowsFallback={ () => <EmptyData message="No data found!" /> }
    />
  );
}

export default observer(ReposTable);
