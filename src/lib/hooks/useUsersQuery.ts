import { useMemo } from 'react';
import { usePaginatedTableQuery } from '@hooks/usePaginatedTableQuery';
import { UsersHandler } from '@api/handlers';
import { store } from '@stores/store';
import { User } from '@app-types';

export const useUsersQuery = () => {
  const paginatedDataTableQuery = usePaginatedTableQuery({
    queryFn: UsersHandler.list.request,
    queryKey: UsersHandler.list.queryKey,
    onError: () =>
      store.appStore.onOpen('Something went wrong, please try again later!'),
  });

  const usersDTO = useMemo<User[]>(() => {
    return paginatedDataTableQuery.data.map((user) => ({
      id: user.id,
      name: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
    }));
  }, [paginatedDataTableQuery.data]);

  const onFetchData = async () => {
    await paginatedDataTableQuery.refetch();
  };

  return {
    ...paginatedDataTableQuery,
    onFetchData,
    data: usersDTO,
  };
};
