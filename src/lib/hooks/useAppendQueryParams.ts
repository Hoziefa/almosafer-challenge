import { useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useAppendQueryParams = (filterKey: string, filterValue: string) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    url.set(filterKey, filterValue);

    router.push(`${ pathname }?${ url.toString() }`);
  }, [filterKey, filterValue, pathname, router, searchParams]);
};
