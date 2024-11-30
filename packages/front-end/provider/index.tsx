import { ReactNode, Suspense } from 'react';
import QueryClientProvider from './query-client-provider';
import JotaiProvider from './jotai-provider';
import OverlayProvider from './OverlayProvider';
import ToastProvider from './toast-provider';

interface PropType {
  children: ReactNode;
}

export default function Provider({ children }: PropType) {
  return (
    <QueryClientProvider>
      <JotaiProvider>
        <OverlayProvider>
          <Suspense fallback={null}>
            <ToastProvider>{children}</ToastProvider>
          </Suspense>
        </OverlayProvider>
      </JotaiProvider>
    </QueryClientProvider>
  );
}
