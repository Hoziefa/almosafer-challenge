import { useQuery } from "@tanstack/react-query";
import { ReposHandler } from "@api/handlers/repos";

export const useForksQuery = (url: string) => {
  const forksQuery = useQuery({
    queryKey: [ReposHandler.forks.queryKey, url],
    queryFn: () => ReposHandler.forks.request(url),
  });

  const onFetchForks = () => {
    return forksQuery.refetch();
  };

  return {
    ...forksQuery,
    onFetchForks,
  };
};
