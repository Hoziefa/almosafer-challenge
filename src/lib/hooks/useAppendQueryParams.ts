import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useAppendQueryParams = (
  filterKey: string,
  filterValue: string,
  fallbackValue = '',
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [resetParams, setResetParams] = useState(false);

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (filterValue) url.set(filterKey, filterValue);
    else url.delete(filterKey);

    router.push(`${pathname}?${url.toString()}`);
  }, [filterKey, filterValue, pathname, router, searchParams]);

  // Handles the resetting and clearing
  useEffect(() => {
    if (!resetParams) return;

    const url = new URLSearchParams(searchParams);

    url.forEach((_value, name) => url.delete(name));

    setResetParams(false);

    router.push(pathname);
  }, [pathname, resetParams, router, searchParams]);

  return {
    queryValue: searchParams.get(filterKey) ?? fallbackValue,
    isQueryReset: resetParams,
    onResetQueries: setResetParams,
  };
};
