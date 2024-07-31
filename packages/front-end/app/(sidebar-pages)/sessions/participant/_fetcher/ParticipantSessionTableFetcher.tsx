import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Session } from "@/schema/backend.schema";
import { apiClient } from "@/util/axios";
import { ParticipantSessionTable } from "../_components/ParticipantSessionTable";


export default function ParticipantSessionTableFetcher() {
  const { data: response, isLoading, isError } = useQuery<AxiosResponse<Session[]>>({
    queryKey: ["user", "sessions", "participant"],
    queryFn: async () => {
      return await apiClient.get("/user/sessions", {
        params: {
          role: "participant"
        },
      });
    },
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
  return <ParticipantSessionTable data={data || []} status={status} />
}
