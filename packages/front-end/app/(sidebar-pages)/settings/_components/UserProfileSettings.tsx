import { apiClient } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import UserProfileEdit from "@/app/(sidebar-pages)/settings/_components/UserProfileEdit";
import { User } from "@/schema/backend.schema";

export default function UserProfileSettings() {
  const { data: response, isLoading } = useQuery<AxiosResponse<User>>({
    queryKey: ["user", "profile"],
    queryFn: async () => await apiClient.get("/user/profile"),
  });
  if (isLoading)
    return <div>Loading...</div>;
  const data = response?.data;
  return data !== undefined && <UserProfileEdit data={data} />;
}
