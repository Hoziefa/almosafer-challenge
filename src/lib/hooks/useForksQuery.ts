import { useQuery } from '@tanstack/react-query';
import { ReposHandler } from '@api/handlers/repos';
import { useMemo } from 'react';

import { Repository } from '@app-types';

export const useForksQuery = (url: string) => {
  const forksQuery = useQuery({
    queryKey: [ReposHandler.forks.queryKey, url],
    queryFn: () => ReposHandler.forks.request(url),
  });

  const forksDTO = useMemo<Repository[]>(() => {
    if (!forksQuery.data) return [];

    return forksQuery.data.map((fork) => ({
      id: fork.id,
      name: fork.full_name,
      avatarUrl: fork.owner.avatar_url,
      profileUrl: fork.owner.html_url,
      forksUrl: fork.forks_url,
      languagesUrl: fork.languages_url,
    }));
  }, [forksQuery.data]);

  const onFetchForks = () => {
    return forksQuery.refetch();
  };

  return {
    ...forksQuery,
    onFetchForks,
    data: forksDTO,
  };
};
