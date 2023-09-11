import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import { useQueryParams } from '@hooks/useQueryParams';

import type { GenericContext } from '@app-types';

type TypeFilter = 'users' | 'repositories';

type Action = {
  type: string;
  payload: string;
};

export type FiltersState = {
  queryFilter: string;
  typeFilter: string;
};

type FiltersContext = FiltersState & {
  setQueryFilter: (queryFilter: string) => void;
  setTypeFilter: (typeFilter: TypeFilter) => void;
};

const TYPE_FILTER_KEY = 'type';
const DEFAULT_VALUE = 'users';
const QUERY_FILTER_KEY = 'query';

const initialState: FiltersState = {
  typeFilter: DEFAULT_VALUE,
  queryFilter: '',
};

const reducer = (state: typeof initialState, action: Action): FiltersState => {
  if (action.type === TYPE_FILTER_KEY && state.typeFilter !== action.payload)
    return { ...state, typeFilter: action.payload };

  if (action.type === QUERY_FILTER_KEY && state.queryFilter !== action.payload)
    return { ...state, queryFilter: action.payload };

  return state;
};

export const FiltersProvider = ({
  children,
  defaultInitialState = {},
}: React.PropsWithChildren & GenericContext<Partial<FiltersState>>) => {
  const [{ typeFilter, queryFilter }, dispatch] = useReducer(reducer, {
    ...initialState,
    ...defaultInitialState,
  });

  const { queryParams } = useQueryParams({
    [TYPE_FILTER_KEY]: typeFilter,
    [QUERY_FILTER_KEY]: queryFilter,
  });

  const setQueryFilter = useCallback((queryFilter: string) => {
    dispatch({ type: QUERY_FILTER_KEY, payload: queryFilter });
  }, []);

  const setTypeFilter = useCallback((typeFilter: TypeFilter) => {
    dispatch({ type: TYPE_FILTER_KEY, payload: typeFilter });
  }, []);

  useEffect(() => {
    setTypeFilter(
      (queryParams[TYPE_FILTER_KEY] as TypeFilter) ?? DEFAULT_VALUE,
    );
    setQueryFilter(queryParams[QUERY_FILTER_KEY] ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    queryFilter,
    typeFilter,
    setQueryFilter,
    setTypeFilter,
  };

  return (
    <FiltersContext.Provider value={contextValue}>
      {children}
    </FiltersContext.Provider>
  );
};

const FiltersContext = createContext(initialState as FiltersContext);

export function useFilters() {
  return useContext(FiltersContext);
}
