import { useState } from "react";
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from "material-react-table";
import { useInfiniteQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import type { QueryKey } from "@tanstack/query-core";
import type { Result } from "@app-types";

export type QueryProps<T, TError = unknown, TData = T, TQueryKey extends QueryKey = QueryKey> = {
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

const PER_PAGE = 10;

export function usePaginatedTableQuery<T extends Record<string, any>>(props: QueryProps<T>) {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<MRT_SortingState>(props.initialSorting ?? []);

  const dataTableQuery = useInfiniteQuery<Result<T>, Error>(
    [props.queryKey, sorting, globalFilter],
    async ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams();

      searchParams.set("page", (pageParam * PER_PAGE).toString());
      searchParams.set("per_page", PER_PAGE.toString());
      searchParams.set("q", globalFilter || "Q");
      searchParams.set("order", sorting[0]?.desc ? "desc" : "asc");

      return await props.queryFn(searchParams);
    },
    {
      getNextPageParam: (_lastGroup, groups) => groups.length,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      cacheTime: 1e9,
    },
  );

  return {
    ...dataTableQuery,
    data: dataTableQuery.data?.pages.map(({ items }) => items).flat() ?? [],
    rowCount: dataTableQuery.data?.pages[0].total_count ?? 0,
    globalFilter,
    sorting,
    setGlobalFilter,
    setSorting,
  };
}
