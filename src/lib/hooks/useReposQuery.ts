import { usePaginatedTableQuery } from "@hooks/usePaginatedTableQuery";
import { ReposHandler } from "@api/handlers/repos";
import { useQueries } from "@tanstack/react-query";
import type { Repository } from "@app-types";

export const useReposQuery = () => {
  const paginatedDataTableQuery = usePaginatedTableQuery<Repository>({
    queryFn: ReposHandler.list.request,
    queryKey: ReposHandler.list.queryKey,
  });

  const onFetchData = async () => {
    await paginatedDataTableQuery.refetch();
  };

  const forks = useQueries({ queries: paginatedDataTableQuery.data.map((repo) => ({ queryKey: ["fork", repo.id], queryFn: () => ReposHandler.forks.request(repo.forks_url) })) }).map((data) => {
    return data.data?.slice(0, 3).reduce((acc: any, fork) => {
      acc[fork.id] = fork;

      return acc;
    }, {});
  });

  return {
    onFetchData,
    ...paginatedDataTableQuery,
  };
};
