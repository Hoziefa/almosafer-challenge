import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useAppendQueryParams = (
  filterKey: string,
  filterValue: string,
  resetParams = false,
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

    console.log(url.entries());

    url.forEach((_value, name) => url.delete(name));

    router.push(`${pathname}?${url.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetParams]);
};
