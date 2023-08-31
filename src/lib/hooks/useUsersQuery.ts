import { usePaginatedTableQuery } from "@hooks/usePaginatedTableQuery";
import { UsersHandler } from "@api/handlers";
import type { User } from "@app-types";

export const useUsersQuery = () => {
  const paginatedDataTableQuery = usePaginatedTableQuery<User>({
    queryFn: UsersHandler.list.request,
    queryKey: UsersHandler.list.queryKey,
  });

  const onFetchData = async () => {
    await paginatedDataTableQuery.refetch();
  };

  return {
    onFetchData,
    ...paginatedDataTableQuery,
  };
};
