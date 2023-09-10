import { useCallback, useEffect } from 'react';
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

  const clearQueries = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  useEffect(() => {
    if (searchParams.get(queryKey)) return;

    setQueryValue(fallbackValue);
  }, [fallbackValue, queryKey, searchParams, setQueryValue]);

  // Handle init the component state with the persisted query
  useEffect(() => {
    setQueryValue(searchParams.get(queryKey) ?? fallbackValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (queryValue === fallbackValue || url.get(queryKey) === queryValue)
      return;

    if (queryValue) url.set(queryKey, queryValue);
    else url.delete(queryKey);

    router.push(`${pathname}?${url.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, queryValue]);

  return { clearQueries };
};
