import { useMemo } from 'react';
import { usePaginatedTableQuery } from '@hooks/usePaginatedTableQuery';
import { ReposHandler } from '@api/handlers/repos';
import { store } from '@stores/store';
import { Repository } from '@app-types';

export const useReposQuery = (globalFilter: string) => {
  const paginatedDataTableQuery = usePaginatedTableQuery({
    queryFn: ReposHandler.list.request,
    queryKey: ReposHandler.list.queryKey,
    globalFilter,
    onError: () =>
      store.appStore.onOpen('Something went wrong, please try again later!'),
  });

  const reposDTO = useMemo<Repository[]>(() => {
    return paginatedDataTableQuery.data.map((repo) => ({
      id: repo.id,
      name: repo.full_name,
      avatarUrl: repo.owner.avatar_url,
      forksUrl: repo.forks_url,
      languagesUrl: repo.languages_url,
    }));
  }, [paginatedDataTableQuery.data]);

  const onFetchData = async () => {
    await paginatedDataTableQuery.refetch();
  };

  return {
    ...paginatedDataTableQuery,
    onFetchData,
    data: reposDTO,
  };
};
