import { useEffect } from "react";
import { useAccount, useAccountController } from "./useAccount";
import { useRouter } from "./useRouter";

export const useLoginRedirectWithContext = () => {
  const controller = useAccountController();
  const router = useRouter();

  useEffect(() => {
    if (controller.isError) {
      const prevURL = `${router.pathname}?${router.query.toString()}`;
      const storage = window.sessionStorage;
      storage.setItem("prevURL", prevURL);
      router.push("/login");
    }
  }, [controller.isError, router]);
};
