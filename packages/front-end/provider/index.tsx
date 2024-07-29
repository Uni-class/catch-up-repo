import { ReactNode } from "react";
import QueryClientProvider from "./query-client-provider";
import JotaiProvider from "./jotai-provider";
import MSWProvider from "./msw-provider";
import OverlayProvider from "./OverlayProvider";

interface PropType {
  children: ReactNode;
}

export default function Provider({ children }: PropType) {
  return (
    <MSWProvider>
      <QueryClientProvider>
        <JotaiProvider>
          <OverlayProvider>
            {children}
          </OverlayProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </MSWProvider>
  );
}
