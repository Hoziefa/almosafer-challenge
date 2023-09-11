import { useInfiniteQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import {
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
} from 'material-react-table';

import { useFilters } from '@contexts/FiltersContext';
import { useDebounce } from '@hooks/useDebounce';

import type { QueryKey } from '@tanstack/query-core';
import type { Result } from '@app-types';

export type QueryProps<
  T,
  TError = unknown,
  TData = T,
  TQueryKey extends QueryKey = QueryKey,
> = {
  queryFn: (params: AxiosRequestConfig['params']) => Promise<Result<T>>;
  queryKey: string;
  initialPagination?: MRT_PaginationState;
  initialColumnFilters?: MRT_ColumnFiltersState;
  initialSorting?: MRT_SortingState;
  params?: AxiosRequestConfig['params'];
  queryOptions?: Omit<
    UseQueryOptions<T, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn' | 'initialData'
  > & {
    initialData?: () => undefined;
  };
  onError?: (err: Error) => void;
};

const PER_PAGE = 10;

export const usePaginatedTableQuery = <T extends Record<string, any>>(
  props: QueryProps<T>,
) => {
  const { queryFilter } = useFilters();
  const debouncedQueryFilter = useDebounce(queryFilter);

  const dataTableQuery = useInfiniteQuery<Result<T>, Error>(
    [props.queryKey, debouncedQueryFilter],
    async ({ pageParam = 0 }) => {
      const searchParams = new URLSearchParams();

      searchParams.set('page', (pageParam + 1).toString());
      searchParams.set('per_page', PER_PAGE.toString());
      searchParams.set('q', debouncedQueryFilter || 'Q');

      return await props.queryFn(searchParams);
    },
    {
      onError: props.onError,
      getNextPageParam: (lastGroup, groups) => {
        return groups.length * PER_PAGE < lastGroup.total_count
          ? groups.length
          : undefined;
      },
    },
  );

  return {
    ...dataTableQuery,
    data: dataTableQuery.data?.pages.map(({ items }) => items).flat() ?? [],
    rowCount: dataTableQuery.data?.pages[0].total_count ?? 0,
    queryFilter,
  };
};
