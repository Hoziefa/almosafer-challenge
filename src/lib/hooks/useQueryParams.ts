import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [localQueryValue, setLocalQueryValue] = useState('');
  const [localQueryKey, setLocalQueryKey] = useState('');
  const [shouldClearQueries, setShouldClearQueries] = useState(false);

  const readQuery = useCallback(
    (queryKey: string, fallbackValue = '') => {
      return searchParams.get(queryKey) ?? fallbackValue;
    },
    [searchParams],
  );

  const appendQuery = useCallback(
    (queryKey: string, queryValue: string) => {
      if (localQueryValue === queryValue) return;

      setLocalQueryKey(queryKey);
      setLocalQueryValue(queryValue);
    },
    [localQueryValue],
  );

  const clearQueries = useCallback(() => {
    setShouldClearQueries(true);
  }, []);

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (localQueryValue) url.set(localQueryKey, localQueryValue);
    else url.delete(localQueryKey);

    router.push(
      shouldClearQueries ? pathname : `${pathname}?${url.toString()}`,
    );

    setTimeout(() => {
      setShouldClearQueries(false);
    }, 300);
  }, [
    shouldClearQueries,
    localQueryKey,
    localQueryValue,
    pathname,
    router,
    searchParams,
  ]);

  return { readQuery, appendQuery, clearQueries };
};
