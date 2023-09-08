import { useCallback, useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useAppendQueryParams = (
  filterKey: string,
  filterValue: string,
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = useRef(new URLSearchParams(searchParams));

  // Handles the resetting and clearing
  const onResetQueryParams = useCallback(() => {
    url.current = new URLSearchParams();

    router.push(pathname);
  }, [pathname, router]);

  // Handles the adding and deleting
  useEffect(() => {
    if (filterValue) url.current.set(filterKey, filterValue);
    else url.current.delete(filterKey);

    router.push(`${pathname}?${url.current.toString()}`);
  }, [filterKey, filterValue, pathname, router]);

  return {
    query: url.current.get(filterKey) ?? '',
    onResetQueryParams,
  };
};
