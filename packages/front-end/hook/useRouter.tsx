import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  useRouter as _useRouter,
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";

export interface RouterInstance extends AppRouterInstance {
  pathname: string;
  query: ReadonlyURLSearchParams;
  queryObj: Record<string, string>;
  getURL: () => URL;
}

export const useRouter = (): RouterInstance => {
  const router = _useRouter();
  const query = useSearchParams();
  const pathname = usePathname();
  const queryObj = Object.fromEntries(query);
  const getURL = () =>
    typeof window === "undefined"
      ? new URL("", "https://catchup.tools/")
      : new URL(window.location.href);
  return {
    ...router,
    query,
    pathname,
    queryObj,
    getURL,
  };
};
