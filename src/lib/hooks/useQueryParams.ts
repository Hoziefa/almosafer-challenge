import { useEffect } from 'react';
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

  useEffect(() => {
    setQueryValue(searchParams.get(queryKey) ?? fallbackValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (url.get(queryKey) === queryValue) return;

    if (queryValue) url.set(queryKey, queryValue);
    else url.delete(queryKey);

    router.push(`${pathname}?${url.toString()}`);
  }, [queryValue, queryKey, pathname, router, searchParams]);
};
