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
  queryObj:Record<string,string>;
  getURLString: (pathname: string, queryObj:Record<string,string>) => string;
}

export const useRouter = (): RouterInstance => {
  const router = _useRouter();
  const query = useSearchParams();
  const pathname = usePathname();
  const queryObj = Object.fromEntries(query);
  const getURLString = (
    pathname: string,
    queryObj:Record<string,string>
  ) => {
    const url = new URL(pathname, window.location.href); // just dummy url, not use
    Object.keys(queryObj).forEach((key) => {
      url.searchParams.append(key, queryObj[key]);
    });
    return `${url.pathname}${url.search}`;
  };
  return {
    ...router,
    query,
    pathname,
    queryObj,
    getURLString,
  };
};
