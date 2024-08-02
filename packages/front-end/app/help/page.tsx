"use client";

import Button from "@/components/Button";
import { useRouter } from "@/hook/useRouter";
import { apiClient } from "@/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const userMutate = useMutation({
    mutationFn: async () => await apiClient.delete("/user"),
    onSuccess: () => {
      queryClient.invalidateQueries();
      router.push("/login");
    },
    onError: (error) => {
      alert(`당신은 이 곳에서 나갈 수 없습니다:${error.message}`);
    },
  });
  return (
    <main>
      <p>도움말</p>
      <div>도움말 페이지</div>
      <Button
        onClick={() => {
          userMutate.mutate();
        }}
      >
        회원 탈퇴
      </Button>
    </main>
  );
}
