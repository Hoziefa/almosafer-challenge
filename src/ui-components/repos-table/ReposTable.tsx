"use client";

import React, { UIEvent, useCallback, useEffect, useMemo, useRef } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

import { Avatar, Link, Typography } from "@mui/material";
import { Launch } from "@mui/icons-material";

import ErrorHandler from "@components/error-handler";
import EmptyData from "@components/empty-data";

import { useReposQuery } from "@hooks/useReposQuery";
import type { Repository } from "@app-types";

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
    isError,
  } = useReposQuery();

  const tableContainerRef = useRef<HTMLDivElement>(null);

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
        header: "Avatar",
        accessorKey: "owner.avatar_url",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Avatar src={ row.original.owner?.avatar_url } sx={ { width: "60px", height: "60px" } } />
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
        header: "Name",
        accessorKey: "topics",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Typography variant="h6">{ row.original.full_name }</Typography>
          );
        },
      },
      {
        header: "",
        accessorKey: "url",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        enableSorting: false,
        Cell: ({ row }) => {
          return (
            <Link href={ row.original.html_url }>
              <Launch color="info" />
            </Link>
          );
        },
      },
    ];
  }, []);

  const onInfinitePagination = useCallback((containerRefElement?: HTMLDivElement | null) => {
    if (!containerRefElement) return;

    const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

    if (
      scrollTop >= (scrollHeight - clientHeight) &&
      !isFetching &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  }, [isFetching, isFetchingNextPage, hasNextPage, fetchNextPage]);

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

  // Scroll to the top when entering a query
  useEffect(() => {
    tableContainerRef.current?.scrollTo({ top: 0 });
  }, [globalFilter]);

  return (
    <>
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

      <ErrorHandler
        isOpen={ isError }
        message="An error occurred please try again later."
      />
    </>
  );
}

export default ReposTable;
