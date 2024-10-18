import { useCallback, useEffect } from "react";
import { useRouter } from "./useRouter";
import { useAtom, useSetAtom } from "jotai";
import { LoginRedirectAtom } from "@/client/LoginRedirectAtom";

export const useLoginRedirect = (
  error: Error & { digest?: string; status: number }
) => {
  const [, setLoginRedirect] = useAtom(LoginRedirectAtom);
  const router = useRouter();

  useEffect(() => {
    if (error.status === 401) {
      const prevURL = `${router.pathname}?${router.query.toString()}`;
      setLoginRedirect(prevURL);
      router.push("/login");
    }
  }, [error.status, router, setLoginRedirect]);
};
