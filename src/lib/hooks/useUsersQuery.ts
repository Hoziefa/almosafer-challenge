import { usePaginatedTableQuery } from "@hooks/usePaginatedTableQuery";
import { UsersHandler } from "@api/handlers";
import type { User } from "@app-types";
import { store } from "@stores/store";

export const useUsersQuery = () => {
  const paginatedDataTableQuery = usePaginatedTableQuery<User>({
    queryFn: UsersHandler.list.request,
    queryKey: UsersHandler.list.queryKey,
    onError: () => store.appStore.onOpen("Something went wrong, please try again later!"),
  });

  const onFetchData = async () => {
    await paginatedDataTableQuery.refetch();
  };

  return {
    onFetchData,
    ...paginatedDataTableQuery,
  };
};
