import { ReactNode } from "react";
import QueryClientProvider from "./query-client-provider";
import JotaiProvider from "./jotai-provider";
import StyledComponentsProvider from "./styled-components-provider";
import StyleProvider from "./style-provider";
import MSWProvider from "./msw-provider";

interface PropType {
  children: ReactNode;
}

export default function Provider({ children }: PropType) {
  return (
    <MSWProvider>
      <QueryClientProvider>
        <JotaiProvider>
          <StyledComponentsProvider>
            <StyleProvider>{children}</StyleProvider>
          </StyledComponentsProvider>
        </JotaiProvider>
      </QueryClientProvider>
    </MSWProvider>
  );
}
