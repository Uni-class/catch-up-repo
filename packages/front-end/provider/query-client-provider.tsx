"use client";
import {
  QueryClient,
  QueryClientProvider as _QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
});

interface PropType {
  children: ReactNode;
}

export default function QueryClientProvider({ children }: PropType) {
  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
