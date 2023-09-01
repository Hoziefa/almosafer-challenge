"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, MenuItem, TextField, Typography } from "@mui/material";

import { useReposQuery } from "@hooks/useReposQuery";

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

  const [query, setQuery] = useState("");

  const tableContainerRef = useRef<HTMLUListElement>(null);

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

  // Scroll to the top when entering a query
  useEffect(() => {
    tableContainerRef.current?.scrollTo({ top: 0 });
  }, [globalFilter]);

  return (
    <>
      <Box display="flex" justifyContent="space-between" gap="2rem" mb={ 4 }>
        <TextField id="outlined-basic" label="Search for..." variant="outlined" sx={ { flex: "2" } } size="small" value={ query } onChange={ (event) => setQuery(event.target.value) } />

        <TextField
          select
          id="outlined-select-currency"
          label="Select a type"
          defaultValue="users"
          sx={ { flex: "1" } }
          size="small"
        >
          { [{ label: "users", value: "users" }, { label: "repositories", value: "repositories" }].map((option) => (
            <MenuItem key={ option.value } value={ option.value }>
              { option.label }
            </MenuItem>
          )) }
        </TextField>
      </Box>

      <List sx={ { width: "100%", mx: "auto", height: "700px", overflowY: "scroll" } } ref={ tableContainerRef } onScroll={ (event) => onInfinitePagination(event.target as HTMLDivElement) }>
        { data.map(({ full_name, owner }) => (
          <React.Fragment key={ full_name }>
            <ListItem alignItems="center">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src={ owner?.avatar_url } sx={ { width: "60px", height: "60px", mr: "1rem" } } />
              </ListItemAvatar>

              <ListItemText primary={ <Typography variant="h6">{ full_name }</Typography> } />
            </ListItem>
          </React.Fragment>
        )) }
      </List>
    </>
  );
}

export default ReposTable;
