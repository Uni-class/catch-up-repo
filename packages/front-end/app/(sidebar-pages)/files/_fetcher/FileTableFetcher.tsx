import { useQuery } from "@tanstack/react-query";
import { File } from "@/schema/backend.schema";
import { apiClient } from "@/utils/axios";
import { FileTable } from "../_components/FileTable";


export default function FileTableFetcher() {
  const { data: response, isLoading, isError } = useQuery({
    queryKey: ["user", "files"],
    queryFn: async () => {
      return await apiClient.get<File[]>("/user/files");
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
  return <FileTable data={data || []} status={status} />
}
