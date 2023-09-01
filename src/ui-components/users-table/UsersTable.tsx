"use client";

import React, { UIEvent, useCallback, useMemo, useRef } from "react";
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useUsersQuery } from "@hooks/useUsersQuery";
import { Avatar } from "@mui/material";
import { Launch } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

import type { User } from "@app-types";

function UsersTable() {
  const {
    data,
    rowCount,
    isLoading,
    isFetching,
    setSorting,
    sorting,
    fetchNextPage,
    setGlobalFilter,
    globalFilter,
    isFetchingNextPage,
    hasNextPage,
  } = useUsersQuery();

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const columns: Array<MRT_ColumnDef<User>> = useMemo(() => {
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
        accessorKey: "avatar_url",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Avatar src={ row.original.avatar_url } sx={ { width: "60px", height: "60px" } } />
          );
        },
      },
      {
        header: "Name",
        accessorKey: "login",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <Typography variant="body1">{ row.original.login }</Typography>
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
            <a href={ row.original.html_url }>
              <Launch color="info" />
            </a>
          );
        },
      },
    ];
  }, []);

  const onInfinitePagination = useCallback((containerRefElement?: HTMLDivElement | null) => {
    if (!containerRefElement) return;

    const { scrollHeight, scrollTop, clientHeight } = containerRefElement;

    if (
      scrollHeight - scrollTop - clientHeight < 300 &&
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
      sorting,
      showProgressBars: isFetching,
      showGlobalFilter: true,
    };
  }, [globalFilter, isFetching, isLoading, sorting]);

  return (
    <MaterialReactTable
      columns={ columns }
      data={ data }
      rowCount={ rowCount }
      onSortingChange={ setSorting }
      onGlobalFilterChange={ setGlobalFilter }
      enableGlobalFilter
      positionGlobalFilter="left"
      enableFilterMatchHighlighting={ false }
      enablePagination={ false }
      enableFullScreenToggle={ false }
      enableDensityToggle={ false }
      enableHiding={ false }
      enableFilters={ false }
      enableColumnActions={ false }
      enableBottomToolbar={ false }
      muiSearchTextFieldProps={ { color: "info", variant: "outlined", fullWidth: true, size: "small", margin: "dense", sx: { width: "50dvh" } } }
      manualFiltering
      manualSorting
      muiTableContainerProps={ containerProps }
      state={ tableState }
    />
  );
}

export default UsersTable;
