/* eslint-disable react-hooks/exhaustive-deps */

import { RefObject, useCallback, useEffect } from "react";

type UseTableInfinitePagination = {
  containerRef: RefObject<HTMLDivElement>;
  searchQuery: string;
  fetchNextPage: () => void;
  shouldFetchNextPage: () => boolean;
};

export const useDataTableInfiniteScroll = (
  props: UseTableInfinitePagination,
) => {
  const onInfinitePagination = useCallback(
    (containerRef?: HTMLDivElement | null) => {
      if (!containerRef) return;

      const { scrollHeight, scrollTop, clientHeight } = containerRef;

      if (
        scrollTop >= scrollHeight - clientHeight &&
        props.shouldFetchNextPage()
      ) {
        props.fetchNextPage();
      }
    },
    [props.shouldFetchNextPage, props.fetchNextPage],
  );

  // Scroll to the top when entering a query
  useEffect(() => {
    props.containerRef.current?.scrollTo?.({ top: 0 });
  }, [props.searchQuery]);

  return {
    onInfinitePagination,
  };
};
