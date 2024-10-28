"use client";
import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosError } from "axios";

interface PropType {
  children: ReactNode;
}

export default function QueryClientProvider({ children }: PropType) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount, _error) => {
              const error = _error as AxiosError;
              if (error.response?.status === 401) {
                return false;
              }
              return failureCount < 2;
            },
          },
          dehydrate: {
            shouldDehydrateMutation: (_mutation) => false,
            shouldDehydrateQuery: (_query) => false,
          },
        },
      })
  );
  return (
    <_QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      {children}
    </_QueryClientProvider>
  );
}
