import { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const useRead = (queryKey: string, fallbackValue = '') => {
  const searchParams = useSearchParams();

  return {
    queryValue: searchParams.get(queryKey) ?? fallbackValue,
  };
};

const useAppend = (queryKey: string, queryValue: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (queryValue) url.set(queryKey, queryValue);
    else url.delete(queryKey);

    router.push(`${pathname}?${url.toString()}`);
  }, [queryKey, queryValue, pathname, router, searchParams]);
};

export const useQueryParams = () => {
  return { useRead, useAppend };
};
