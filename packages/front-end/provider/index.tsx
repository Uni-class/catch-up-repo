import { ReactNode, Suspense } from "react";
import QueryClientProvider from "./query-client-provider";
import JotaiProvider from "./jotai-provider";
import OverlayProvider from "./OverlayProvider";
import { AccountProvider } from "@/hook/useAccount";

interface PropType {
  children: ReactNode;
}

export default function Provider({ children }: PropType) {
  return (
    <QueryClientProvider>
      <JotaiProvider>
        <OverlayProvider>
          <Suspense fallback={null}>
            <AccountProvider>{children}</AccountProvider>
          </Suspense>
        </OverlayProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
