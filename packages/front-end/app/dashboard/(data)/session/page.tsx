"use client";
import { useRouter } from "@/hook/useRouter";
import { apiAuthClient } from "@/util/axios";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
  const { queryObj } = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user", "sessions"],
    queryFn: async () =>
      await apiAuthClient.get("/user/sessions", { params: queryObj }),
  });
  if (isError) {
    return <>에러</>;
  }
  if (isLoading) {
    return <>로딩</>;
  }
  console.log(data);
  return <>안녕</>;
}
