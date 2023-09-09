import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      retryDelay: 3000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
});

export default queryClient;
