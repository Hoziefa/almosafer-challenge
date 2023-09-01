"use client";

import React, { useMemo, useState } from "react";
import UsersTable from "@components/users-table";
import ReposTable from "@components/repos-table";
import { MenuItem, TextField } from "@mui/material";

type Filter = "users" | "repositories";

type RenderedTable = { [key: string]: JSX.Element };

const FILTERS = [
  { label: "Users", value: "users" },
  { label: "Repositories", value: "repositories" },
];

function GithubTables() {
  const [filter, setFilter] = useState<Filter>("users");

  const renderedTable = useMemo<RenderedTable>(() => {
    return {
      users: <UsersTable />,
      repositories: <ReposTable />,
    };
  }, []);

  return (
    <>
      <TextField
        label="Select a type"
        select
        fullWidth
        value={ filter }
        onChange={ (event) => setFilter(event.target.value as Filter) }
      >
        { FILTERS.map((option) => (
          <MenuItem key={ option.value } value={ option.value }>
            { option.label }
          </MenuItem>
        )) }
      </TextField>

      { renderedTable[filter] }
    </>
  );
}

export default GithubTables;
