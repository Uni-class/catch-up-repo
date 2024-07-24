import { useRouter } from "@/hook/useRouter";
import { apiClient } from "@/util/axios";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function FileTable() {
  const { queryObj } = useRouter();
  if (!queryObj["role"]) {
    queryObj["role"] = "participant";
  }
  const { data } = useSuspenseQuery({
    queryKey: ["user", "sessions", queryObj["role"]],
    queryFn: async () => {
      const { data } = await apiClient.get<any[]>("/user/files", {
        params: queryObj,
      });
      return data;
    },
  });

  return <>지금은 아무것도 없음</>;
}
