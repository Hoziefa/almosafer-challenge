import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQueryParams = (
  queryKey: string,
  queryValue: string,
  fallbackValue = '',
) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (queryValue) url.set(queryKey, queryValue);
    else url.delete(queryKey);

    router.push(`${pathname}?${url.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey, queryValue]);

  return {
    queryValue: searchParams.get(queryKey) ?? fallbackValue,
  };
};
