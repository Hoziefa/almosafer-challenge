import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { useQueryParams } from '@hooks/useQueryParams';

type TypeFilter = 'users' | 'repositories';

type Action = {
  type: string;
  payload: string;
};

type FiltersState = {
  searchQuery: string;
  filter: string;
};

type FiltersContext = {
  searchQuery: string;
  filter: string;
  setSearchQuery: (searchQuery: string) => void;
  setFilter: (filter: TypeFilter) => void;
};

const TYPE_FILTER_KEY = 'type';
const DEFAULT_VALUE = 'users';
const QUERY_FILTER_KEY = 'query';

const initialState: FiltersState = {
  filter: DEFAULT_VALUE,
  searchQuery: '',
};

const reducer = (state: typeof initialState, action: Action) => {
  if (action.type === TYPE_FILTER_KEY && state.filter !== action.payload)
    return { ...state, filter: action.payload };

  if (action.type === QUERY_FILTER_KEY && state.searchQuery !== action.payload)
    return { ...state, searchQuery: action.payload };

  return state;
};

export const FiltersProvider = ({ children }: React.PropsWithChildren) => {
  const [{ filter, searchQuery }, dispatch] = useReducer(reducer, initialState);

  const { queryParams } = useQueryParams({
    [TYPE_FILTER_KEY]: filter,
    [QUERY_FILTER_KEY]: searchQuery,
  });

  const setSearchQuery = useCallback((searchQuery: string) => {
    dispatch({ type: QUERY_FILTER_KEY, payload: searchQuery });
  }, []);

  const setFilter = useCallback((typeFilter: TypeFilter) => {
    dispatch({ type: TYPE_FILTER_KEY, payload: typeFilter });
  }, []);

  useEffect(() => {
    setFilter((queryParams[TYPE_FILTER_KEY] as TypeFilter) ?? DEFAULT_VALUE);
    setSearchQuery(queryParams[QUERY_FILTER_KEY] ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    searchQuery,
    filter,
    setSearchQuery,
    setFilter,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

export const FiltersContext = createContext(initialState as FiltersContext);

export function useFilters() {
  return useContext(FiltersContext);
}
