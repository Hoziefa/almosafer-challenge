"use client";

import React, { useMemo } from "react";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
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
    pagination,
    setPagination,
    setSorting,
    sorting,
  } = useUsersQuery();

  const columns: Array<MRT_ColumnDef<User>> = useMemo(() => {
    return [
      {
        header: "#",
        accessorKey: "id",
        enableColumnFilterModes: false,
        enableColumnFilter: false,
        Cell: ({ row }) => {
          return (
            <span color="primary">{ row.original.id }</span>
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
            <Typography variant="body1" color="#13def8">{ row.original.login }</Typography>
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
              <Launch />
            </a>
          );
        },
      },
    ];
  }, []);

  return (
    <MaterialReactTable
      columns={ columns }
      data={ data }
      onPaginationChange={ setPagination }
      rowCount={ rowCount }
      onSortingChange={ setSorting }
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
      muiSearchTextFieldProps={ { variant: "outlined", fullWidth: true, size: "small", margin: "dense", sx: { width: "50dvh" } } }
      state={ {
        isLoading,
        pagination,
        sorting,
        showProgressBars: isFetching,
        showGlobalFilter: true,
      } }
    />
  );
}

export default UsersTable;
