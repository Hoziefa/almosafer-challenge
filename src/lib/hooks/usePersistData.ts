import { useCallback, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const usePersistData = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = useRef(new URLSearchParams(searchParams));

  const readData = useCallback(
    (filterKey: string) => {
      const url = new URLSearchParams(searchParams);

      return url.get(filterKey);
    },
    [searchParams],
  );

  const persistData = useCallback(
    (filterKey: string, filterValue: string) => {
      if (filterValue) url.current.set(filterKey, filterValue);
      else url.current.delete(filterKey);

      router.push(`${pathname}?${url.current.toString()}`);
    },
    [pathname, router],
  );

  const deleteData = useCallback(
    (filterKey: string) => {
      url.current.delete(filterKey);

      router.push(`${pathname}?${url.current.toString()}`);
    },
    [pathname, router],
  );

  const clearData = useCallback(() => {
    url.current = new URLSearchParams();

    router.push(pathname);
  }, [pathname, router]);

  return {
    readData,
    persistData,
    deleteData,
    clearData,
  };
};
