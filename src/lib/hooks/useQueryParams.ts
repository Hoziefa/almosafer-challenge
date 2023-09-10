/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQueryParams = (
  queryKey: string,
  queryValue: string,
  setQueryValue: Function,
  fallbackValue = '',
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [shouldClearQueries, setShouldClearQueries] = useState(false);

  const clearQueries = useCallback(() => {
    setShouldClearQueries(true);
  }, []);

  // Handle init the component state with the persisted query
  useEffect(() => {
    setQueryValue(searchParams.get(queryKey) ?? fallbackValue);
  }, []);

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (queryValue === fallbackValue || url.get(queryKey) === queryValue) return;

    if (queryValue) url.set(queryKey, queryValue);
    else url.delete(queryKey);

    router.push(
      shouldClearQueries ? pathname : `${pathname}?${url.toString()}`,
    );

    setShouldClearQueries(false);
  }, [queryKey, queryValue]);

  return { clearQueries };
};
