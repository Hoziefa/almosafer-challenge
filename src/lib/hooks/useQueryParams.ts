import { useCallback, useEffect, useReducer } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const initialState = {
  queryKey: '',
  queryValue: '',
};

const reducer = (
  state: typeof initialState,
  action: { type: string; payload: string },
) => {
  if (state.queryValue !== action.payload)
    return { ...state, queryKey: action.type, queryValue: action.payload };

  return state;
};

export const useQueryParams = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [state, dispatch] = useReducer(reducer, initialState);

  const readQuery = useCallback(
    (queryKey: string, fallbackValue = '') => {
      return searchParams.get(queryKey) ?? fallbackValue;
    },
    [searchParams],
  );

  const appendQuery = useCallback(
    (queryKey: string, queryValue: string) => {
      if (state.queryValue === queryValue) return;

      dispatch({ type: queryKey, payload: queryValue });
    },
    [state.queryValue],
  );

  // Handles the adding and deleting
  useEffect(() => {
    const url = new URLSearchParams(searchParams);

    if (state.queryValue) url.set(state.queryKey, state.queryValue);
    else url.delete(state.queryKey);

    router.push(`${pathname}?${url.toString()}`);
  }, [state.queryKey, state.queryValue, pathname, router, searchParams]);

  return { readQuery, appendQuery };
};
