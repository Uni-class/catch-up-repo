import { CreateSessionDto, SessionResponseDto } from "@/schema/backend.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/axios";
import { useRouter } from "@/hook/useRouter";
import { SessionFormTemplate } from "@/app/(sidebar-pages)/sessions/_components/SessionFormTemplate";
import { useFormData } from "@/hook/useFormData";
import { SessionFormType } from "@/type/SessionFormType";

interface PropType {
  sessionData: SessionResponseDto;
}

export default function HostSession({ sessionData }: PropType) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const useFormDataResult = useFormData<SessionFormType>({
    sessionName: sessionData.sessionName,
    sessionFiles: sessionData.fileList,
  });
  const formMutation = useMutation({
    mutationFn: async (body: CreateSessionDto) =>
      await apiClient.patch(`/session/${sessionData.sessionId}`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "sessions", "host"] });
      router.push(router.getURLString("/view",{id:`${sessionData.sessionId}`}))
    },
  });

  return (
    <SessionFormTemplate
      formMutation={formMutation}
      useFormDataResult={useFormDataResult}
    />
  );
}
