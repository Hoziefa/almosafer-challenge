import { usePaginatedTableQuery } from '@hooks/usePaginatedTableQuery';
import { ReposHandler } from '@api/handlers/repos';
import { store } from "@stores/store";

import type { Repository } from '@app-types';

export const useReposQuery = () => {
  const paginatedDataTableQuery = usePaginatedTableQuery<Repository>({
    queryFn: ReposHandler.list.request,
    queryKey: ReposHandler.list.queryKey,
    onError: () =>
      store.appStore.onOpen('Something went wrong, please try again later!'),
  });

  const onFetchData = async () => {
    await paginatedDataTableQuery.refetch();
  };

  return {
    onFetchData,
    ...paginatedDataTableQuery,
  };
};
