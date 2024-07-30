import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session } from "@/schema/backend.schema";
import { apiClient } from "@/util/axios";
import { HostSessionTable } from "../_components/HostSessionTable";


export default function HostSessionTableFetcher() {
  const { data: response, isLoading } = useQuery<AxiosResponse<Session[]>>({
    queryKey: ["user", "sessions", "host"],
    queryFn: async () => {
      return await apiClient.get("/user/sessions", {
        params: {
          role: "host"
        },
      });
    },
    throwOnError: true,
  });
  if (isLoading) {
    return <h1>로딩...</h1>;
  }
  const data = response?.data;
  if (data)
    return <HostSessionTable data={data} />;
  else
    return <h1>오류</h1>;
}

interface SessionTablePropType {
  data: Session[];
}