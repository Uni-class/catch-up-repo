import {useRouter} from "@/hook/useRouter";
import getRoleFromURL from "@/util/getRoleFromURL";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {Session} from "@/schema/backend.schema";
import {apiClient} from "@/util/axios";
import {SessionTable} from "@/app/(sidebar-pages)/sessions/participant/_components/SessionTable";

export default function SessionTableFetcher() {
  const { pathname } = useRouter();
  const role = getRoleFromURL(pathname);
  const { data: response, isLoading } = useQuery<AxiosResponse<Session[]>>({
    queryKey: ["user", "sessions", role],
    queryFn: async () => {
      return await apiClient.get("/user/sessions", {
        params: {role},
      });
    },
    throwOnError: true,
  });
  if (isLoading) {
    return <h1>로딩...</h1>;
  }
  const data = response?.data;
  if (data)
    return <SessionTable data={data} />;
  else
    return <h1>오류</h1>;
}

interface SessionTablePropType {
  data: Session[];
}