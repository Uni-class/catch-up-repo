import { useCheckBoxes } from "@/hook/useCheckBoxes";
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
  const {
    isTotalChecked,
    setIsTotalChecked,
    setIsCheckedOne,
    isCheckedOne,
  } = useCheckBoxes<any, number>({ data: data, id: "id" });

  return <>지금은 아무것도 없음</>;
}
