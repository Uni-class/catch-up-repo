import { useCallback, useEffect } from "react";
import { useRouter } from "./useRouter";


export const useLoginRedirectWithError = (
  error: Error & { digest?: string; status: number }
) => {
  const router = useRouter();

  useEffect(() => {
    if (error.status === 401) {
      const prevURL = `${router.pathname}?${router.query.toString()}`;
      const storage = window.sessionStorage;
      storage.setItem("prevURL", prevURL);
      router.push("/login");
    }
  }, [error.status, router]);
};
