import { usePaginatedTableQuery } from '@hooks/usePaginatedTableQuery';
import { ReposHandler } from '@api/handlers/repos';
import type { Repository } from '@app-types';

export const useReposQuery = () => {
  const paginatedDataTableQuery = usePaginatedTableQuery<Repository>({
    queryFn: ReposHandler.list.request,
    queryKey: ReposHandler.list.queryKey,
  });

  const onFetchData = async () => {
    await paginatedDataTableQuery.refetch();
  };

  return {
    onFetchData,
    ...paginatedDataTableQuery,
  };
};
