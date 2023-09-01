/* eslint-disable react-hooks/exhaustive-deps */

import { RefObject, useCallback, useEffect } from "react";

type UseDataTableInfinitePagination = {
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
  containerRef: RefObject<HTMLDivElement>;
  globalFilter: string;
};

export const useDataTableInfiniteScroll = (props: UseDataTableInfinitePagination) => {
  const onInfinitePagination = useCallback((containerRef?: HTMLDivElement | null) => {
    if (!containerRef) return;

    const { scrollHeight, scrollTop, clientHeight } = containerRef;

    if (
      scrollTop >= (scrollHeight - clientHeight) &&
      !props.isFetching &&
      !props.isFetchingNextPage &&
      props.hasNextPage
    ) {
      props.fetchNextPage();
    }
  }, [props.isFetching, props.isFetchingNextPage, props.hasNextPage, props.fetchNextPage]);

  // Scroll to the top when entering a query
  useEffect(() => {
    props.containerRef.current?.scrollTo({ top: 0 });
  }, [props.globalFilter]);

  return {
    onInfinitePagination,
  };
};
