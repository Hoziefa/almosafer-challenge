import { useState } from "react";
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from "material-react-table";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import type { QueryKey } from "@tanstack/query-core";
import type { Result } from "@app-types";

export type UsePaginatedDataTableQueryProps<T, TError = unknown, TData = T, TQueryKey extends QueryKey = QueryKey> = {
  queryFn: (params: AxiosRequestConfig["params"]) => Promise<Result<T>>;
  queryKey: string;
  initialPagination?: MRT_PaginationState;
  initialColumnFilters?: MRT_ColumnFiltersState;
  initialSorting?: MRT_SortingState;
  params?: AxiosRequestConfig["params"];
  queryOptions?: Omit<UseQueryOptions<T, TError, TData, TQueryKey>, "queryKey" | "queryFn" | "initialData"> & {
    initialData?: () => undefined
  }
}

type PaginatedQueryParams = {
  page: number;
  per_page: number;
  sort?: string;
  order?: string;
  q?: string;
  [key: string]: any
}

function mapQueryParamsToString(queryParams: PaginatedQueryParams) {
  return Object.keys(queryParams).map((key: string) => `${ key }=${ encodeURIComponent(queryParams[key]) }`).join("&");
}

export function usePaginatedTableQuery<T extends Record<string, any>>(props: UsePaginatedDataTableQueryProps<T>) {
  const {
    params,
    queryKey,
    queryFn,
    initialSorting = [],
    initialPagination = {
      pageSize: 10,
      pageIndex: 0,
    },
    initialColumnFilters = [],
  } = props;

  const [globalFilter, setGlobalFilter] = useState<string | null>("");
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(initialColumnFilters);
  const [sorting, setSorting] = useState<MRT_SortingState>(initialSorting);
  const [pagination, setPagination] = useState<MRT_PaginationState>(initialPagination);

  const dataTableQuery = useQuery<Result<T>, Error>(
    [queryKey, columnFilters, pagination.pageIndex, pagination.pageSize, sorting, globalFilter],
    async () => {
      const queryParams: PaginatedQueryParams = {
        page: pagination.pageIndex + 1 || 1,
        per_page: pagination.pageSize,
        q: "Q",
        order: sorting?.[0]?.desc ? "desc" : "asc",
        ...params,
      };

      if (globalFilter && globalFilter.length) {
        queryParams.q = globalFilter ?? "";
      }

      const queryString = mapQueryParamsToString(queryParams);

      return await queryFn(queryString);

    },
    {
      keepPreviousData: true,
    },
  );

  return {
    ...dataTableQuery,
    data: dataTableQuery.data?.items ?? [],
    rowCount: dataTableQuery.data?.total_count ?? 0,
    pagination,
    setColumnFilters,
    setPagination,
    globalFilter,
    setGlobalFilter,
    setSorting,
    sorting,
    columnFilters,
  };
}
