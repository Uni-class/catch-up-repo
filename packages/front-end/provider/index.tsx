import { ReactNode } from "react";
import QueryClientProvider from "./query-client-provider";
import JotaiProvider from "./jotai-provider";
import MSWProvider from "./msw-provider";

interface PropType {
  children: ReactNode;
}

export default function Provider({ children }: PropType) {
  return (
    <MSWProvider>
      <QueryClientProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </QueryClientProvider>
    </MSWProvider>
  );
}
