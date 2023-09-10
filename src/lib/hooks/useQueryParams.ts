import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [queryParamsKey, setQueryParamsKey] = useState('');
  const [queryParamsValue, setQueryParamsValue] = useState('');
  const [shouldClearQueries, setShouldClearQueries] = useState(false);

  const readQuery = useCallback(
    (queryKey: string, fallbackValue = '') => {
      return searchParams.get(queryKey) ?? fallbackValue;
    },
    [searchParams],
  );

  const appendQuery = useCallback(
    (queryKey: string, queryValue: string) => {
      if (queryParamsValue === queryValue) return;

      setQueryParamsKey(queryKey);
      setQueryParamsValue(queryValue);
    },
    [queryParamsValue],
  );

  const clearQueries = useCallback(() => {
    setShouldClearQueries(true);
  }, []);

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (queryParamsValue) url.set(queryParamsKey, queryParamsValue);
    else url.delete(queryParamsKey);

    router.push(
      shouldClearQueries ? pathname : `${pathname}?${url.toString()}`,
    );

    setTimeout(() => {
      setShouldClearQueries(false);
    }, 150);
  }, [
    shouldClearQueries,
    queryParamsKey,
    queryParamsValue,
    pathname,
    router,
    searchParams,
  ]);

  return { readQuery, appendQuery, clearQueries };
};
