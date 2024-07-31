import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session } from "@/schema/backend.schema";
import { apiClient } from "@/util/axios";
import { HostSessionTable } from "../_components/HostSessionTable";


export default function HostSessionTableFetcher() {
  const { data: response, isLoading, isError } = useQuery<AxiosResponse<Session[]>>({
    queryKey: ["user", "sessions", "host"],
    queryFn: async () => {
      return await apiClient.get("/user/sessions", {
        params: {
          role: "host"
        },
      });
    }
  });
  const data = response?.data;
  const status = (
    isLoading
    ?
      "loading"
      :
      (
        isError || !Array.isArray(data)
        ?
          "error"
          :
          null
      )
  );
  return <HostSessionTable data={data || []} status={status} />
}
