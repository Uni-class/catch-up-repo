import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session } from "@/schema/backend.schema";
import { apiClient } from "@/util/axios";
import { ParticipantSessionTable } from "../_components/ParticipantSessionTable";


export default function ParticipantSessionTableFetcher() {
  const { data: response, isLoading } = useQuery<AxiosResponse<Session[]>>({
    queryKey: ["user", "sessions", "participant"],
    queryFn: async () => {
      return await apiClient.get("/user/sessions", {
        params: {
          role: "participant"
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
    return <ParticipantSessionTable data={data} />;
  else
    return <h1>오류</h1>;
}

interface SessionTablePropType {
  data: Session[];
}