import { useQuery } from '@tanstack/react-query';
import { ReposHandler } from '@api/handlers/repos';

export const useLanguagesQuery = (url: string, enabled: boolean) => {
  const languagesQuery = useQuery({
    queryKey: [ReposHandler.languages.queryKey, url],
    queryFn: () => ReposHandler.languages.request(url),
    enabled,
  });

  const onFetchLanguages = () => {
    return languagesQuery.refetch();
  };

  return {
    ...languagesQuery,
    data: Object.keys(languagesQuery.data ?? {}),
    onFetchLanguages,
  };
};
