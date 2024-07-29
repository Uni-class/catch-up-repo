"use client";
import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface PropType {
  children: ReactNode;
}

export default function QueryClientProvider({ children }: PropType) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
          },
          dehydrate: {
            shouldDehydrateMutation: (_mutation) => false,
            shouldDehydrateQuery: (_query) => false,
          },
        },
      })
  );
  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
