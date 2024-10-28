"use client";
import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface PropType {
  children: ReactNode;
}

export default function QueryClientProvider({ children }: PropType) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: (failureCount,error)=>{
              console.log(error);
              return failureCount < 3
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
