import { useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQueryParams = (filters: { [key: string]: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    const filters: { [key: string]: string } = {};

    for (const [key, value] of searchParams.entries()) {
      filters[key] = value;
    }

    return filters;
  }, [searchParams]);

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(filters);

    router.push(`${pathname}?${url.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return {
    queryParams: queryParams,
  };
};
